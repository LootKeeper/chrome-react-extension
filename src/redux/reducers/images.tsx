import { State, ImagesState } from "../../models/state";
import { ActionType } from "../actions/actions";
import { Image } from "../../models/Image";
import { IActionInfo } from "../../models/action";

export const images = (state: ImagesState = new ImagesState(false, []), action: IActionInfo<Image[]>) =>{
    switch(action.type){
        case ActionType.RequestImages: return new ImagesState(true, []);
        case ActionType.ImagesReceived: return new ImagesState(false, action.value);
        default: return new ImagesState(false, state.items);
    }
}