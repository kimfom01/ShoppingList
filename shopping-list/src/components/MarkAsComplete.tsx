import { Button } from "./Button";

interface Prop {
  setPicked: React.Dispatch<React.SetStateAction<boolean>>;
  picked: boolean;
  itemId: string;
}

export const MarkAsComplete = ({ setPicked, picked, itemId }: Prop) => {
  const handleClick = () => {
    fetch(`${import.meta.env.VITE_API_ROOT}/${itemId}`, {
      method: "patch",
    })
      .then((res) => {
        if (res.status === 204) {
          setPicked(!picked);
        }
      })
      .catch((err) => console.error(err.message));
  };

  return <Button onClick={handleClick}>✅</Button>;
};
