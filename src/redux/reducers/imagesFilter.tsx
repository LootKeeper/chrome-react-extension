import { ActionType } from "../actions/actions"
import { SortFilter, SortBy, SortType } from "../../models/sortFilter"
import { ImagesFilterState } from "../../models/state";
import { IActionInfo } from "../../models/action";

export const imagesFilter = (state: ImagesFilterState = new ImagesFilterState(new SortFilter(SortBy.size, SortType.desc)), action: IActionInfo<SortFilter>) =>{
    switch(action.type){        
        case ActionType.SetSortFilter: return new ImagesFilterState(action.value);
        default: return state;
    }
}