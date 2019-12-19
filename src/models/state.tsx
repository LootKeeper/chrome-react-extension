import { Image } from "./Image";
import { SortFilter } from "./sortFilter";

export class State{
    public img: ImgState;
    public imgFilter: ImgFilterState;    
    public settings: SettingsState;
}

export class ImgState{
    constructor(public isFetching: boolean, public images: Image[]){}
}

export class ImgFilterState{
    constructor(public filter: SortFilter){}
}

export class SettingsState{
    constructor(public isFetching: boolean, public rows: number){}
}