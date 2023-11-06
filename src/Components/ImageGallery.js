import React, { useState } from 'react';
import { ListManager } from 'react-beautiful-dnd-grid';

const noop = () => {};

const list = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
];

const ListElement = (props) => <div>id: {props.item.id}</div>;

const ParentComponent = () => {
    const [items, setItems] = useState(list);

    return (
        <div>
            <ListManager
                items={items}
                direction="horizontal"
                maxItems={3}
                render={(item) => <ListElement item={item} />}
                onDragEnd={noop}
            />
        </div>
    );
};

export default ParentComponent;
