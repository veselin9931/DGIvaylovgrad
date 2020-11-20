namespace DGIvaylovgrad.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IGroupService
    {
        public int CreateGroup(string title, string url);

        public Task<bool> DeleteGroupByIdAsync(string id);

        public Task<IEnumerable<TViewModel>> GetAllGroupAsync<TViewModel>();

        public Task<bool> EditGroupByIdAsync(string id);
    }
}
