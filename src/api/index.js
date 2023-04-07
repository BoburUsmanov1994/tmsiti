import {request} from "@/services/api";
import {URLS} from "@/constants/url";


export const getMaterialVolumes = (params={}) => {
    const result = request.get(URLS.volumes, {params});
    return result.then((response) => response.data);
};
export const getMostOrderedMaterials = (params={}) => {
    const result = request.get(URLS.materials+'', {params});
    return result.then((response) => response.data);
};
