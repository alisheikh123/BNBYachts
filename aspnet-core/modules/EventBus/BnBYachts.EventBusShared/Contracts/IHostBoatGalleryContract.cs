using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IHostBoatGalleryContract : IContractable
    {
        public string Title { get; set; }
        public bool IsCoverPic { get; set; }
        public int SortOrder { get; set; }
        public string ImagePath { get; set; }
        public  int BoatEntityId { get; set; }
    }
    public class HostBoatGalleryContract : IHostBoatGalleryContract
    {
        public string Title { get; set; }
        public bool IsCoverPic { get; set; }
        public int SortOrder { get; set; }
        public string ImagePath { get; set; }
        public int BoatEntityId { get; set; }
    }
}
