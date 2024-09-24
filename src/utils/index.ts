import { join } from "path";
import { IS_VERBOSE, LOG_DIR } from "../config";
import { appendFileSync, existsSync, mkdirSync } from "fs";


export class Util {
    static formatDate(date?: Date) {
        const dateToFormat = date ?? new Date();
        const dateString = [
            dateToFormat.getFullYear(),
            (dateToFormat.getMonth() + 1).toString().padStart(2, '0'),
            dateToFormat.getDate().toString().padStart(2, '0')
        ].join('_');
        return dateString;
    }

    static log(...args: any[]){
        const logFolder = join(LOG_DIR, Util.formatDate());
        if (!existsSync(logFolder)) { mkdirSync(logFolder, { recursive: true }) };
        const logFile = join(logFolder, 'log.txt');
        appendFileSync(logFile, [Util.formatDate(), ...args].join("\t") + "\n")
        IS_VERBOSE && console.log(Util.formatDate(), ...args)
    }
}