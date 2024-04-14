// App.js
import React from "react";
import './App.css';
import Nav from "./Nav";
import CreateRecipe from "./CreateRecipe";
import ReadRecipe from "./ReadRecipe";
import UpdateRecipe from "./UpdateRecipe";
import FrontPage from "./FrontPage"; // Assuming FrontPage is another component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/CreateRecipe" element={<CreateRecipe />} />
                    <Route path="/ReadRecipe" element={<ReadRecipe />} />
                    <Route path="/UpdateRecipe" element={<UpdateRecipe />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
