import { SettingsState } from "../../models/state";
import { ActionType } from "../actions/actions";
import { setRowsCountSetting } from "../../helpers/settings";

export const settings = (state: SettingsState = new SettingsState(false, 10), action) => {
    switch (action.type) {
        case ActionType.RequestRowsValue: return new SettingsState(true , 0);
        case ActionType.RowsValueReceived: return new SettingsState(false, action.rows);
        case ActionType.SetRowsValue: {
            setRowsCountSetting(action.rows);
            return new SettingsState(false, action.rows);
        }
        default: return state;
    }
}