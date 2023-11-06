import React, { useState } from 'react';
import './App.css';

const images = [
    { src: 'https://picsum.photos/200/300?image=1005', alt: 'Image 1' },
    { src: 'https://picsum.photos/200/300?image=1006', alt: 'Image 2' },
    { src: 'https://picsum.photos/200/300?image=1007', alt: 'Image 3' },
];

const App = () => {
    const [imageOrder, setImageOrder] = useState(images);

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('imageIndex', index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        const dragIndex = parseInt(event.dataTransfer.getData('imageIndex'));
        const dropIndex = event.target.getAttribute('data-index');

        const newImageOrder = [...imageOrder];
        const draggedImage = newImageOrder[dragIndex];
        newImageOrder.splice(dragIndex, 1);
        newImageOrder.splice(dropIndex, 0, draggedImage);

        setImageOrder(newImageOrder);
    };

    return (
        <div className="App">
            {imageOrder.map((image, index) => (
                <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    draggable={true}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-index={index}
                />
            ))}
        </div>
    );
};

export default App;


