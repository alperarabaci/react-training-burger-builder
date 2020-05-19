
/**
 * reducer kolaylastirici
 * @param {*} oldObject 
 * @param {*} updatedProperties 
 */
export const updateObject = (oldObject, updatedProperties) => { 
    return {
        ...oldObject,
        updatedProperties
    };
}