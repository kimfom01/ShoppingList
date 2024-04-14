using ShoppingList.Entities;

namespace ShoppingList.Services;

public interface IShoppingListService
{
    Task<List<ShoppingListItem>> GetItems();
    Task<ShoppingListItem> GetItem(Guid id);
    Task<ShoppingListItem> AddItem(ShoppingListItem item);
    Task MarkAsPicked(Guid id);
}