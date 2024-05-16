import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../utils/Button";

interface Prop {
  itemId: string;
}

export const MarkAsComplete = ({ itemId }: Prop) => {
  const queryClient = useQueryClient();

  const handleClick = () => {
    return fetch(`${import.meta.env.VITE_API_ROOT}/${itemId}`, {
      method: "patch",
    });
  };

  const { mutateAsync: markAsCompleteMutation } = useMutation({
    mutationFn: handleClick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingItems"] });
    },
  });

  return (
    <Button
      style={{
        padding: "0.3rem",
        paddingRight: "0.8rem",
        paddingLeft: "0.8rem",
        backgroundColor: "inherit",
        borderRadius: "8px",
      }}
      onClick={markAsCompleteMutation}
    >
      ✅
    </Button>
  );
};
