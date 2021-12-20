using BnBYachts.Boat.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class  BoatGalleryDTO : ITransferable
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
