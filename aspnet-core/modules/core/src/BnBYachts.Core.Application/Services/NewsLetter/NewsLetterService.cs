using BnBYachts.Core.Interface;
using BnBYachts.Core.NewsLetters.Interface;
using BnBYachts.Core.NewsLetters.Transferable;
using BnBYachts.Core.Permissions;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services.NewsLetter
{
    public class NewsLetterService : ApplicationService, INewsLetterService
    {
        private readonly INewsLetterManager _newsLetterManager;
        public NewsLetterService(INewsLetterManager newsLetterManager)
        {
            _newsLetterManager = newsLetterManager;
        }
        public async Task<EntityResponseModel> AddNewsLetter(ContactsTransferable contactInput)
            => await _newsLetterManager.AddNewsLetter(contactInput).ConfigureAwait(false);
        [Authorize("Core.NewsLetter.Create")]
        public async Task<EntityResponseModel> AddNewsLettersSubscription(NewsLetterTransferable newsLetter)
            => await _newsLetterManager.AddNewsLettersSubscription(newsLetter).ConfigureAwait(false);

        public async Task DeleteNewsLetter(long id) => await _newsLetterManager.DeleteNewsLetter(id).ConfigureAwait(false);

        public async Task<List<NewsLetterTransferable>> GetNewsLetter() => await _newsLetterManager.GetNewsLetter().ConfigureAwait(false);

        public async Task<EntityResponseModel> GetSubscribedUsers()
            => await _newsLetterManager.GetSubscribedUsers().ConfigureAwait(false);

        public async Task<bool> IsEmailExist(string emailAddress) => await _newsLetterManager.IsEmailExist(emailAddress).ConfigureAwait(false);

        public async Task<EntityResponseModel> ScheduleNewsLetter(ScheduleTransferable schedule)
            => await _newsLetterManager.ScheduleNewsLetter(schedule).ConfigureAwait(false);

        public async Task<EntityResponseModel> UpdateNewsLetter(NewsLetterTransferable newsLetter)
            => await _newsLetterManager.UpdateNewsLetter(newsLetter).ConfigureAwait(false);
    }
}
