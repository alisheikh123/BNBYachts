﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Shared.Boat.Transferable
{
   public class BoatAddResponseTransferable
    {
        public int Id { get; set; }
        public bool isSuccess { get; set; }
        public bool isHostExists { get; set; }
    }
}
