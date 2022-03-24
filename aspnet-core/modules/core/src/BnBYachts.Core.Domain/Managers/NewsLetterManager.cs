using BnBYachts.Core.Data.Entities.NewsLetters;
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

namespace BnBYachts.Core.Managers
{
    public class NewsLetterManager : DomainService, INewsLetterManager
    {
        private readonly IRepository<ContactsEntity, long> _repository;
        private readonly IRepository<NewsLetterSubscriptionEntity, long> _newsRepository;
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;
        public NewsLetterManager(IRepository<ContactsEntity, long> repository, IObjectMapper<CoreDomainModule> objectMapper, 
            IRepository<NewsLetterSubscriptionEntity, long> newsRepository, EventBusDispatcher eventBusDispatcher)
        {
            _repository = repository;
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
    }
}
