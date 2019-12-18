import * as React from 'react';
import { RowFilter } from '../rowFilter/rowFilter';
import { MenuActions } from '../menuActions/menuActions';
import './menu.css';

export interface MenuProps{
    handleDownloadAll: Function,
    handleRowChanges: Function,
    rows: number
}

export class Menu extends React.Component<MenuProps, {}> {
    render() {
        return (
            <div className="menu">
                <div className="menu__actions">
                   <MenuActions handleDownloadAll={this.props.handleDownloadAll}/>
                </div>
                <div className="menu__row-filter">
                    <RowFilter rows={this.props.rows} notifyOnChangesRows={(e: number) => this.props.handleRowChanges(e)} />
                </div>
            </div>
        );
    }
}