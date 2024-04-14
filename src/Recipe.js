import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients, onUpdate, onDelete, onCreate }) => {

  const handleUpdate = () => {
    onUpdate({
      recipe: {
        label: title,
        calories,
        image,
        ingredients
      }
    });
  };

  const handleDelete = () => {
    onDelete(title);
  };

  const handleCreate = () =>{
    onCreate({
      recipe:{
        label:title,
        calories,
        image,
        ingredients
      }
    });
  };
  

  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <p>{calories}</p>
      <img src={image} alt={title} />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ul>
      <button className={style.button} onClick={handleUpdate}>Update</button>
      <button className={style.button} onClick={handleDelete}>Delete</button>
      {/* <button className={style.button} onClick={handleCreate}>Create</button> */}
    </div>
  );
};

export default Recipe;