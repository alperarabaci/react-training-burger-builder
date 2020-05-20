
/**
 * reducer kolaylastirici
 * @param {*} oldObject 
 * @param {*} updatedProperties 
 */
export const updateObject = (oldObject, updatedProperties) => { 
    /***
     * alismadik gotte duran don misali iki satiri yanlis yazmisim.
     * Amac gelen argument'lerin icindeki degerleri alip geri donme
     * İkincisini direkt yazmisim, bakiyorum bu niye calismiyor!
     */
    return {
        ...oldObject,
        ...updatedProperties
    };
}