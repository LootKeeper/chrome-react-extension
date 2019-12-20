import * as React from 'react';
import { Image } from '../../models/Image';
import "./listElement.css";

export interface IListElementProps {
    image: Image
}

export const ListElement = ({image}: IListElementProps) =>
    <div className="element">
        <div className="element-name">
            <span title={image.name}><a href="#" onClick={() => window.open(image.link)}>{image.name}</a></span>
        </div>
        <div className="element-size">
            <span>{image.size}</span>
        </div>
    </div>