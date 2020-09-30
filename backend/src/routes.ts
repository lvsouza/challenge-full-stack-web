import { Router } from 'express';

import { CreateStudentController, GetAllStudentsController, GetStudentByIdController, UpdateStudentController } from './controllers';

const _routes = Router();

_routes.get('/', (_, res) => res.json("Register is working..."));

// Rote to create a student
const createStudentController = new CreateStudentController();
_routes.post('/api/student', createStudentController.validation, createStudentController.execute);

// Rote to list all students
const getAllStudentsController = new GetAllStudentsController();
_routes.get('/api/student', getAllStudentsController.execute);

// Rote to get a students by their id
const getStudentByIdController = new GetStudentByIdController();
_routes.get('/api/student/:id', getStudentByIdController.validation, getStudentByIdController.execute);

// Rote to update a students by their id
const updateStudentController = new UpdateStudentController();
_routes.put('/api/student/:id', updateStudentController.validation, updateStudentController.execute);

export const routes = _routes;
