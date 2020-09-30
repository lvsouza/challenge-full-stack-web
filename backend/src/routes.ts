import { Router } from 'express';

import { CreateStudentController, GetAllStudentsController } from './controllers';

const _routes = Router();

_routes.get('/', (_, res) => res.json("Register is working..."));

// Rote to create a student
const createStudentController = new CreateStudentController();
_routes.post('/api/student', createStudentController.validation, createStudentController.execute);

// Rote to list all students
const getAllStudentsController = new GetAllStudentsController();
_routes.get('/api/student', getAllStudentsController.execute);

export const routes = _routes;
