import { ListItem } from "../models/ListItem";
import { Delete } from "./Delete";
import { MarkAsComplete } from "./MarkAsComplete";
import { useState } from "react";

export const ItemCard = ({ item, isPickedUp, id }: ListItem) => {
  const [picked, setPicked] = useState<boolean>(false);

  return (
    <div
      style={{
        width: "18rem",
        height: "2rem",
        backgroundColor: "#007ea7",
        marginTop: "1rem",
        borderRadius: "15px",
        padding: "10px",
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            textDecoration: picked || isPickedUp ? "line-through" : "",
          }}
        >
          {item}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <MarkAsComplete setPicked={setPicked} picked={picked} itemId={id} />
          <Delete />
        </div>
      </div>
    </div>
  );
};
