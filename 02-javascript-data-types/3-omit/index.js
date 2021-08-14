/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    const result = {}

    for (const key in obj) {

        const isOwn = obj.hasOwnProperty(key);

        if(isOwn) {
            let count = 0;
            for(let i = 0; i < fields.length; i++) {
                if(key === fields[i]) count++;
            }
    
            if (count === 0) result[key] = obj[key];
            count = 0;
        }

    }

    return result;
};
