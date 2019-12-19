import { State, ImgState } from "../../models/state";
import { ActionType } from "../actions/actions";
import { Image } from "../../models/Image";

export const img = (state: ImgState = new ImgState(false, []), action) =>{
    switch(action.type){
        case ActionType.RequestImages: return new ImgState(true, []);
        case ActionType.ImagesReceived: return new ImgState(false, action.images);
        default: return new ImgState(false, state.images);
    }
}