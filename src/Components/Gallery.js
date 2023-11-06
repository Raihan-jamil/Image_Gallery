import React, { useState, useEffect, Fragment } from 'react';

function Gallery(props) {
    const [checkedItems, setCheckedItems] = useState(Array(props.images.length).fill(false));
    const [checkedCounter, setCheckedCounter] = useState(0);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);

    useEffect(() => {
        setCheckedCounter(checkedItems.filter(item => item).length);
    }, [checkedItems]);

    const handleImageClick = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('imageIndex', index);
        setDraggedItemIndex(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, dropIndex) => {
        if (draggedItemIndex !== null && draggedItemIndex !== dropIndex) {
            const newImages = [...props.images];

            const draggedImage = newImages[draggedItemIndex];
            newImages[draggedItemIndex] = newImages[dropIndex];
            newImages[dropIndex] = draggedImage;

            setDraggedItemIndex(null);
            setCheckedItems(checkedItems.map((checked, index) => index === draggedItemIndex || index === dropIndex ? false : checked));
            props.updateImages(newImages);
        }
    };

    const handleBtnClick = () => {
        setCheckedCounter(0);
        setCheckedItems(Array(props.images.length).fill(false));
    };

    return (
        <Fragment>
            <div className="global">
                <div className="container">
                    <div className="col-8">
                        {checkedCounter === 0 ? <h4 className="gallery">Gallery</h4> : <div className="fileContent">
                            <input className="checkboxSelected" checked="checked" type="checkbox" /><label htmlFor="">{checkedCounter} Files are Selected</label>
                        </div>}
                    </div>
                    <div className="col-4">
                        {checkedCounter === 0 ? "" : <button className="btn" onClick={handleBtnClick}>Delete Items</button>}
                    </div>
                </div>
                <div className="container">
                    {props.images.map((image, index) => (
                        <div key={index} className={`item item-${index + 1} ${index === 0 ? 'one' : ''}`}
                             draggable={true}
                             onDragStart={(event) => handleDragStart(event, index)}
                             onDragOver={handleDragOver}
                             onDrop={(event) => handleDrop(event, index)}
                        >
                            <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                onClick={() => handleImageClick(index)}
                            />
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={checkedItems[index]}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default Gallery;
