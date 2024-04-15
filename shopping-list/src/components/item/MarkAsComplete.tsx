import { Button } from "../utils/Button";

interface Prop {
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  completed: boolean;
  itemId: string;
}

export const MarkAsComplete = ({ setCompleted, completed, itemId }: Prop) => {
  const handleClick = () => {
    fetch(`${import.meta.env.VITE_API_ROOT}/${itemId}`, {
      method: "patch",
    })
      .then((res) => {
        if (res.status === 204) {
          setCompleted(!completed);
        }
      })
      .catch((err) => console.error(err.message));
  };

  return <Button onClick={handleClick}>✅</Button>;
};
