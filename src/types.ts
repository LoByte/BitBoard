type BaseBitComponent = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BitComponent = BaseBitComponent &
  (
    | {
        type: "message";
        color: string;
        message: string;
      }
    | {
        type: "button";
        color?: "inherit" | "primary" | "secondary" | "default";
        message: string;
        variant?: "text" | "outlined" | "contained";
      }
  );
