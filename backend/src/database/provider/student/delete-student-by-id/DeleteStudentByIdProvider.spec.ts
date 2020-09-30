import { DeleteStudentByIdProvider } from "./DeleteStudentByIdProvider";
import { TableNames } from "../../../TableNames";
import { Crud } from "../../../common";
import { IStudent } from "../IStudent";


describe('Get a student by their id', () => {
    const StudentCrudTest = new Crud<IStudent>(TableNames.student, true);
    const deleteStudentByIdProvider = new DeleteStudentByIdProvider(StudentCrudTest);

    beforeAll(async () => {
        const student1: IStudent = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola',
            cpf: '000.000.000-00',
            ra: 123456,
            id: null,
        }
        StudentCrudTest.create(student1);

        const student2: IStudent = {
            email: 'aluno2@aluno.com',
            name: 'Aluno 2 da Escola',
            cpf: '000.000.000-00',
            ra: 78910,
            id: null,
        }
        StudentCrudTest.create(student2);
    });

    test('Deleting student 1', async () => {
        expect((await deleteStudentByIdProvider.deleteById(1)).result).toBe(true);
    })

    test('Deleting student 1 again', async () => {
        expect((await deleteStudentByIdProvider.deleteById(1)).error).toBeTruthy();
    })

    test('Deleting student 2', async () => {
        expect((await deleteStudentByIdProvider.deleteById(2)).result).toBe(true);
    });

    test('Deleting student 2 again', async () => {
        expect((await deleteStudentByIdProvider.deleteById(2)).error).toBeTruthy();
    });

    test('Deleting student that does not exist ', async () => {
        expect((await deleteStudentByIdProvider.deleteById(5)).error).toBeTruthy();
    });
});
