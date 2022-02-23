using BnBYachts.Core.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Interfaces
{
    public interface IHelpCenterManager
    {
        Task<EntityResponseModel> GetEmailContent(int templateId);
        Task<EntityResponseListModel<FrequentQuestionsDto>> GetFrequentQuestions();
        Task<EntityResponseModel> AddFrequentQuestions(FrequentQuestionsDto faqs);
        Task DeleteFaqs(int faqsId);
        Task<EntityResponseModel> UpdateFaqs(FrequentQuestionsDto faqs);
    }
}
