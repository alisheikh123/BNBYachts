using BnBYachts.Boat.Marketing.Transferable;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Marketing.Requestable
{
    public class FeaturedCityRequestable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string imagePath { get; set; }
        public string Description { get; set; }
        public string CreationTime { get; set; }
        public FeaturedCityGalleryRequestable FeaturedCityGallery { get; set; }
    }
}