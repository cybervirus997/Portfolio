/* eslint-disable */
import { 
    greenThemeLight, greenThemeDark, bwThemeLight, bwThemeDark, blueThemeLight, blueThemeDark, redThemeLight, redThemeDark, orangeThemeLight, orangeThemeDark, purpleThemeLight, purpleThemeDark, pinkThemeLight, pinkThemeDark, yellowThemeLight, yellowThemeDark
} from '../theme/theme'

import React, {useState} from 'react';

const arr = [greenThemeLight, greenThemeDark, bwThemeLight, bwThemeDark, blueThemeLight, blueThemeDark, redThemeLight, redThemeDark, orangeThemeLight, orangeThemeDark, purpleThemeLight, purpleThemeDark, pinkThemeLight, pinkThemeDark, yellowThemeLight, yellowThemeDark];


var trig = 4;


// const ChangeState = () => {
    
//     const [Trigps, setTrig] = useState(0);
    
//     const handleChange = () => {
//         if (arr.length - 1 == trigs) {
//             setTrig(0)
//         } else {
//             setTrig(Trigps+1)
//          }
        
//     }

 
    
//     return (
//         <>
//             <button onClick={handleChange} > Next </button>
//         </>
//     )

// }

export const themeData = {
    theme: arr[trig] 
}


// Choose theme from above