using BnBYachts.Core.Data.Entities.NewsLetters;
using BnBYachts.Core.NewsLetters.Enum;
using BnBYachts.Core.NewsLetters.Interface;
using BnBYachts.Core.NewsLetters.Transferable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

namespace BnBYachts.Core.Managers
{
    public class NewsLetterManager : DomainService, INewsLetterManager
    {
        private readonly IRepository<ContactsEntity, long> _repository;
        private readonly IRepository<NewsLetterSubscriptionEntity, long> _newsRepository;
        private readonly IRepository<ScheduleNewsLetterEntity, long> _scheduleRepository;
        private readonly IRepository<SubscriberEmailEntity, long> _subscriberRepository;
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;
        public NewsLetterManager(IRepository<ContactsEntity, long> repository, IObjectMapper<CoreDomainModule> objectMapper, IRepository<ScheduleNewsLetterEntity, long> scheduleRepository,
            IRepository<NewsLetterSubscriptionEntity, long> newsRepository, IRepository<SubscriberEmailEntity, long> subscriberRepository, EventBusDispatcher eventBusDispatcher)
        {
            _repository = repository;
            _scheduleRepository = scheduleRepository;
            _subscriberRepository = subscriberRepository;
            _objectMapper = objectMapper;
            _newsRepository = newsRepository;
            _eventBusDispatcher = eventBusDispatcher;
        }
        public async Task<EntityResponseModel> AddNewsLetter(ContactsTransferable contactInput)
        {
            var response = new EntityResponseModel();
            var data = _objectMapper.Map<ContactsTransferable ,ContactsEntity>(contactInput);
            response.Data = await _repository.InsertAsync(data).ConfigureAwait(false);
            return response;
        }

        public async Task<EntityResponseModel> AddNewsLettersSubscription(NewsLetterTransferable newsLetter)
        {
            var response = new EntityResponseModel();
            var data = _objectMapper.Map<NewsLetterTransferable, NewsLetterSubscriptionEntity>(newsLetter);
            await _eventBusDispatcher.Publish<IS3FileContract>(new S3FileContract
            {
                ChildFolder = "",
                File = Convert.FromBase64String(newsLetter.NewsLetterGallery.FileData.Split("base64,")[1]),
                FileName = newsLetter.NewsLetterGallery.FileName,
                ContentType = newsLetter.NewsLetterGallery.FileType,
                SubFolder = "NewsLetter"
            }).ConfigureAwait(false);

            data.LetterImage = newsLetter.NewsLetterGallery.FileName;
            response.Data = await _newsRepository.InsertAsync(data).ConfigureAwait(false);
            return response;
        }

        public async Task DeleteNewsLetter(long id) => await _newsRepository.DeleteAsync(id).ConfigureAwait(false);

        public async Task<List<NewsLetterTransferable>> GetNewsLetter()
        {
            var data = await _newsRepository.GetListAsync().ConfigureAwait(false);
            return _objectMapper.Map<List<NewsLetterSubscriptionEntity>, List<NewsLetterTransferable>>(data);
        }

        public async Task<EntityResponseModel> GetSubscribedUsers()
        {
            var response = new EntityResponseModel();
            var data = await _repository.GetListAsync().ConfigureAwait(false);
            response.Data = _objectMapper.Map<List<ContactsEntity>, List<ContactsTransferable>>(data);
            return response;
        }

        public async Task<bool> IsEmailExist(string emailAddress)
        {
            var user = await _repository.FindAsync(res => res.EmailAddress == emailAddress).ConfigureAwait(false);
            return user != null ? true : false;
        }
        public async Task<EntityResponseModel> ScheduleNewsLetter(ScheduleTransferable schedule)
        {
            var SubscribeEmails = new List<SubscriberEmailEntity>();
            var NewsLetter = await _newsRepository.SingleOrDefaultAsync(x=>x.Id == schedule.NewsLetterSubscriptionId).ConfigureAwait(false);
            var response = new EntityResponseModel();
            var data = _objectMapper.Map<ScheduleTransferable, ScheduleNewsLetterEntity>(schedule);
            switch (NewsLetter.LetterTypeId)
            {
                case LetterType.Daily:
                    data.ScheduleDate = NewsLetter.CreationTime.AddDays(1);
                    break;
                case LetterType.Weekly:
                    data.ScheduleDate = NewsLetter.CreationTime.AddDays(7);
                    break;
                case LetterType.Monthly:
                    data.ScheduleDate = NewsLetter.CreationTime.AddMonths(1);
                    break;
                case LetterType.Yearly:
                    data.ScheduleDate = NewsLetter.CreationTime.AddYears(1);
                    break;
                default:
                    break;
            }
            foreach (var item in schedule.EmailAddress)
            {
                var SubscribeEmail = new SubscriberEmailEntity();
                SubscribeEmail.EmailAddress = item;
                SubscribeEmail.NewsLetterSubscriptionId = schedule.NewsLetterSubscriptionId;
                SubscribeEmails.Add(SubscribeEmail);
            }
            await _subscriberRepository.InsertManyAsync(SubscribeEmails).ConfigureAwait(false);
            response.Data = await _scheduleRepository.InsertAsync(data).ConfigureAwait(false);
            return response;
        }
        public async Task<EntityResponseModel> UpdateNewsLetter(NewsLetterTransferable newsLetter)
        {
            var response = new EntityResponseModel();
            var newsLet = await _newsRepository.FindAsync(x => x.Id == newsLetter.Id).ConfigureAwait(false);
            var data = _objectMapper.Map<NewsLetterTransferable, NewsLetterSubscriptionEntity>(newsLetter, newsLet);
            await _eventBusDispatcher.Publish<IS3FileContract>(new S3FileContract
            {
                ChildFolder = "",
                File = Convert.FromBase64String(newsLetter.NewsLetterGallery.FileData.Split("base64,")[1]),
                FileName = newsLetter.NewsLetterGallery.FileName,
                ContentType = newsLetter.NewsLetterGallery.FileType,
                SubFolder = "NewsLetter"
            }).ConfigureAwait(false);
            data.LetterImage = newsLetter.NewsLetterGallery.FileName;
            response.Data = await _newsRepository.InsertAsync(data).ConfigureAwait(false);
            return response;
        }
        
        [UnitOfWork]
        public async Task SendEmailToSubscriberUsers()
        {
            var data =  await _scheduleRepository.FirstOrDefaultAsync(x => x.ScheduleDate.Date >= DateTime.Now.Date && x.StatusTypeId == StatusType.Pending).ConfigureAwait(false);
            if (data != null)
            {
                var subscriber = await _subscriberRepository.GetListAsync(x => x.NewsLetterSubscriptionId == data.NewsLetterSubscriptionId).ConfigureAwait(false);
                foreach (var item in subscriber)
                {
                    await _subscriberRepository.EnsurePropertyLoadedAsync(item, x => x.NewsLetterSubscription).ConfigureAwait(false);
                    string body = $"<h5>Hello {item.EmailAddress} </h5> <div> You registered an account on BnByachts, before being able to use your account you need to verify your email address by clicking here: </div><br>Best Regard";
                    await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
                    {
                        To = item.EmailAddress,
                        Subject = $"Hello {item.NewsLetterSubscription.Title}",
                        Body = new StringBuilder().Append(body),
                        IsBodyHtml = true
                    });
                }
                data.StatusTypeId = StatusType.Completed;
                await _scheduleRepository.UpdateAsync(data).ConfigureAwait(false);
            }
        }

    }
}
