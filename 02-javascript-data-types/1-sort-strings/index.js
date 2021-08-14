/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    
    let innerArr = [...arr];

    if(param === 'asc') {
        innerArr.sort( (first, second) => first.localeCompare(second, 'RU-en', {caseFirst: 'upper', sensitivity: 'variant'}) );
    }
    else if (param === 'desc') {
        innerArr.sort( (first, second) => -1 * first.localeCompare(second, 'RU-en', {caseFirst: 'lower',  sensitivity: 'variant'}) );
    }

    return innerArr;
}
