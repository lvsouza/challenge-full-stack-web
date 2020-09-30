import * as HttpStatusCode from 'http-status-codes';
import { Request, Response } from "express";
import { celebrate, Joi } from 'celebrate';

import { UpdateStudentProvider, IStudent } from "../../database/provider";
import { TableNames } from '../../database/TableNames';
import { responseHandler } from '../../services';
import { Crud } from '../../database/common';

export class UpdateStudentController {

    validation = celebrate({
        params: Joi.object({
            id: Joi.number().min(0).required()
        }),
        body: Joi.object({
            email: Joi.string().email().max(100).min(3).required(),
            name: Joi.string().max(100).min(2).required(),
        }),
    }, { abortEarly: false });

    async execute({ body, params }: Request<any, any, Omit<IStudent, 'id' | 'cpf' | 'ra'>>, res: Response): Promise<Response> {
        const id = Number(params.id);
        const { name, email } = body;

        if (!name || !email) {
            return responseHandler(res, {
                message: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                statusCode: HttpStatusCode.StatusCodes.BAD_REQUEST,
            });
        }

        const updateStudentProvider = new UpdateStudentProvider(new Crud<IStudent>(TableNames.student));
        const updatedStudent = await updateStudentProvider.update(id, { name, email });

        if (!updatedStudent.result) {
            return responseHandler(res, {
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.BAD_REQUEST),
                statusCode: HttpStatusCode.StatusCodes.BAD_REQUEST,
                message: 'Student was not updated',
            });
        }

        return responseHandler(res, {
            statusCode: HttpStatusCode.StatusCodes.OK,
            data: { ...updatedStudent.result },
        });
    }
}
