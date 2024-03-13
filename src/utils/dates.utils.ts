import * as moment from 'moment-timezone';

export function getCurrentDateTime() {
    const currentData = new Date();
    return moment(currentData).format('YYYY-MM-DD HH:mm:ss');
}

export function getCurrentDate() {
    const currentData = new Date();
    return moment(currentData).format('YYYY-MM-DD');
}


export function formatDate(date: any) {
    return moment(String(date)).format('YYYY-MM-DD');
}

