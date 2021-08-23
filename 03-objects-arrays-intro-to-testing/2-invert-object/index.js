/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    if(!obj) return;
    
    const innerObj = {}
    
    for(const key in obj)  if(obj.hasOwnProperty(key)) innerObj[obj[key]] = key

    return innerObj;
}
