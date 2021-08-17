/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    
    let innerArr = [...arr];

    const orderBy = {
        'asc': 1,
        'desc': -1
    }

    const multiplier = orderBy[param];

    return  innerArr.sort( (first, second) =>  multiplier * first.localeCompare(second, 'RU-en', 
    {caseFirst: multiplier === 1 ? 'upper' : 'lower', sensitivity: 'variant'}) );
}
