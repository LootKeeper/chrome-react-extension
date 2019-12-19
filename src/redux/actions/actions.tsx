import { SortFilter } from "../../models/sortFilter"
import { Image } from "../../models/Image"
import { getRowsCountSetting } from "../../helpers/settings";
import { imageSearch } from "../../helpers/imageSearcher";

export enum ActionType {    
    SetSortFilter = 'SET_ROWS_FILTER',

    RequestImages = 'REQUEST_IMAGES',
    ImagesReceived = 'IMAGES_RECEIVED',

    RequestRowsValue = 'REQUEST_ROWS_VALUE',
    RowsValueReceived = 'ROWS_VALUE_RECEIVED',
    SetRowsValue = 'SET_ROWS_VALUE'
}

export const setSortFilter = (filter: SortFilter) =>({
    type: ActionType.SetSortFilter,
    filter
})

export const imagesReceived = (images: Image[]) => ({
    type: ActionType.ImagesReceived,
    images
})

export const requestImages = () => ({
    type: ActionType.RequestImages
});

export interface SetRowsValue{
    (rows: number): void;
}

export interface SetSortFilter{
    (filter: SortFilter): void;
}

export const setRowsValue = (rows: number) => ({
    type: ActionType.SetRowsValue,
    rows
})

export const requestRowsValue = () => ({
    type: ActionType.RequestRowsValue
})

export const RowsValueReceived = (rows: number) => ({
    type: ActionType.RowsValueReceived,
    rows
})

export function receiveRowCountSettings(){
    return function(dispatch){
        dispatch(requestRowsValue());
        return getRowsCountSetting().then(rows =>{ 
            dispatch(setRowsValue(rows))
        });
    }
}

export function receiveImages(excludeNodes: Node[]){
    return function(dispatch){
        dispatch(requestImages());
        return imageSearch(excludeNodes).then((images: Image[]) =>{ 
            dispatch(imagesReceived(images))
        });
    }
}