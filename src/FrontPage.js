
import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
import axios from 'axios';

const FrontPage = () => {
  const APP_ID = '54ef936a';
  const APP_KEY ='a54289a8e662c204371d36e8cfd16f36';

  const [showNewForm, setShowNewForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [caloriesInput, setCaloriesInput] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    calories: '',
    image: '',
    ingredients: []
  });
  const [UpdateRecipe, setUpdateRecipe] = useState({
    title: '',
    calories: '',
    image: '',
    ingredients: []
  });

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      if (caloriesInput) {
        setRecipes(response.data.hits.filter(recipe => recipe.recipe.calories >= caloriesInput));
      } else {
        setRecipes(response.data.hits);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const updateCaloriesInput = e => {
    setCaloriesInput(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
    setCaloriesInput('');
  };

  const handleCreateRecipe = () => {
    setRecipes([...recipes, newRecipe]);
    setNewRecipe({
      title: '',
      calories: '',
      image: '',
      ingredients: []
    });
  };

  const handleRecipeUpdate = () => {
    const updatedRecipes = recipes.map(recipe => {
      if (recipe.recipe.label === selectedRecipe.recipe.label) {
        return UpdateRecipe;
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
    setSelectedRecipe(null);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleDeleteRecipe = (title) => {
    const updatedRecipes = recipes.filter(recipe => recipe.recipe.label !== title);
    setRecipes(updatedRecipes);
  };

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <input className='search-bar' type='number' value={caloriesInput} onChange={updateCaloriesInput} />
        <button className='search-button' type='submit'>Search</button>
        <button className='showbutton' onClick={() => setShowNewForm(!showNewForm)}>
          {showNewForm ? 'Hide Form' : 'Show Form'}
        </button>
      </form>

      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            onUpdate={() => handleRecipeSelect(recipe)}
            onDelete={() => handleDeleteRecipe(recipe.recipe.label)}
            onCreate={() => setShowNewForm(true)}
          />
        ))}
      </div>

      {showNewForm && (
        <div className="create-recipe">
          <h2>Create Recipe</h2>
          <input type="text" placeholder="Title" value={newRecipe.title} onChange={e => setNewRecipe({ ...newRecipe, title: e.target.value })} />
          <input type="number" placeholder="Calories" value={newRecipe.calories} onChange={e => setNewRecipe({ ...newRecipe, calories: e.target.value })} />
          <input type="text" placeholder="Image URL" value={newRecipe.image} onChange={e => setNewRecipe({ ...newRecipe, image: e.target.value })} />
          <button onClick={handleCreateRecipe}>Create</button>
        </div>
      )}

      {selectedRecipe && (
        <div className="recipe-details">
          <h2>Edit Recipe</h2>
          <input type="text" placeholder="Title" value={UpdateRecipe.title} onChange={e => setUpdateRecipe({ ...UpdateRecipe, title: e.target.value })} />
          <input type="number" placeholder="Calories" value={UpdateRecipe.calories} onChange={e => setUpdateRecipe({ ...UpdateRecipe, calories: e.target.value })} />
          <input type="text" placeholder="Image URL" value={UpdateRecipe.image} onChange={e => setUpdateRecipe({ ...UpdateRecipe, image: e.target.value })} />
          <button onClick={handleRecipeUpdate}>Update</button>

          <Recipe
            key={selectedRecipe.recipe.label}
            title={selectedRecipe.recipe.label}
            calories={selectedRecipe.recipe.calories}
            image={selectedRecipe.recipe.image}
            ingredients={selectedRecipe.recipe.ingredients}
            onUpdate={handleRecipeUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default FrontPage;
