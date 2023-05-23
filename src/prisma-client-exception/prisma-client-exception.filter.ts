import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    const errorMappings: Record<string, HttpStatus> = {
      P2000: HttpStatus.BAD_REQUEST,
      P2001: HttpStatus.NOT_FOUND,
      P2002: HttpStatus.CONFLICT,
      P2003: HttpStatus.BAD_REQUEST,
      P2004: HttpStatus.INTERNAL_SERVER_ERROR,
      P2005: HttpStatus.BAD_REQUEST,
      P2006: HttpStatus.BAD_REQUEST,
      P2007: HttpStatus.BAD_REQUEST,
      P2008: HttpStatus.BAD_REQUEST,
      P2009: HttpStatus.BAD_REQUEST,
      P2010: HttpStatus.INTERNAL_SERVER_ERROR,
      P2011: HttpStatus.BAD_REQUEST,
      P2012: HttpStatus.BAD_REQUEST,
      P2013: HttpStatus.BAD_REQUEST,
      P2014: HttpStatus.BAD_REQUEST,
      P2015: HttpStatus.BAD_REQUEST,
      P2016: HttpStatus.INTERNAL_SERVER_ERROR,
      P2017: HttpStatus.BAD_REQUEST,
      P2018: HttpStatus.BAD_REQUEST,
      P2019: HttpStatus.BAD_REQUEST,
      // Add more error codes and their mappings as needed
    };
    const statusCode =
      errorMappings[exception.code] || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({ statusCode, message });

    // switch (exception.code) {
    //   case 'P2002':
    //     response
    //       .status(HttpStatus.CONFLICT)
    //       .json({ statusCode: HttpStatus.CONFLICT, message });
    //     break;
    //   case 'P2025':
    //     response
    //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //       .json({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message });
    //     break;
    //   default:
    //     // for 500 Error
    //     super.catch(exception, host);
    //     break;
    // }
  }
}
