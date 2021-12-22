using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Shared.Model
{
    public class EntityPaginationFilterModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
    }
}
