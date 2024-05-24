import { FC } from "react";
import salad from "../../../assets/salad.png";
import beacon from "../../../assets/beacon.png";
import cheese from "../../../assets/cheese.png";
import meat from "../../../assets/meat.png";
import tomato from "../../../assets/tomato.png";

import "./controls.css";
import { Buttons, Icons } from "../../atoms";

interface ControlsProps {
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
}

export const Controls: FC<ControlsProps> = ({
  ingredients,
  addIngredient,
  removeIngredient,
}) => {
  const ingredientsImages = {
    salad: salad,
    beacon: beacon,
    cheese: cheese,
    meat: meat,
    tomato: tomato,
  };

  return (
    <>
      <div className="controls-container">
        {ingredients.map((ingredient: string) => (
          <div key={ingredient}>
            <div className="container">
              <div className="control">
                <Icons Images={ingredientsImages} ingredient={ingredient} />
                <p className="controlText">Ingredient {ingredient}</p>
                <Buttons
                  ingredient={ingredient}
                  addIngredient={addIngredient}
                  removeIngredient={removeIngredient}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
