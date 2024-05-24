import { FC } from "react";
import "./icons.css";

interface IngredientImages {
  salad: string;
  beacon: string;
  cheese: string;
  meat: string;
}

interface IconsProps {
  Images: IngredientImages;
  ingredient: string;
}

export const Icons: FC<IconsProps> = ({ Images, ingredient }) => {
  return (
    <>
      <img
        src={Images[ingredient as keyof typeof Images]}
        className="img"
        alt={ingredient}
      />
    </>
  );
};
