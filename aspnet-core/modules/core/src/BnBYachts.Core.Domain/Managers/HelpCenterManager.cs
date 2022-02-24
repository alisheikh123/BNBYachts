using BnBYachts.Core.Data.Entities;
using BnBYachts.Core.Data.Model;
using BnBYachts.Core.Interfaces;
using BnBYachts.Core.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Core.Managers
{
    public class HelpCenterManager : DomainService, IHelpCenterManager
    {
        private readonly IRepository<CoreEmailTemplatesEntity, int> _repository;
        private readonly IRepository<FrequentQuestionEntity, int> _repoQuestions;
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;
        public HelpCenterManager(IRepository<CoreEmailTemplatesEntity, int> repository, IRepository<FrequentQuestionEntity, int> repoQuestions, IObjectMapper<CoreDomainModule> objectMapper)
        {
            _repository = repository;
            _repoQuestions = repoQuestions;
            _objectMapper = objectMapper;
        }

        public async Task<EntityResponseModel> AddFrequentQuestions(FrequentQuestionsDto faqs)
        {
            var response = new EntityResponseModel();
            response.Data = await _repoQuestions.InsertAsync(_objectMapper.Map<FrequentQuestionsDto, FrequentQuestionEntity>(faqs));
            return response;
        }

        public async Task DeleteFaqs(int faqsId) => await _repoQuestions.DeleteAsync(x=>x.Id == faqsId);

        public async Task<EntityResponseModel> GetEmailContent(int templateId)
        {
            var emailRepo = await _repository.GetAsync(res => res.TemplateId == templateId).ConfigureAwait(false);
            return new EntityResponseModel
            {
                Data = emailRepo.EmailContent
            };
        }

        public async Task<EntityResponseListModel<FrequentQuestionsDto>> GetFrequentQuestions()
        {
            return new EntityResponseListModel<FrequentQuestionsDto>
            {
                Data = _objectMapper.Map<List<FrequentQuestionEntity>, List<FrequentQuestionsDto>>(
                await _repoQuestions.GetListAsync().ConfigureAwait(false))
            };
        }

        public async Task<EntityResponseModel> UpdateFaqs(FrequentQuestionsDto faqs)
        {
            var response = new EntityResponseModel();
            var Frequentqs = await _repoQuestions.GetAsync(x => x.Id == faqs.Id).ConfigureAwait(false);
            Frequentqs.CategoryId = faqs.CategoryId;
            Frequentqs.Question = faqs.Question;
            Frequentqs.Answer = faqs.Answer;
            //var data = _objectMapper.Map<FrequentQuestionsDto, FrequentQuestionEntity>(faqs);
            response.Data = await _repoQuestions.UpdateAsync(Frequentqs);
            return response;
        }
    }
}
