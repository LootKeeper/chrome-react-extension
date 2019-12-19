import * as React from 'react';
import { Image } from '../../models/Image';
import { toggleVisibility } from '../..';
import { Menu } from '../menu/menu';
import { List } from '../list/list';
import { setRowsValue, setSortFilter, SetRowsValue, SetSortFilter, receiveRowCountSettings, receiveImages } from '../../redux/actions/actions';
import { SortFilter } from '../../models/sortFilter';
import { connect } from 'react-redux'
import { State } from '../../models/state';
import { imageSorter } from '../../helpers/imageSorters';


export interface ImgGrabberProps {
    parentElement: HTMLDivElement,
    setRowsValue: SetRowsValue,
    setSortFilter: SetSortFilter,
    filter: SortFilter,
    images: Image[],
    rows: number,
    getRowsCount: Function,
    getImages: Function
}

const defaultRows: number = 10;

class ImgGrabber extends React.Component<ImgGrabberProps, {}> {

    _mainNodeRef: React.RefObject<HTMLDivElement>

    constructor(props: ImgGrabberProps) {
        super(props);
        this._mainNodeRef = React.createRef();
    }    

    componentDidMount() {
        this._getRowSettings();
        this._imgSearch();        
    }   
    
    _getRowSettings() {
        this.props.getRowsCount();
    }

    _imgSearch(){
        this.props.getImages([this._mainNodeRef.current]);
    }

    _handleDownloadAll() {
        this.state.images.forEach(image => {
            const request = { type: 'downloadImage', image: image };
            chrome.runtime.sendMessage(request);
        });
    }

    _closeHandler() {
        toggleVisibility(this.props.parentElement);
    }

    _handleRowChanges(value: number) {
        this.props.setRowsValue(value);
    }

    render() {
        const images = this.props.images;
        return (
            <div id="main" ref={this._mainNodeRef} className="app">
                <div className="content">
                    <div className="content-body container">
                        <div className="menu-container">
                            <Menu
                                handleDownloadAll={() => this._handleDownloadAll()}
                                handleRowChanges={(e: number) => this._handleRowChanges(e)}
                                rows={this.props.rows} />
                        </div>
                        <div className="list-container">
                            <List 
                                images={images} 
                                handleFilterChange={(filter: SortFilter) => this.props.setSortFilter(filter)} 
                                filter={this.props.filter} />
                        </div>
                    </div>
                    <div className="header">
                        <button className="header__close-btn" onClick={() => this._closeHandler()}>X</button>
                    </div>
                </div>
            </div>
        );
    }
}

const filterImages = (images: Image[], rows: number, filter: SortFilter) => {
    return imageSorter(images.slice(0, rows), filter);
}

const mapStateToProps = (state: State) =>{
    return {
        filter: state.imgFilter.filter,
        rows: state.settings.rows,
        images: filterImages(state.img.images, state.settings.rows, state.imgFilter.filter)
    }
}

const mapDispatchToProps = (dispatch: Function) =>{
    return {
        setRowsValue: (rows: number) =>{
            dispatch(setRowsValue(rows))
        },
        setSortFilter: (filter: SortFilter) =>{
            dispatch(setSortFilter(filter));
        },
        getRowsCount: () =>{
            dispatch(receiveRowCountSettings());
        },
        getImages: (excludeNodes: Node[]) =>{
            dispatch(receiveImages(excludeNodes))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgGrabber);