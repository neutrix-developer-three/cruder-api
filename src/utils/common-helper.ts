import axios from 'axios';
import { customAlphabet } from 'nanoid';

export const isArraySame = async (array1: any, array2: any) => {
    const is_same =
        array1.length === array2.length &&
        array2.every(function (id: any, index: any) {
            return id === array1[index];
        });

    return is_same;
};

export const generateNewNanoId = async (isOnlyNumber: any) => {
    let alphabetCombination = '1234567890abcdef';
    if (isOnlyNumber === true) {
        alphabetCombination =
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    const nanoid = customAlphabet(alphabetCombination, 8);
    return 'macpharms' + nanoid();
};

export const generateOrderId = async (ordersData: any) => {
    const arr = [];
    if (ordersData.length > 0) {
        for (let data = 0; data < ordersData.length; data++) {
            const orderId = ordersData[data]['orderId'].split('macpharms');
            if (!isNaN(orderId[0])) {
                if (orderId.length > 1) {
                    arr.push(parseInt(orderId[1]));
                } else {
                    arr.push(parseInt(orderId[0]));
                }
            }
        }

        const maxOrderID = Math.max(...arr) + 1;
        return maxOrderID.toString();
    } else {
        return '1000';
    }
};

export const generateStockId = async (stockData: any) => {
    const  arr = [];
    if (stockData.length > 0) {
        for (let data = 0; data < stockData.length; data++) {
            const  orderId = stockData[data]['StockID'].split('macpharms');
            arr.push(parseInt(orderId[1]));
        }
        const maxOrderID = Math.max(...arr) + 1;
        return 'macpharms' + maxOrderID;
    } else {
        return 'macpharms1000';
    }
};

export function generateRandomPassword(passwordLength: number) {
    const numberChars = '0123456789';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const allChars = numberChars + upperChars + lowerChars;
    let randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return shuffleArray(
        randPasswordArray.map(function (x) {
            return x[Math.floor(Math.random() * x.length)];
        }),
    ).join('');
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const  j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export const validateGoogleCapcha = async (token: any) => {
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPCHA_SECRET}&response=${token}`,
    );
    return response['data'];
};

export function sleepFor(sleepDuration) {
    const now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
        /* Do nothing */
    }
}

export function formattedDateString(date: any) {
    const year = new Date(date).toLocaleString('default', { year: 'numeric' });

    const month = new Date(date).toLocaleString('default', { month: '2-digit' });

    const day = new Date(date).toLocaleString('default', { day: '2-digit' });

    return day + '/' + month + '/' + year;
}

export function urlSlug(title: any) {
    let slug: any;

    // Convert to lower case
    slug = title.toLowerCase();

    // Remove special characters
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\?|\>|\<|\'|\"|\:|\;|_/gi, '');

    // Replace spaces with dash symbols
    slug = slug.replace(/ /gi, "-");

    // Replace forward slash with dash symbols
    slug = slug.replace(/\//gi, "-");

    // Replace dot with dash symbols
    slug = slug.replace(/\./gi, "-");

    // Remove consecutive dash symbols 
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');

    // Remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}

export function convertBase64ToImage(base64String: string) {
    const base64Image = base64String.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');
    return imageBuffer;
}


export function convertBase64ToPDF(base64String) {
    // Extract PDF data from base64 string
    const base64PDF = base64String.split(';base64,').pop();
    const pdfBuffer = Buffer.from(base64PDF, 'base64');
    return pdfBuffer;
}

export function generateCouponCode(length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let couponCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters.charAt(randomIndex);
    }
  
    return couponCode;
}

export function generateRandomNumber(length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomNumber = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomNumber += characters.charAt(randomIndex);
    }
  
    return randomNumber;
}
