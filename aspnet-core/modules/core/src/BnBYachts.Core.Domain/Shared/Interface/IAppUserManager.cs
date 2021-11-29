﻿using BnBYachts.Core.Shared.Transferable;
using System;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.Interface
{
    public interface IAppUserManager
    {
        Task<UserDetailsTransferable> GetLoggedInUserDetails(Guid? userId);
        Task<UserDetailsTransferable> RegisterUser(string firstName, string lastName, string emailAddress, string userName, string plainPassword, string emailActivationLink,DateTime dob);
        Task<bool> ConfirmEmail(string username, string token);
    }
}
