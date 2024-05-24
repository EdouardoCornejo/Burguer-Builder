import { FC } from "react";
import "./ingredients.css";

interface IngredientsProps {
  ingredients: string[];
}

export const Ingredients: FC<IngredientsProps> = ({ ingredients }) => {
  return (
    <>
      {ingredients.map((ingredient: string, index) => (
        <>
          <div key={index} className={ingredient}></div>
        </>
      ))}
    </>
  );
};
