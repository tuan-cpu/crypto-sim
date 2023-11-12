import access_1 from './accessory00001.png';
import access_2 from './accessory00002.png';
import access_3 from './accessory00003.png';
import access_4 from './accessory00004.png';
import access_5 from './accessory00005.png';
import access_6 from './accessory00006.png';
import access_7 from './accessory00007.png';
import access_8 from './accessory00008.png';
import access_9 from './accessory00009.png';
import access_10 from './accessory00010.png';
import access_11 from './accessory00011.png';
import access_12 from './accessory00012.png';
import access_13 from './accessory00013.png';
import access_14 from './accessory00014.png';
import access_15 from './accessory00015.png';
import access_16 from './accessory00016.png';
import access_17 from './accessory00017.png';
import access_18 from './accessory00018.png';
import access_19 from './accessory00019.png';
import access_20 from './accessory00020.png';
import access_21 from './accessory00021.png';
import access_22 from './accessory00022.png';
import access_23 from './accessory00023.png';
import access_24 from './accessory00024.png';
import access_25 from './accessory00025.png';
import access_26 from './accessory00026.png';
import access_27 from './accessory00027.png';
import access_28 from './accessory00028.png';
import access_29 from './accessory00029.png';
import access_30 from './accessory00030.png';
import access_31 from './accessory00031.png';
import access_32 from './accessory00032.png';
import access_33 from './accessory00033.png';
import access_34 from './accessory00034.png';
import access_35 from './accessory00035.png';
import access_36 from './accessory00036.png';
import access_37 from './accessory00037.png';
import access_38 from './accessory00038.png';
import access_39 from './accessory00039.png';
import access_40 from './accessory00040.png';
import access_41 from './accessory00041.png';
import access_42 from './accessory00042.png';
import access_43 from './accessory00043.png';
import access_44 from './accessory00044.png';
import access_45 from './accessory00045.png';
import access_46 from './accessory00046.png';
import access_47 from './accessory00047.png';
import access_48 from './accessory00048.png';
import access_49 from './accessory00049.png';
import access_50 from './accessory00050.png';
import access_51 from './accessory00051.png';
import access_52 from './accessory00052.png';
import access_53 from './accessory00053.png';
import access_54 from './accessory00054.png';
import access_55 from './accessory00055.png';
import access_56 from './accessory00056.png';
import access_57 from './accessory00057.png';
import access_58 from './accessory00058.png';
import access_59 from './accessory00059.png';
import access_60 from './accessory00060.png';
import access_61 from './accessory00061.png';
import access_62 from './accessory00062.png';
import access_63 from './accessory00063.png';
import access_64 from './accessory00064.png';
import access_65 from './accessory00065.png';
import access_66 from './accessory00066.png';
import access_67 from './accessory00067.png';
import access_68 from './accessory00068.png';
import access_69 from './accessory00069.png';
import access_70 from './accessory00070.png';
import access_71 from './accessory00071.png';
import access_72 from './accessory00072.png';
import access_73 from './accessory00073.png';
import access_74 from './accessory00074.png';
import access_75 from './accessory00075.png';
import access_76 from './accessory00076.png';
import access_77 from './accessory00077.png';
import access_78 from './accessory00078.png';
import access_79 from './accessory00079.png';
import access_80 from './accessory00080.png';
import access_81 from './accessory00081.png';
import access_82 from './accessory00082.png';
import access_83 from './accessory00083.png';
import access_84 from './accessory00084.png';

const accessoryArray = [
    access_1, access_2, access_3, access_4, access_5, access_6, access_7, access_8, access_9, access_10,
    access_11, access_12, access_13, access_14, access_15, access_16, access_17, access_18, access_19, access_20,
    access_21, access_22, access_23, access_24, access_25, access_26, access_27, access_28, access_29, access_30,
    access_31, access_32, access_33, access_34, access_35, access_36, access_37, access_38, access_39, access_40,
    access_41, access_42, access_43, access_44, access_45, access_46, access_47, access_48, access_49, access_50,
    access_51, access_52, access_53, access_54, access_55, access_56, access_57, access_58, access_59, access_60,
    access_61, access_62, access_63, access_64, access_65, access_66, access_67, access_68, access_69, access_70,
    access_71, access_72, access_73, access_74, access_75, access_76, access_77, access_78, access_79, access_80,
    access_81, access_82, access_83, access_84
];

export const getAccessory = (id) => {
    // Ensure the id is within a valid range
    if (id >= 1 && id <= accessoryArray.length) {
        return accessoryArray[id - 1];
    } else {
        // Handle invalid id, you can throw an error or return a default value
        console.error(`Invalid accessory id: ${id}`);
        return null; // You can modify this line to return a default value if needed
    }
};