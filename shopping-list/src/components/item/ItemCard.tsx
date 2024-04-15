import { ListItem } from "../../models/ListItem";
import { Delete } from "./Delete";
import { MarkAsComplete } from "./MarkAsComplete";

interface Prop {
  item: ListItem;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  deleted: boolean;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  completed: boolean;
}

export const ItemCard = ({
  item,
  setDeleted,
  deleted,
  setCompleted,
  completed,
}: Prop) => {
  return (
    <div
      style={{
        width: "95%",
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
            textDecoration: item.isPickedUp ? "line-through" : "",
          }}
        >
          {item.item}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <MarkAsComplete
            setCompleted={setCompleted}
            completed={completed}
            itemId={item.id ?? ""}
          />
          <Delete
            setDeleted={setDeleted}
            itemId={item.id ?? ""}
            deleted={deleted}
          />
        </div>
      </div>
    </div>
  );
};
