import * as HttpStatusCode from 'http-status-codes';
import { Request, Response } from "express";
import { celebrate, Joi } from 'celebrate';

import { DeleteStudentByIdProvider, IStudent } from "../../database/provider";
import { TableNames } from '../../database/TableNames';
import { responseHandler } from '../../services';
import { Crud } from '../../database/common';

export class DeleteStudentByIdController {

    validation = celebrate({
        params: Joi.object({
            id: Joi.number().min(0).required()
        }),
    }, { abortEarly: false });

    async execute({ params }: Request, res: Response): Promise<Response> {
        const id = Number(params.id);

        if (!Number.isInteger(id) || Number.isNaN(id)) {
            return responseHandler(res, {
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.NOT_ACCEPTABLE),
                statusCode: HttpStatusCode.StatusCodes.NOT_ACCEPTABLE,
                message: 'Id param was not accepted',
            });
        }

        const deleteStudentByIdProvider = new DeleteStudentByIdProvider(new Crud<IStudent>(TableNames.student));
        const { result } = await deleteStudentByIdProvider.deleteById(id);

        if (!result) {
            return responseHandler(res, {
                error: HttpStatusCode.getStatusText(HttpStatusCode.StatusCodes.NOT_FOUND),
                statusCode: HttpStatusCode.StatusCodes.NOT_FOUND,
                message: 'Student was not deleted',
            });
        }

        return responseHandler(res, {
            statusCode: HttpStatusCode.StatusCodes.OK,
        });
    }
}
