import * as React from 'react';
import { Image } from '../../models/Image';
import { ListElement } from '../listElement/listElement';
import './list.css';
import { SortType, SortBy, ImgSorter } from '../../helpers/imageSorters';

export interface ListProps{
    images: Image[]
}

export interface ListState{
    sortBy: SortBy;
    sortType: SortType;
}

export class List extends React.Component<ListProps, ListState>{

    constructor(props: ListProps){
        super(props);
        this.state ={
            sortBy: SortBy.size,
            sortType: SortType.desc
        }
    }

    _resort(sortBy: SortBy){
        let newSortType = this.state.sortType === SortType.asc ? SortType.desc : SortType.asc;
        this.setState({
            sortBy: sortBy,
            sortType: newSortType
        });
    }

    render(){
        const images = ImgSorter(this.props.images, this.state.sortType, this.state.sortBy);
        const sortArrowStyle = this.state.sortType == SortType.asc ? 'sort-by-asc' : 'sort-by-desc';
        
        const imgList = images.length > 0 ? images.map(image => <ListElement key={image.id} image={image} />) : <span>Images doesn\'t found on this page.</span>

        return(
            <div className="list">
                <div className="list-header">
                    <div className="list-header__cell">
                        <span>
                            {this.state.sortBy === SortBy.name && <i className={sortArrowStyle}></i>}
                            <a onClick={()=> this._resort(SortBy.name)}>Name</a>
                        </span>
                    </div>
                    <div className="list-header__cell">
                        <span>
                        {this.state.sortBy === SortBy.size && <i className={sortArrowStyle}></i>}
                            <a onClick={()=>this._resort(SortBy.size)}>Size</a>
                        </span>
                    </div>
                </div>
                {imgList}
            </div>
        );
    }
}