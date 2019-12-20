import * as React from 'react';

export interface IRowFilterProps {
    notifyOnChangesRows: Function
    rows: number;
}

export const RowFilter = (props: IRowFilterProps) =>
    <div>
        <input type="number" 
            value={props.rows} 
            onChange={(e) => { e.target.value ? props.notifyOnChangesRows(e.target.value) : props.notifyOnChangesRows(0) }} />
    </div>


