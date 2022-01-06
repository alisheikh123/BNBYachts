using System.Collections.Generic;
using BnBYachts.Chat.Domain.Shared.Interfaces;

namespace BnBYachts.Chat.Managers
{
    public class UserConnectionManager : IUserConnectionManager
    {
        private static Dictionary<string, List<string>> userConnectionMap = new Dictionary<string, List<string>>();
        private static string userConnectionMapLocker = string.Empty;
        public void KeepUserConnection(string userId, string connectionId)
        {
            RemoveUserConnection(connectionId);
            lock (userConnectionMapLocker)
            {
                var uniqueKeys = userId.ToString();
                if (!userConnectionMap.ContainsKey(uniqueKeys))
                {
                    userConnectionMap[uniqueKeys] = new List<string>();
                }
                userConnectionMap[uniqueKeys].Add(connectionId);
            }
        }

        public void RemoveUserConnection(string connectionId)
        {
            //This method will remove the connectionId of user
            lock (userConnectionMapLocker)
            {
                foreach (var userId in userConnectionMap.Keys)
                {
                    if (userConnectionMap.ContainsKey(userId))
                    {
                        if (userConnectionMap[userId].Contains(connectionId))
                        {
                            userConnectionMap[userId].Remove(connectionId);
                            break;
                        }
                    }
                }
            }
        }
        public List<string> GetUserConnections(string userId)
        {

            var conn = new List<string>();
            lock (userConnectionMapLocker)
            {
                var uniqueKeys = userId.ToString().ToLower();

                if (userConnectionMap.ContainsKey(uniqueKeys))
                {
                    conn = userConnectionMap[uniqueKeys];
                }
            }
            return conn;//
        }
       
    }
}
