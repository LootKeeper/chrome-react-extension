export enum SortType{ desc, asc }

export enum SortBy { size = "size", name = "name" }

export class SortFilter{
    constructor(
        public sortBy: SortBy, 
        public sortType: SortType
        ){}
} 