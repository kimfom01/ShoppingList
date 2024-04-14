using Microsoft.EntityFrameworkCore;
using ShoppingList.Data;
using ShoppingList.Repositories;
using ShoppingList.Services;
using ShoppingList.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ShoppingListDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("ShoppingListDb"));
    // options.UseInMemoryDatabase("ShoppingListDb");
});
builder.Services.AddScoped<IShoppingListRepository, ShoppingListRepository>();
builder.Services.AddScoped<IShoppingListService, ShoppingListService>();

var app = builder.Build();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Setup(builder.Environment);

app.Run();