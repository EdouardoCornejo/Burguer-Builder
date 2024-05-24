import { FC } from "react";
import "./buttons.css";

interface ButtonsProps {
  ingredient: string;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
}

export const Buttons: FC<ButtonsProps> = ({
  ingredient,
  addIngredient,
  removeIngredient,
}) => {
  return (
    <>
      <div className="btn-container">
        <button className="btn" onClick={() => addIngredient(ingredient)}>
          Add
        </button>
        <button className="btn" onClick={() => removeIngredient(ingredient)}>
          Remove
        </button>
      </div>
    </>
  );
};
