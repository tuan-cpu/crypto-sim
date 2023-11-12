import eyes_1 from './eyes00001.png';
import eyes_2 from './eyes00002.png';
import eyes_3 from './eyes00003.png';
import eyes_4 from './eyes00004.png';
import eyes_5 from './eyes00005.png';
import eyes_6 from './eyes00006.png';
import eyes_7 from './eyes00007.png';

const eyesArray = [eyes_1, eyes_2, eyes_3, eyes_4, eyes_5, eyes_6, eyes_7];

export const getEyes = (id) => {
    // Ensure the id is within a valid range
    if (id >= 1 && id <= eyesArray.length) {
        return eyesArray[id - 1];
    } else {
        // Handle invalid id, you can throw an error or return a default value
        console.error(`Invalid eyes id: ${id}`);
        return null; // You can modify this line to return a default value if needed
    }
};