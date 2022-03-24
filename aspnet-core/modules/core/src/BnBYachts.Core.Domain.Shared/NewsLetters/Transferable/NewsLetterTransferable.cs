using BnBYachts.Core.NewsLetters.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.NewsLetters.Transferable
{
    public class NewsLetterTransferable
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string LetterImage { get; set; }
        public string Description { get; set; }
        public LetterType LetterTypeId { get; set; }
        public long? ContactID { get; set; }
        public NewsLetterGalleryRequestable NewsLetterGallery { get; set; }

    }
    public class NewsLetterGalleryRequestable
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string FileData { get; set; }
        public string Title { get; set; }
        public int? SortOrder { get; set; }
        public string ImagePath { get; set; }
        public bool IsCoverPic { get; set; }
        public int BoatEntityId { get; set; }
    }

}
