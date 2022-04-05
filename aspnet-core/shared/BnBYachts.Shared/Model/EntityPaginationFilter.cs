
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Shared.Model
{
    public class EntityPaginationFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        //temp remove it soon
        public string UserId { get; set; }
        public EntityPaginationFilter()
        {
            this.PageNumber = 1;
            this.PageSize = 10;
        }
        //public EntityPaginationFilter(int pageNumber, int pageSize)
        //{
        //    this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
        //    this.PageSize = pageSize > 10 ? 10 : pageSize;
        //}
    }
}
