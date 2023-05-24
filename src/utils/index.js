import {find, get, isArray, isNil} from "lodash";
import i18config from "../services/i18n"

export const getDefaultValue = (options, id) => {
    return find(options, (option) => get(option, 'value') == id)
}

export const getOptionList = (options, key = 'id', value = 'name', isFilter = false) => {
    if (isArray(options)) {
        if (isFilter) {
            return options.filter(_option => !isNil(get(_option, 'filterUrl'))).map(option => ({
                value: get(option, key),
                label: i18config.t(get(option, value))
            }))
        }
        return options.map(option => ({value: get(option, key), label:  i18config.t(get(option, value))}))
    }
    return []
}