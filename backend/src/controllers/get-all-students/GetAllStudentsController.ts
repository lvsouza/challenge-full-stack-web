import * as HttpStatusCode from 'http-status-codes';
import { Request, Response } from "express";
import { celebrate, Joi } from 'celebrate';

import { GetAllStudentsProvider, IStudent } from "../../database/provider";
import { TableNames } from '../../database/TableNames';
import { responseHandler } from '../../services';
import { Crud } from '../../database/common';

export class GetAllStudentsController {

    validation = celebrate({
    }, { abortEarly: false });

    async execute(_: Request, res: Response): Promise<Response> {

        const createStudentProvider = new GetAllStudentsProvider(new Crud<IStudent>(TableNames.student));
        const createdStudent = await createStudentProvider.getAll();

        if (!createdStudent.result) {
            return responseHandler(res, {
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                statusCode: HttpStatusCode.StatusCodes.BAD_REQUEST,
                message: 'Students was not listed',
            });
        }

        return responseHandler(res, {
            statusCode: HttpStatusCode.StatusCodes.OK,
            data: {
                id: createdStudent.result
            },
        });
    }
}
