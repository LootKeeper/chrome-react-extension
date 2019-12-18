import { Image } from "../models/Image";

export enum SortType{ desc, asc }

export enum SortBy { size = "size", name = "name" }

export const ImgSorter = function(images: Image[], sort: SortType, sortBy: SortBy){
    if(sortBy == SortBy.size){
        if(sort == SortType.desc){
            return images.sort(descSortBySize);
        }else{
            return images.sort(ascSortBySize);
        }
    }else{
        if(sort == SortType.asc){
            return images.sort(ascSortByName);
        }else{
            return images.sort(descSortByName);
        }
    }
}


export const descSortBySize = function(a: Image, b: Image){
    if(a.biteSize > b.biteSize) return -1;
    if(a.biteSize < b.biteSize) return 1;
    return 0;
}

export const ascSortBySize = function(a: Image, b: Image){   
    if(a.biteSize < b.biteSize) return -1;
    if(a.biteSize > b.biteSize) return 1;
    return 0;
}

export const ascSortByName = function(a: Image, b: Image){
    return a.name.localeCompare(b.name);
}

export const descSortByName = function(a: Image, b: Image){
    return b.name.localeCompare(a.name);
}

