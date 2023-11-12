import body_1 from './body00001.png';
import body_2 from './body00002.png';
import body_3 from './body00003.png';
import body_4 from './body00004.png';
import body_5 from './body00005.png';
import body_6 from './body00006.png';
import body_7 from './body00007.png';
import body_8 from './body00008.png';
import body_9 from './body00009.png';


const bodyArray = [body_1, body_2, body_3, body_4, body_5, body_6, body_7, body_8, body_9];

export const getBody = (id) => {
    // Ensure the id is within a valid range
    if (id >= 1 && id <= bodyArray.length) {
        return bodyArray[id - 1];
    } else {
        // Handle invalid id, you can throw an error or return a default value
        console.error(`Invalid body id: ${id}`);
        return null; // You can modify this line to return a default value if needed
    }
};
