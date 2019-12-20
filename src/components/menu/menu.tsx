import * as React from 'react';
import { RowFilter } from '../rowFilter/rowFilter';
import { MenuActions } from '../menuActions/menuActions';
import './menu.css';

export interface IMenuProps {
    handleDownloadAll: Function,
    handleRowChanges: Function,
    rows: number
}

export const Menu = (props: IMenuProps) =>
    <div className="menu">
        <div className="menu__actions">
            <MenuActions handleDownloadAll={props.handleDownloadAll} />
        </div>
        <div className="menu__row-filter">
            <RowFilter rows={props.rows} notifyOnChangesRows={(e: number) => props.handleRowChanges(e)} />
        </div>
    </div>
