using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Wishlist.Transferable
{
    public class WishlistTransferableDto : ITransferable
    {
        public int Id { get; set; }
        public virtual int BoatId { get; set; }
        public BoatDTO Boat { get; set; }
        public virtual Guid UserId { get; set; }
    }
}
