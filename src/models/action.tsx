import { ActionType } from "../redux/actions/actions";

export interface IActionInfo<T>{
    type: ActionType;
    value: T
}

export interface IAction{
    type: ActionType
}