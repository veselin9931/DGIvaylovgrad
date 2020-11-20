using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DGIvaylovgrad.Services
{
    public class GroupService : IGroupService
    {
        public int CreateGroup(string title, string url)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteGroupByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> EditGroupByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TViewModel>> GetAllGroupAsync<TViewModel>()
        {
            throw new NotImplementedException();
        }
    }
}
