import { IDateData } from '../models/date.model';

export class DateUtils {

    static readonly WEEK_LENGTH: number = 7;

    private static readonly months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    private static readonly days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    static readonly monthsRU: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    static getDataFromDate(date: Date): IDateData {
        const hours24: number = date.getHours();
        const minutes: number = date.getMinutes();
        const seconds: number = date.getSeconds();

        const month: number = date.getMonth();
        const day: number = date.getDate();
        const year: number = date.getFullYear();

        const ampm: string = hours24 >= 12 ? 'PM' : 'AM';

        let hours12 = hours24 % 12;
        hours12 = hours12 ? hours12 : 12;

        const monthLabelShort: string = this.months[month];

        const weekDay: number = date.getDay();
        const weekDayLabelShort: string = this.days[weekDay];

        return {
            year,
            month,
            day,
            hours24,
            hours12,
            minutes,
            seconds,
            ampm,
            monthLabelShort,
            weekDayLabelShort
        };
    }

    static dateRange(startDate: string, endDate: string): string[] {
        const base = 0;
        const start = startDate.split('.');
        const end = endDate.split('.');
        const startYear = parseInt(start[start.length - 1], base);
        const endYear = parseInt(end[start.length - 1], base);
        const dates = [];

        for (let i = startYear; i <= endYear; i++) {
            const endMonth = i !== endYear ? 11 : parseInt(end[1], base) - 1;
            const startMon = i === startYear ? parseInt(start[1], base) - 1 : 0;
            for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
                const month = j + 1;
                const displayMonth = month < 10 ? '0' + month : month;
                dates.push([i, displayMonth, '01'].reverse().join('.'));
            }
        }
        return dates;
    }

    static timeStamp(): string {
        return `${ new Date().getTime() }:${ Math.random() }`.slice(0, 26);
    }

}
