import { SettingsState } from "../../models/state";
import { ActionType } from "../actions/actions";
import { setRowsCountSetting } from "../../helpers/settings";
import { IActionInfo, IAction } from "../../models/action";

export const settings = (state: SettingsState = new SettingsState(false, 10), action: IActionInfo<number> ) => {
    switch (action.type) {
        case ActionType.RequestRowsValue: return new SettingsState(true , 0);
        case ActionType.RowsValueReceived: return new SettingsState(false, action.value);
        case ActionType.SetRowsValue: {
            setRowsCountSetting(action.value);
            return new SettingsState(false, action.value);
        }
        default: return state;
    }
}