import { ActionType } from "../actions/actions"
import { SortFilter, SortBy, SortType } from "../../models/sortFilter"
import { ImgFilterState } from "../../models/state";

export const imgFilter = (state: ImgFilterState = new ImgFilterState(new SortFilter(SortBy.size, SortType.desc)), action) =>{
    switch(action.type){        
        case ActionType.SetSortFilter: return new ImgFilterState(action.filter);
        default: return state;
    }
}