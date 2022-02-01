using BnBYachts.Core.Data.Model;
using BnBYachts.Core.Interfaces;
using BnBYachts.Core.Requestable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Core.Managers
{
    public class HelpCenterManager : DomainService, IHelpCenterManager
    {
        private readonly IRepository<CoreEmailTemplatesEntity, int> _repository;
        public HelpCenterManager(IRepository<CoreEmailTemplatesEntity, int> repository)
        {
            _repository = repository;
        }
        public async Task<string> GetEmailContent(int templateId)
        {
            var emailRepo= await _repository.GetAsync(res => res.TemplateId == templateId).ConfigureAwait(false);
            return emailRepo.EmailContent.ToString();
        }
    }
}
