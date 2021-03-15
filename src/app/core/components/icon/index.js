import React from 'react';
import {
    library
} from '@fortawesome/fontawesome-svg-core';
import {
    fas
} from '@fortawesome/free-solid-svg-icons';
import {
    FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

library.add(fas);

const Icon = ({
    style,
    color,
    type,
    name,
    size,
    ...props 
}) => {
    const sizeType = typeof size === "number";

    return <FontAwesomeIcon
        icon={[type, name]}
        size={sizeType ? null : size}
        style={{
            width: sizeType ? size : null,
            height: sizeType ? size : null,
            color: color,
            ...style
        }}
        color="white"
        {...props}
    />;
};
export default Icon;