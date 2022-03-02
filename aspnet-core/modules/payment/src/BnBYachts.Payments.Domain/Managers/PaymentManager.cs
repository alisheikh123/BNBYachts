using BnBYachts.Payments.Enum;
using BnBYachts.Payments.Payments;
using BnBYachts.Payments.Requestables;
using BnBYachts.Payments.Shared.Interface;
using BnBYachts.Payments.Shared.Requestable;
using BnBYachts.Payments.Shared.Transferable;
using BnBYachts.Payments.Transferables;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Stripe;
using Stripe.Issuing;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Payments.Managers
{
    public class PaymentManager : DomainService, IPaymentManager
    {
        private readonly IRepository<UserCardInfoEntity, int> _userCardRepository;
        private readonly IRepository<PaymentDetailsEntity, int> _userPaymentDetailsRepository;
        private readonly IRepository<UserBankDetailsEntity, int> _userBankRepository;
        private readonly IConfiguration _config;

        public PaymentManager(IRepository<UserCardInfoEntity, int> userCardRepository, IRepository<PaymentDetailsEntity, int> userPaymentDetailsRepository, IRepository<UserBankDetailsEntity, int> userBankRepository, IConfiguration config)
        {
            //var configurationBuilder = new ConfigurationBuilder()
            //             .SetBasePath(Directory.GetCurrentDirectory())
            //             .AddJsonFile("appsettings.json", optional: false).Build();
            //StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("BNB_STRIPE_APIKEY", EnvironmentVariableTarget.Machine);//"sk_test_51JjjR4IQmeuKTcwEPY0veVnt0GzKPdicOMKC0jRrQouRJQg18bMbu86kfPGcPbG8l1ETH6lHwWhlFT8kgX0pHL3j00GkdfQLDP";//configurationBuilder.GetSection("Stripe")["ApiKey"].ToString();
            //StripeConfiguration.ApiKey = "sk_test_51JjjR4IQmeuKTcwEPY0veVnt0GzKPdicOMKC0jRrQouRJQg18bMbu86kfPGcPbG8l1ETH6lHwWhlFT8kgX0pHL3j00GkdfQLDP";//configurationBuilder.GetSection("Stripe")["ApiKey"].ToString();
            _userCardRepository = userCardRepository;
            _userPaymentDetailsRepository = userPaymentDetailsRepository;
            _userBankRepository = userBankRepository;
            _config = config;
            StripeConfiguration.ApiKey = _config.GetSection("Stripe")["ApiKey"];
        }

        public async Task<List<UserPaymentMethodTransferable>> GetCustomersCard(Guid? userId)
        {
            var user = await _userCardRepository.FindAsync(res => res.UserId == userId.ToString()).ConfigureAwait(false);
            if (user != null)
            {
                var options = new PaymentMethodListOptions
                {
                    Customer = user.CustomerId,
                    Type = PaymentConstants.Card,
                };
                var service = new PaymentMethodService();
                StripeList<PaymentMethod> paymentMethods = service.List(
                    options
                 );

                var userPaymentMethods = new List<UserPaymentMethodTransferable>();
                foreach (var item in paymentMethods)
                {
                    userPaymentMethods.Add(UserPaymentMethodTransferableFactory.Contruct(item.Id, item.BillingDetails.Name, item.Card.Last4, false, item.Card.Brand));
                }
                return userPaymentMethods;
            }
            return new List<UserPaymentMethodTransferable>();
        }
        public async Task<bool> CreateCustomer(StripeCustomerRequestable data)
        {
            var customerOptions = new CustomerCreateOptions
            {
                Description = "Customer created for future payments",
                Name = data.Name,
                Email = data.Email,
                Validate = true
            };
            var customerService = new CustomerService();
            var customerResponse = await customerService.CreateAsync(customerOptions);
            var userCardEntity = new UserCardInfoEntity
            {
                UserId = data.Id,
                CustomerId = customerResponse.Id
            };
            var result = await _userCardRepository.InsertAsync(userCardEntity).ConfigureAwait(false);
            return true;
        }

        public async Task<bool> Pay(BookingPaymentRequestable data)
        {
            var user = await _userCardRepository.FindAsync(res => res.UserId == data.UserId).ConfigureAwait(false);

            if (data.IsSaveNewPaymentMethod)
            {
                var cardOptions = new PaymentMethodCreateOptions
                {
                    Type = PaymentConstants.Card,
                    Card = new PaymentMethodCardOptions
                    {
                        Token = data.Token
                    }
                };
                var paymentMethodService = new PaymentMethodService();
                var cardResponse = await paymentMethodService.CreateAsync(cardOptions).ConfigureAwait(false);
                data.PaymentId = cardResponse.Id;

                var attachOptions = new PaymentMethodAttachOptions
                {
                    Customer = user.CustomerId,
                };
                var attachService = new PaymentMethodService();
                await attachService.AttachAsync(
                  data.PaymentId,
                  attachOptions
                ).ConfigureAwait(false);
            }

            var options = new PaymentIntentCreateOptions
            {
                Amount = data.Amount * 100,
                Currency = PaymentConstants.Currency,
                PaymentMethodTypes = new List<string>
                    {
                        PaymentConstants.Card
                    },
                Customer = user.CustomerId,
                PaymentMethod = data.PaymentId,
                TransferGroup = Guid.NewGuid().ToString(),
                Description = data.Description,
                Confirm = true,
                //PaymentMethodOptions = new PaymentIntentPaymentMethodOptionsOptions
                //{
                //    Card = new PaymentIntentPaymentMethodOptionsCardOptions
                //    {
                //        RequestThreeDSecure = "any"
                //    }
                //}
            };
            var service = new PaymentIntentService();

            var response = service.Create(options);
            if (response.Status == PaymentConstants.StatusSucceed)
            {
                var pm = new PaymentDetailsEntity
                {
                    BookingId = data.BookingId ?? 0,
                    PaymentId = response.Id,
                    CustomerId = user.CustomerId,
                    Amount = data.Amount,
                    IsContract = data.IsContract ?? false,
                    BookingType = data.BookingType,
                    Status = PaymentStatus.Escrow
                };
                await _userPaymentDetailsRepository.InsertAsync(pm);
                return true;
            }
            return false;
        }

        public async Task<bool> RefundPayment(int bookingId, long refundAmount)
        {
            var paymentDetails = await _userPaymentDetailsRepository.FindAsync(res => res.BookingId == bookingId).ConfigureAwait(false);

            var options = new RefundCreateOptions
            {
                PaymentIntent = paymentDetails.PaymentId,
                Amount = refundAmount,
                Reason = PaymentConstants.RefundReason,
            };
            var service = new RefundService();
            var response = service.Create(options);

            return (response.Status == PaymentConstants.StatusSucceed) ? true : false;

        }
        public async Task CreateAccount(StripeOnboardingRequestable data,string userId)
        {
            var options = new AccountCreateOptions
            {
                Type = "custom",
                Country = data.Country,
                Email = data.Email,
                Capabilities = new AccountCapabilitiesOptions
                {
                    CardPayments = new AccountCapabilitiesCardPaymentsOptions
                    {
                        Requested = true,
                    },
                    Transfers = new AccountCapabilitiesTransfersOptions
                    {
                        Requested = true,
                    },
                },
                Individual = new AccountIndividualOptions
                {
                    IdNumber= data.SSN,//"000-00-0000",
                    FirstName = data.FirstName,//"Hanan",
                    LastName = data.LastName,//"Afzal",
                    //SsnLast4 = "2222",
                    Address = new AddressOptions
                    {
                        Line1 = data.Street1,//"1 Hacker Way",
                        Line2 = data.Street2,//"",
                        City = data.City,//"Menlo Park",
                        Country = data.Country,//"US",
                        PostalCode = data.ZipCode,//"94025",
                        State = data.State//"CA"
                    },
                    Phone = data.Phone,//"+18004444444",
                    Dob = new DobOptions
                    {
                        Day = 10,
                        Month = 10,
                        Year = 1990
                    },
                    Email = data.Email
                  ,
                    Verification = new AccountIndividualVerificationOptions
                    {
                        Document = new AccountIndividualVerificationDocumentOptions
                        {
                            Front = null,
                            Back = null
                        }
                    }
                },
                DefaultCurrency = PaymentConstants.Currency,
                Settings = new AccountSettingsOptions
                {
                    Payouts = new AccountSettingsPayoutsOptions
                    {
                        Schedule = new AccountSettingsPayoutsScheduleOptions
                        {
                            Interval = "manual",
                        },
                        DebitNegativeBalances = true,
                    },
                    CardPayments = new AccountSettingsCardPaymentsOptions
                    {
                        DeclineOn = new AccountSettingsCardPaymentsDeclineOnOptions
                        {
                            CvcFailure = true
                        },
                    }
                },
                Company = new AccountCompanyOptions
                {
                    Address = new AddressOptions
                    {
                        Line1 = data.Street1,//"1 Hacker Way",
                        Line2 = data.Street2,//"",
                        City = data.City,//"Menlo Park",
                        Country = data.Country,//"US",
                        PostalCode = data.ZipCode,//"94025",
                        State = data.State//"CA"
                    },
                    Name = data.FirstName + " "+ data.LastName +" Stripe Bnb Connect Account",
                    OwnersProvided =true
                },
                BusinessType = "individual",
                BusinessProfile = new AccountBusinessProfileOptions
                {
                    ProductDescription = "Boat Hosts",
                    Url = "https://www.google.com",
                    Mcc = "5734",
                },
                TosAcceptance = new AccountTosAcceptanceOptions
                {
                    Date = DateTimeOffset.FromUnixTimeSeconds(1609798905).UtcDateTime,
                    Ip = "8.8.8.8",
                },
                ExternalAccount = new AccountBankAccountOptions
                {
                    AccountHolderName=data.AccountHolderName,//"Hanan Afzal",
                    AccountHolderType="individual",
                    AccountNumber= data.AccountNumber,//"000123456789",
                    Country=data.Country,//"US",
                    Currency="USD",
                    RoutingNumber= data.RoutingNumber//"110000000"
                }
            };
            var service = new AccountService();
            var acccountCreationResponse = service.Create(options);

            var bankEntity = new UserBankDetailsEntity
            {
                AccountId = acccountCreationResponse.Id,
                BankId = acccountCreationResponse.ExternalAccounts.Data[0].Id,
                UserId = userId
            };
            await _userBankRepository.InsertAsync(bankEntity, true).ConfigureAwait(false);
        }

        public async Task<string> GetAccountDetails(string userId)
        {
            var account = await _userBankRepository.FindAsync(res => res.UserId == userId);
            if (account != null)
            {
                var options = new ExternalAccountListOptions
                {
                    Limit = 3,
                };
                var servicee = new ExternalAccountService();
                var bankAccounts = servicee.List(account.AccountId, options);
                return bankAccounts.StripeResponse.Content;
            }
            return null;
        }

        public async Task SendToBankAmount(string accountId, int amount)
        {
                var transferGroup = Guid.NewGuid().ToString();
                var tOptions = new TransferCreateOptions
                {
                    Amount = (amount * 100),
                    Currency = PaymentConstants.Currency,
                    Destination = accountId,
                    TransferGroup = transferGroup,
                };
                var tService = new TransferService();
                var transfer = tService.Create(tOptions);

                var options = new PayoutCreateOptions
                {
                    Amount = amount * 100,
                    Currency = PaymentConstants.Currency
                };
                var requestOptions = new RequestOptions()
                {
                    StripeAccount = accountId
                };
                var service = new PayoutService();
                var response = service.Create(options, requestOptions);
                //return response;
        }
        public async Task<EntityResponseModel> CalculateFunds(List<BookingsRequestable> data)
        {
                decimal amount = 0;
                foreach (var elem in data)
                {
                    var paymentDetails = await _userPaymentDetailsRepository.FindAsync(res => res.BookingId == elem.BookingId && (int)res.BookingType == elem.BookingType).ConfigureAwait(false);
                    amount = amount + (paymentDetails!= null ? paymentDetails.Amount : 0);
                }
                return new EntityResponseModel
                {
                    Data = amount
                };
        }

        public async Task<StripeList<BalanceTransaction>> GetTransactionDetails(string accountId)
        {
                var options = new BalanceTransactionListOptions
                {
                    Currency = "USD"
                };
                var requestOptions = new RequestOptions
                {
                    StripeAccount = accountId,
                };
                var service = new BalanceTransactionService();
                StripeList<BalanceTransaction> balanceTransactions = service.List(
                  options, requestOptions);
                return balanceTransactions;
        }

        public async Task<string> GetCustomerTransactions(string userId)
        {
            var customer = await _userCardRepository.GetAsync(res => res.UserId == userId).ConfigureAwait(false);
            var options = new ChargeListOptions { Customer = customer.CustomerId };
            var service = new ChargeService();
            var charges = service.List(
              options);
            return JsonConvert.SerializeObject(charges.Data);
        }
    }
}
