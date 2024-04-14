import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from 'semantic-ui-react';
import axios from "axios";

const ReadRecipe = ({ query }) => {
    const [APIData, setAPIData] = useState([]);
    const APP_ID = '54ef936a';
    const APP_KEY ='a54289a8e662c204371d36e8cfd16f36';

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const setData = (data) => {
        localStorage.setItem('ID', data.id);
        localStorage.setItem('title', data.title);
        localStorage.setItem('calories', data.calories);
        localStorage.setItem('image', data.image);
        localStorage.setItem('ingredients', data.ingredients);
        localStorage.setItem('Checkbox value', data.Checkbox);
    };

    const onDelete = (id) => {
        axios.delete(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}/${id}`)
            .then(() => {
                getData();
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
            });
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Calories</TableHeader>
                        <TableHeader>Image</TableHeader>
                        <TableHeader>Ingredients</TableHeader>
                        <TableHeader>Checked</TableHeader>
                        <TableHeader>Update</TableHeader>
                        <TableHeader>Delete</TableHeader>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {APIData.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell>{data.title}</TableCell>
                            <TableCell>{data.calories}</TableCell>
                            <TableCell>{data.image}</TableCell>
                            <TableCell>{data.ingredients}</TableCell>
                            <TableCell>{data.Checkbox ? 'checked' : 'Unchecked'}</TableCell>
                            <TableCell>
                                <Button onClick={() => setData(data)}>Update</Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => onDelete(data.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ReadRecipe;
