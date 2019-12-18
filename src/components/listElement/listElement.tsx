import * as React from 'react';
import { Image } from '../../models/Image';
import "./listElement.css";

export interface ListElementProps{
    image: Image
}

export class ListElement extends React.Component<ListElementProps, {}>{

    _openImg(){
        window.open(this.props.image.link);
    }

    render(){
        const img = this.props.image;
        return(
            <div className="element">
                <div className="element-name">
                    <span title={img.name}><a href="#" onClick={() => this._openImg()}>{img.name}</a></span>
                </div>
                <div className="element-size">
                    <span>{img.size}</span>
                </div>
            </div>
        );
    }
}