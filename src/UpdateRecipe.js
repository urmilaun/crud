import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, FormField } from 'semantic-ui-react';
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

const UpdateRecipe = ({ query }) => {
    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [progress, setProgress] = useState(0);
    const [id, setID] = useState(null);
    let history = useNavigate();
    const APP_ID = '54ef936a';
    const APP_KEY ='a54289a8e662c204371d36e8cfd16f36';

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setTitle(localStorage.getItem('title'));
        setCalories(localStorage.getItem('calories'));
        setImage(localStorage.getItem('image'));
        setIngredients(localStorage.getItem('ingredients'));
        setCheckbox(localStorage.getItem('Checkbox value'));
    }, []);

    const UpdateAPIData = () => {
        axios.put(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}/${id}`, {
            title,
            calories,
            image,
            ingredients,
            checkbox
        }).then(() => {
            history('/ReadRecipe');
        }).catch(error => {
            console.error('Error updating data:', error);
        });
    };

    const handleButtonClick = () => {
        if (!checkbox) {
            return;
        }
        setProgress(100);
        UpdateAPIData();
    };

    return (
        <div>
            <LoadingBar 
                color="#f11946"
                progress={progress}
                onLoaderFinished={() => setProgress(100)}
            />
            <Form>
                <FormField>
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
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)} checked={checkbox} />
                </FormField>

                <Button type="submit" onClick={handleButtonClick} disabled={!checkbox}>Update</Button>
            </Form>
        </div>
    );
}

export default UpdateRecipe;
