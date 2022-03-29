
using System.Collections.Generic;
using System.Linq;
using BnBYachts.Notification.Notification.IManager;

namespace BnBYachts.Notification.Manager
{
    public class UserConnectionManager : IUserConnectionManager
    {
        private static readonly Dictionary<string, List<string>> UserConnectionMap = new Dictionary<string, List<string>>();
        private static readonly string UserConnectionMapLocker = string.Empty;
        public void KeepUserConnection(string userId, string connectionId)
        {
            RemoveUserConnection(connectionId);
            lock (UserConnectionMapLocker)
            {
                var uniqueKeys = userId.ToString();
                if (!UserConnectionMap.ContainsKey(uniqueKeys))
                {
                    UserConnectionMap[uniqueKeys] = new List<string>();
                }
                UserConnectionMap[uniqueKeys].Add(connectionId);
            }
        }

        public void RemoveUserConnection(string connectionId)
        {
            lock (UserConnectionMapLocker)
            {
                foreach (var userId in UserConnectionMap.Keys.Where(userId => UserConnectionMap.ContainsKey(userId)).Where(userId => UserConnectionMap[userId].Contains(connectionId)))
                {
                    UserConnectionMap[userId].Remove(connectionId);
                    break;
                }
            }
        }
        public List<string> GetUserConnections(string userId)
        {

            var conn = new List<string>();
            lock (UserConnectionMapLocker)
            {
                var uniqueKeys = userId.ToString().ToLower();

                if (UserConnectionMap.ContainsKey(uniqueKeys))
                {
                    conn = UserConnectionMap[uniqueKeys];
                }
            }
            return conn;//
        }
    }
}
