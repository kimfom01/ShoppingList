import "./App.css";
import { useState, useEffect } from "react";
import { ItemCard } from "./components/ItemCard";
import { ListItem } from "./models/ListItem";
import { Header } from "./components/Header";

export const App = () => {
  const [shoppingItems, setShoppingItems] = useState<ListItem[]>();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_ROOT)
      .then((res) => res.json())
      .then((data: ListItem[]) => setShoppingItems(data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <>
      <Header />
      <main>
        <div
          style={{
            border: "1px solid #00a8e8",
            padding: "1rem",
            borderRadius: "5%",
          }}
        >
          <div className="content">
            {shoppingItems?.map((item, idx) => {
              return (
                <ItemCard
                  key={idx}
                  item={item.item}
                  id={item.id}
                  isPickedUp={item.isPickedUp}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};
