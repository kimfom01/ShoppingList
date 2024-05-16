import { ListItem } from "../../models/ListItem";
import { Delete } from "./Delete";
import { MarkAsComplete } from "./MarkAsComplete";
import "./itemCard.css";

interface Prop {
  item: ListItem;
}

export const ItemCard = ({ item }: Prop) => {
  const greyColor = "#808080";

  return (
    <div
      className="item-card"
      style={{
        backgroundColor: item.isPickedUp ? greyColor : "",
      }}
    >
      <div className="flex-space">
        <div
          style={{
            textDecoration: item.isPickedUp ? "line-through" : "",
          }}
        >
          {item.item}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <MarkAsComplete itemId={item.id ?? ""} />
          <Delete itemId={item.id ?? ""} />
        </div>
      </div>
    </div>
  );
};
