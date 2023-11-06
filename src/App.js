import React, { useState } from 'react';
import './App.css';
import Gallery from './Components/Gallery';
import Images from "./Components/Images";


function App() {
    const [images, setImages] = useState(Images);

    const updateImages = (newImages) => {
        setImages(newImages);
    };

    return (
        <div className="App">
            <Gallery images={images} updateImages={updateImages} />
        </div>
    );
}

export default App;
