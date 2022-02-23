using BnBYachts.Core.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Interface
{
    public interface IHelpCenterAppService
    {
        Task<EntityResponseModel> ContactUS(ContactUsRequestableDto form);
        Task<EntityResponseListModel<FrequentQuestionsDto>> GetFrequentQuestions();
        Task<EntityResponseModel> InsertFrequentQuestions(FrequentQuestionsDto faqs);
        Task DeleteFaqs(int faqsId);
        Task<EntityResponseModel> UpdateFaqs(FrequentQuestionsDto faqs);
    }
}
