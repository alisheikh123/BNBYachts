using BnBYachts.Core.NewsLetters.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.NewsLetters.Interface
{
    public interface INewsLetterManager
    {
        Task<EntityResponseModel> AddNewsLetter(ContactsTransferable contactInput);
        Task<EntityResponseModel> GetSubscribedUsers();
        Task<bool> IsEmailExist(string emailAddress);
        Task<List<NewsLetterTransferable>> GetNewsLetter();
        Task<EntityResponseModel> AddNewsLettersSubscription(NewsLetterTransferable newsLetter);
        Task<EntityResponseModel> UpdateNewsLetter(NewsLetterTransferable newsLetter);
        Task DeleteNewsLetter(long id);
        Task<EntityResponseModel> ScheduleNewsLetter(ScheduleTransferable schedule);
        Task SendEmailToSubscriberUsers();
    }
}
