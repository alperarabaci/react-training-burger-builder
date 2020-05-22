
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

export const checkValidity = (value, rules) => {
    let isValid = true;

    if(rules.required){
        isValid &= value.trim() !==  '';
    }

    if(rules.minLength) {
        isValid &= value.length >= rules.minLength;
    }

    if(rules.maxLength) {
        isValid &= value.length <= rules.maxLength;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}