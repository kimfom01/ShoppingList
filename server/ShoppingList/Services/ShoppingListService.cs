using ShoppingList.Entities;
using ShoppingList.Exceptions;
using ShoppingList.Repositories;

namespace ShoppingList.Services;

public class ShoppingListService : IShoppingListService
{
    private readonly IShoppingListRepository _repository;

    public ShoppingListService(IShoppingListRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ShoppingListItem>> GetItems()
    {
        var items = await _repository.GetItems();

        if (items.Count == 0)
        {
            throw new NotFoundException("there are no items in the database");
        }

        return items;
    }

    public async Task<ShoppingListItem> GetItem(Guid id)
    {
        var item = await _repository.GetItem(id);

        if (item is null)
        {
            throw new NotFoundException($"item with id {id} not found");
        }

        return item;
    }

    public async Task<ShoppingListItem> AddItem(ShoppingListItem item)
    {
        var created = await _repository.AddItem(item);
        await _repository.SaveChanges();

        return created;
    }

    public async Task MarkAsPicked(Guid id)
    {
        var item = await _repository.GetItem(id);

        if (item is null)
        {
            throw new NotFoundException($"item with id {id} not found");
        }

        item.IsPickedUp = true;

        _repository.UpdateItem(item);
        await _repository.SaveChanges();
    }
}