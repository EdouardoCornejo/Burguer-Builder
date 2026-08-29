import { useState } from 'react';
import './App.css';
import { Ingredients } from './components';
import { Controls } from './components';
import Restart from './assets/renew.svg';

const AVAILABLE_INGREDIENTS = ['salad', 'beacon', 'cheese', 'meat', 'tomato'];

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(
      ingredients.filter(
        (ing, index) => ing !== ingredient || index !== ingredients.indexOf(ingredient),
      ),
    );
  };

  const restartBurger = () => {
    setIngredients([]);
    const imgElement = document.querySelector('.restart');
    imgElement?.classList.add('rotate');
    imgElement?.addEventListener('animationend', () => {
      imgElement.classList.remove('rotate');
    });
  };

  return (
    <>
      <div className="box">
        <div className="title-content">
          <h1 className="title">Burguer Builder</h1>
          <img src={Restart} alt="img" className="restart" onClick={restartBurger} />
        </div>

        <div className="bread-top">
          <div className="seeds1"></div>
          <div className="seeds2"></div>
        </div>
        {ingredients.length === 0 && <p className="empty-hint">¡Agrega ingredientes! 👇</p>}
        <Ingredients ingredients={ingredients} />
        <div className="bread-bottom"></div>

        <Controls
          ingredients={AVAILABLE_INGREDIENTS}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />
      </div>
    </>
  );
}

export default App;
