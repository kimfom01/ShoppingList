interface Prop {
  icon: string;
  onClick: () => void;
}

export const Button = ({ icon, onClick }: Prop) => {
  return (
    <button
      onClick={onClick}
      style={{
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
      }}
    >
      {icon}
    </button>
  );
};
