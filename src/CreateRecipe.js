import React, { useState } from "react";
import { Button, Checkbox, Form, FormField } from 'semantic-ui-react';
import axios from "axios";
import "./CreateRecipe.css"; 

const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const APP_ID = '54ef936a';
    const APP_KEY ='a54289a8e662c204371d36e8cfd16f36';

    const postData = () => {
        axios.post(`https://api.edamam.com/search?q=${title}&app_id=${APP_ID}&app_key=${APP_KEY}`, {
            recipes:{
            title,
            calories,
            image,
            ingredients,
            Checkbox: checkbox 
            }// Capitalized Checkbox to match the API
        }).then(() => {
            // Optionally, you can handle successful submission here
            // For example, you can redirect the user to another page
        }).catch(error => {
            console.error('Error posting data:', error);
        });
    };

    const handleButtonClick = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!checkbox) {
            return;
        }
        postData();
    };

    return (
        <div>
            <h1>CreateRecipe</h1>
            <Form className="container">
                <FormField className="form-field">
                    <label>Title</label>
                    <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormField>
                <FormField>
                    <label>Calories</label>
                    <input placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
                </FormField>
                <FormField>
                    <label>Image</label>
                    <input placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
                </FormField>
                <FormField>
                    <label>Ingredients</label>
                    <input placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                </FormField>
                <FormField>
                    <Checkbox
                        className="checkbox"
                        label='I agree to the Terms and Conditions'
                        onChange={(e) => setCheckbox(!checkbox)}
                        checked={checkbox}
                    />
                </FormField>
                <Button className="submit-button" type="submit" onClick={handleButtonClick} disabled={!checkbox}>Submit</Button>
            </Form>
        </div>
    );
}

export default CreateRecipe;
