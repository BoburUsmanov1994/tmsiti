import {request} from "@/services/api";


export const getVolumes = ({params={},url='/'}) => {
    const result = request.get(url, {params});
    return result.then((response) => response.data);
};
export const getMostOrdered = ({params={},url='/'}) => {
    const result = request.get(url, {params});
    return result.then((response) => response.data);
};
