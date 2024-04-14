using ShoppingList.Entities;

namespace ShoppingList.Repositories;

public interface IShoppingListRepository
{
    Task<ShoppingListItem> AddItem(ShoppingListItem item);
    Task<List<ShoppingListItem>> GetItems();
    Task<ShoppingListItem?> GetItem(Guid id);
    void UpdateItem(ShoppingListItem item);
    Task<int> SaveChanges();
}