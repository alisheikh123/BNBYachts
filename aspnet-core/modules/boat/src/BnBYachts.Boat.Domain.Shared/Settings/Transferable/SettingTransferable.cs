using BnBYachts.Boat.Settings.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Settings.Transferable
{
    public class SettingTransferable
    {
        public int Id { get; set; }
        public BoatType BoatTypeId { get; set; }
        public string ServiceFee { get; set; }
    }
}
