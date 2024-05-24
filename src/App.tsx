import { useState } from "react";
import "./App.css";
import { Ingredients } from "./components";
import { Controls } from "./components";
import Restart from "./assets/renew.svg";

function App() {
  const burguer = [
    "salad",
    "salad",
    "beacon",
    "cheese",
    "cheese",
    "meat",
    "meat",
    "tomato"
  ];

  const [ingredients, setIngredients] = useState(burguer);

  const addIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(
      ingredients.filter(
        (ing, index) =>
          ing !== ingredient || index !== ingredients.indexOf(ingredient)
      )
    );
  };

  const restartBurger = () => {
    setIngredients(burguer);
    const imgElement = document.querySelector(".restart");
    imgElement?.classList.add("rotate");
    imgElement?.addEventListener("animationend", () => {
      imgElement.classList.remove("rotate");
    });
  };

  const uniqueIngredients = [...new Set(burguer)];

  return (
    <>
      <div className="box">
        <div className="title-content">
          <h1 className="title">Burguer Builder</h1>
          <img
            src={Restart}
            alt="img"
            className="restart"
            onClick={restartBurger}
          />
        </div>

        <div className="bread-top">
          <div className="seeds1"></div>
          <div className="seeds2"></div>
        </div>
        <Ingredients ingredients={ingredients} />
        <div className="bread-bottom"></div>

        <Controls
          ingredients={uniqueIngredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />
      </div>
    </>
  );
}

export default App;
