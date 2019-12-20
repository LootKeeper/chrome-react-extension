import { Image } from "./Image";
import { SortFilter } from "./sortFilter";

export class State{
    public images: ImagesState;
    public imagesFilter: ImagesFilterState;    
    public settings: SettingsState;
}

export class ImagesState{
    constructor(public isFetching: boolean, public items: Image[]){}
}

export class ImagesFilterState{
    constructor(public filter: SortFilter){}
}

export class SettingsState{
    constructor(public isFetching: boolean, public rows: number){}
}