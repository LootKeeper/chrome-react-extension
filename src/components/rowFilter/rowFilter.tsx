import * as React from 'react';

export interface RowFilterProps{
    notifyOnChangesRows: Function
    rows: number;
}

export class RowFilter extends React.Component<RowFilterProps, {}>{

    _handleRowChanges(e: React.ChangeEvent<HTMLInputElement>){
        let value = parseInt(e.target.value);
        if(!value) value = 0;
        this.props.notifyOnChangesRows(value);
    }

    render(){
        return(
            <div>
                <input type="number" value={this.props.rows} onChange={(e) => this._handleRowChanges(e)}/>
            </div>
        );
    }
}