using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Chat.Data
{
    public interface IChatDbSchemaMigrator
    {
        Task MigrateAsync();
    } 
    
}
