import * as HttpStatusCode from 'http-status-codes';
import { Request, Response } from "express";
import { celebrate, Joi } from 'celebrate';

import { CreateStudentProvider, Student } from "../../database/provider";
import { TableNames } from '../../database/TableNames';
import { responseHandler } from '../../services';
import { Crud } from '../../database/common';

export class CreateStudentController {

    validation = celebrate({

    }, { abortEarly: false });

    async execute({ headers }: Request, res: Response): Promise<Response> {
        const { name } = headers;

        if (!name) {
            return responseHandler(res, {
                message: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                statusCode: HttpStatusCode.StatusCodes.BAD_REQUEST,
            });
        }

        const createStudentProvider = new CreateStudentProvider(new Crud<Student>(TableNames.student));
        const createdStudent = await createStudentProvider.create({});

        if (!createdStudent) {
            return responseHandler(res, {
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                statusCode: HttpStatusCode.StatusCodes.BAD_REQUEST,
                message: 'Student was not created',
            });
        }

        return responseHandler(res, {
            statusCode: HttpStatusCode.StatusCodes.CREATED,
            data: {
                id: createdStudent
            },
        });
    }
}
