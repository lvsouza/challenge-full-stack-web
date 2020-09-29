import * as HttpStatusCode from 'http-status-codes';
import { Request, Response } from "express";
import { celebrate, Joi } from 'celebrate';

import { CreateStudentProvider, IStudent } from "../../database/provider";
import { TableNames } from '../../database/TableNames';
import { responseHandler } from '../../services';
import { Crud } from '../../database/common';

export class CreateStudentController {

    validation = celebrate({
        body: Joi.object({
            cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
            email: Joi.string().email().max(100).min(3).required(),
            name: Joi.string().max(100).min(2).required(),
        }),
    }, { abortEarly: false });

    async execute({ body }: Request<any, any, Omit<IStudent, 'id'>>, res: Response): Promise<Response> {
        const { name, cpf, email } = body;

        if (!name || !cpf || !email) {
            return responseHandler(res, {
                message: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                statusCode: HttpStatusCode.StatusCodes.BAD_REQUEST,
            });
        }

        const createStudentProvider = new CreateStudentProvider(new Crud<IStudent>(TableNames.student));
        const createdStudent = await createStudentProvider.create({ name, cpf, email });

        if (!createdStudent.result) {
            return responseHandler(res, {
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                statusCode: HttpStatusCode.StatusCodes.BAD_REQUEST,
                message: 'Student was not created',
            });
        }

        return responseHandler(res, {
            statusCode: HttpStatusCode.StatusCodes.CREATED,
            data: {
                id: createdStudent.result
            },
        });
    }
}
