import * as React from 'react';

export interface MenuActionsProps{
    handleDownloadAll: Function
}

export class MenuActions extends React.Component<MenuActionsProps, {}>{
    render(){
        return(
            <React.Fragment>
                <button onClick={() => { this.props.handleDownloadAll() }}>Download All</button>
            </React.Fragment>
        )
    }
}