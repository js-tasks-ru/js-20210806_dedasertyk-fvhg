/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

    let innerArr = arr.slice();

    if(param === 'asc') {
        for(let i = 0; i < innerArr.length; i++) { 
            for(let j = 0; j < innerArr.length - i; j++) {
                if(innerArr[j].localeCompare(innerArr[j+1], 'RU-en', {caseFirst: 'upper', sensitivity: 'variant'}) > 0) {
                    let box = innerArr[j];
                    innerArr[j] = innerArr[j+1];
                    innerArr[j+1] = box;
                }
            }
        }
    }
    else if (param === 'desc') {
        for(let i = innerArr.length; i > 0; i--) {
            for (let j = innerArr.length - i; j > 0; j--) {
                if(innerArr[j].localeCompare(innerArr[j-1], 'RU-en', {caseFirst: 'lower', sensitivity: 'variant'}) > 0) {
                    let box = innerArr[j];
                    innerArr[j] = innerArr[j-1];
                    innerArr[j-1] = box;
                }
            }
        }
    }

    return innerArr;
}
