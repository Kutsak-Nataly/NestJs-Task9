import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from "fs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;
        const start = new Date().toLocaleString('en-EN', {timeZone: 'Europe/Minsk'});
        const pathToLoggerError = 'logs/error.log';
        const writeStream = fs.createWriteStream(pathToLoggerError, {
            flags: 'a',
            encoding: 'utf8'
        });
        const {method, url} = req;
        const data = `${start} \tStatus: ${status} \tError: ${message}\t${method}: \t${url}\n`;
        writeStream.write(data);

        res
            .status(status)
            .send(message);
    }
}
