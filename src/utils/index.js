import {find, isEqual, get, isArray} from "lodash";

export const getDefaultValue = (options,id) => {
    return find(options,(option)=>get(option,'value') == id)
}

export const getOptionList = (options,key='id',value='name') => {
    if(isArray(options)) {
        return options.map(option=>({value:get(option,key),label:get(option,value)}))
    }
    return []
}