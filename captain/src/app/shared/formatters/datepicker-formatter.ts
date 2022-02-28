import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class NgbCustomDateParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
                return { year: this.toInteger(dateParts[0]), month: 1, day: 1 };
            } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
                return { year: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), day: 1 };
            } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
                return { year: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[0]), day: this.toInteger(dateParts[1]) };
            }
        }
        let noDate:NgbDateStruct = {year:0,month:0,day:0};
        return noDate;
    }

    format(date: NgbDateStruct): string {
        let stringDate: string = "";
        if (date) {
            stringDate += this.isNumber(date.day) ? this.padNumber(date.day) + "/" : "";
            stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + "/" : "";
            stringDate += date.year;
        }
        return stringDate;
    }

    private padNumber(value: number) {
        if (this.isNumber(value)) {
            return `0${value}`.slice(-2);
        } else {
            return "";
        }
    }

    private isNumber(value: any): boolean {
        return !isNaN(this.toInteger(value));
    }

    private toInteger(value: any): number {
        return parseInt(`${value}`, 10);
    }
}