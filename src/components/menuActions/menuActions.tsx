import * as React from 'react';

export interface IMenuActionsProps {
    handleDownloadAll: Function
}

export const MenuActions = (props: IMenuActionsProps) =>
    <React.Fragment>
        <button onClick={() => { props.handleDownloadAll() }}>Download All</button>
    </React.Fragment>
