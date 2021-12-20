using System;
using System.Collections;
using System.Collections.Generic;

namespace BnBYachts.Shared.Model
{
    public class EntityResponseModel
    {
        public bool ReturnStatus { get; set; }
        public List<string> ReturnMessage { get; set; }
        public Hashtable Errors;
        public object Data { get; set; }
        public EntityResponseModel()
        {
            ReturnMessage = new List<string>();
            ReturnStatus = true;
            Errors = new Hashtable();
            Data = default;
        }
    }
}