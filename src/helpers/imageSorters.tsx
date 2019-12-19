import { Image } from "../models/Image";
import { SortType, SortFilter, SortBy } from "../models/sortFilter";

export const imageSorter = function(images: Image[], filter: SortFilter){
    if(filter.sortBy == SortBy.size){
        if(filter.sortType == SortType.desc){
            return images.sort(descSortBySize);
        }else{
            return images.sort(ascSortBySize);
        }
    }else{
        if(filter.sortType == SortType.asc){
            return images.sort(ascSortByName);
        }else{
            return images.sort(descSortByName);
        }
    }
}


const descSortBySize = function(a: Image, b: Image){
    if(a.biteSize > b.biteSize) return -1;
    if(a.biteSize < b.biteSize) return 1;
    return 0;
}

const ascSortBySize = function(a: Image, b: Image){   
    if(a.biteSize < b.biteSize) return -1;
    if(a.biteSize > b.biteSize) return 1;
    return 0;
}

const ascSortByName = function(a: Image, b: Image){
    return a.name.localeCompare(b.name);
}

const descSortByName = function(a: Image, b: Image){
    return b.name.localeCompare(a.name);
}

