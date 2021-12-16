using System;
using System.Collections;
using System.Collections.Generic;

namespace BnBYachts.Shared.Model
{
    public class EntityResponseListModel<T>
    {
        public bool ReturnStatus { get; set; }
        public List<String> ReturnMessage { get; set; }
        public Hashtable Errors;
        public List<T> Data;
        public EntityResponseListModel()
        {
            ReturnMessage = new List<String>();
            ReturnStatus = true;
            Errors = new Hashtable();
            Data = default;
        }
    }
}