import { SortFilter } from "../../models/sortFilter"
import { Image } from "../../models/Image"
import { getRowsCountSetting } from "../../helpers/settings";
import { imageSearch } from "../../helpers/imageSearcher";
import { IActionInfo, IAction } from "../../models/action";

export enum ActionType {    
    SetSortFilter = 'SET_ROWS_FILTER',

    RequestImages = 'REQUEST_IMAGES',
    ImagesReceived = 'IMAGES_RECEIVED',

    RequestRowsValue = 'REQUEST_ROWS_VALUE',
    RowsValueReceived = 'ROWS_VALUE_RECEIVED',
    SetRowsValue = 'SET_ROWS_VALUE'
}

export const setSortFilter = (filter: SortFilter) : IActionInfo<SortFilter> =>({
    type: ActionType.SetSortFilter,
    value: filter
})

export const imagesReceived = (images: Image[]) : IActionInfo<Image[]> => ({
    type: ActionType.ImagesReceived,
    value: images
})

export const requestImages = () : IAction => ({
    type: ActionType.RequestImages
});

export interface SetRowsValue{
    (rows: number): void;
}

export interface SetSortFilter{
    (filter: SortFilter): void;
}

export const setRowsValue = (rows: number) : IActionInfo<number> => ({
    type: ActionType.SetRowsValue,
    value: rows
})

export const requestRowsValue = () : IAction => ({
    type: ActionType.RequestRowsValue
})

export const rowsValueReceived = (rows: number) : IActionInfo<number> => ({
    type: ActionType.RowsValueReceived,
    value: rows
})

export function receiveRowCountSettings(){
    return function(dispatch: Function){
        dispatch(requestRowsValue());
        return getRowsCountSetting().then(rows =>{ 
            dispatch(setRowsValue(rows))
        });
    }
}

export function receiveImages(excludeNodes: Node[]){
    return function(dispatch: Function){
        dispatch(requestImages());
        return imageSearch(excludeNodes).then((images: Image[]) =>{ 
            dispatch(imagesReceived(images))
        });
    }
}