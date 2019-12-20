import * as React from 'react';
import { Image } from '../../models/Image';
import { ListElement } from '../listElement/listElement';
import './list.css';
import { SortFilter, SortBy, SortType } from '../../models/sortFilter';

export interface IListProps{
    images: Image[],
    filter: SortFilter,
    handleFilterChange: Function
}

export class List extends React.Component<IListProps, {}>{

    _resort(sortBy: SortBy){
        let newSortType = this.props.filter.sortType === SortType.asc ? SortType.desc : SortType.asc;
        const filter = new SortFilter(sortBy, newSortType);
        this.props.handleFilterChange(filter);
    }

    render(){
        const filter = this.props.filter;
        const images = this.props.images;
        const sortArrowStyle = filter.sortType == SortType.asc ? 'sort-by-asc' : 'sort-by-desc';
        
        const imgList = images && images.length > 0 ? images.map((image: Image ) => <ListElement key={image.id} image={image} />) : <span>Images doesn\'t found on this page.</span>

        return(
            <div className="list">
                <div className="list-header">
                    <div className="list-header__cell">
                        <span>
                            {filter.sortBy === SortBy.name && <i className={sortArrowStyle}></i>}
                            <a href="#" onClick={()=> this._resort(SortBy.name)}>Name</a>
                        </span>
                    </div>
                    <div className="list-header__cell">
                        <span>
                        {filter.sortBy === SortBy.size && <i className={sortArrowStyle}></i>}
                            <a href="#" onClick={()=>this._resort(SortBy.size)}>Size</a>
                        </span>
                    </div>
                </div>
                {imgList}
            </div>
        );
    }
}