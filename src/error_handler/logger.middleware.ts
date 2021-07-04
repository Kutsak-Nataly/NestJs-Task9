import * as fs from "fs";
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = new Date().toLocaleString('en-EN', {timeZone: 'Europe/Minsk'});
    const {method, url, body, headers} = req;
    const pathToLogger = 'logs/info.log';
    const writeStream = fs.createWriteStream(pathToLogger, {flags: 'a', encoding: 'utf8'});
    const data = `${start}\t${method}\t${url}\t body: ${JSON.stringify(body)}\t${headers['user-agent']}\n`;
    writeStream.write(data);
    next();
}

