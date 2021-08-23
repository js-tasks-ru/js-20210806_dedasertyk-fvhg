/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let strArr = string.split('');
    
    let counter = 0;
    for(let i = 0; i < strArr.length; i++) {
        if(strArr[i] === strArr[i+1]) {
            counter += 1;

            if(counter > size) strArr[i] = ''; 
        }
        else {
            if(counter >= size) strArr[i] = '';
            counter = 0;
        }
    }

    return strArr.join('');
}
