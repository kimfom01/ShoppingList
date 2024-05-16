import "./App.css";
import { useState } from "react";
import { ItemCard } from "./item/ItemCard";
import { ListItem } from "../models/ListItem";
import { Header } from "./utils/Header";
import { Button } from "./utils/Button";
import { NewItem } from "./item/NewItem";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const App = () => {
  const [newFormModal, setNewFormModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    data: shoppingItems,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryFn: () => fetchItems(),
    queryKey: ["shoppingItems"],
  });

  const fetchItems = async () => {
    const items: ListItem[] = await fetch(import.meta.env.VITE_API_ROOT).then(
      (res) => res.json()
    );

    return items;
  };

  const submitNewItem = (data: ListItem) => {
    return fetch(import.meta.env.VITE_API_ROOT, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 204) {
        handleModalClose();
      }
    });
  };

  const { mutateAsync: addItemMutation } = useMutation({
    mutationFn: submitNewItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingItems"] });
    },
  });

  const handleIsOpen = () => {
    setNewFormModal(true);
  };

  const handleModalClose = () => {
    setNewFormModal(false);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (fetchError) {
    return <>Error fetching shopping items. Please reload the page</>;
  }

  return (
    <main className="main">
      <Header />
      <NewItem
        onSubmit={addItemMutation}
        isOpen={newFormModal}
        onClose={handleModalClose}
      />
      <Button
        style={{
          padding: "0.6em 1.2em",
          borderRadius: "8px",
          width: "fit-content",
          alignSelf: "center",
        }}
        onClick={handleIsOpen}
      >
        Add New Item
      </Button>
      <div className="items-container">
        <div className="content">
          {shoppingItems?.map((item) => {
            return <ItemCard key={item.id} item={item} />;
          })}
        </div>
      </div>
    </main>
  );
};
