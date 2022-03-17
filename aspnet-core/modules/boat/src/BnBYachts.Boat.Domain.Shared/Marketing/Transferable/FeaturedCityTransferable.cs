using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Marketing.Transferable
{
    public class FeaturedCityTransferable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string imagePath { get; set; }
        public string Description { get; set; }
        public DateTime CreationTime { get; set; }
        public FeaturedCityGalleryRequestable FeaturedCityGallery { get; set; }
    }
    public class FeaturedCityGalleryRequestable
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