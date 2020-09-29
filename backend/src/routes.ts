import { Router } from 'express';

import { CreateStudentController } from './controllers';

const _routes = Router();

const createStudentController = new CreateStudentController();

_routes
    .get('/', (_, res) => res.json("Register is working..."))

    // Rote to create a student
    .post('/api/student', createStudentController.validation, createStudentController.execute);

export const routes = _routes;
