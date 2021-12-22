using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Shared.Model
{
    public class ListingBaseModel
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;
        public int TotalCount { get; set; }

        public string SortBy { get; set; }

        public bool SortAscending { get; set; } = true;

    }
}
