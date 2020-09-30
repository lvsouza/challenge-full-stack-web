import { CreateStudentProvider } from "./CreateStudentProvider";
import { TableNames } from "../../../TableNames";
import { Crud } from "../../../common";
import { IStudent } from "../IStudent";


describe('Register student', () => {
    const StudentCrudTest = new Crud<IStudent>(TableNames.student, true);
    const CreateStudent = new CreateStudentProvider(StudentCrudTest);

    test('Add new student', async () => {
        const student: Omit<IStudent, 'id'> = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola',
            cpf: '000.000.000-00',
            ra: 123456,
        }

        expect(await CreateStudent.create(student)).toMatchObject({ result: 1 });
    });

    test('Add new student 2', async () => {
        const student: Omit<IStudent, 'id'> = {
            email: 'aluno2@aluno.com',
            name: 'Aluno 2 da Escola',
            cpf: '000.000.000-00',
            ra: 12345678,
        }

        expect(await CreateStudent.create(student)).toMatchObject({ result: 2 });
    });

    test('Student without email', async () => {
        const student: Omit<IStudent, 'id'> = {
            email: '',
            name: 'Aluno da Escola',
            cpf: '000.000.000-00',
            ra: 123456789,
        }

        expect((await CreateStudent.create(student)).error).toBeTruthy();
    });

    test('Student without name', async () => {
        const student: Omit<IStudent, 'id'> = {
            email: 'aluno@aluno.com',
            cpf: '000.000.000-00',
            ra: 1234561011,
            name: '',
        }

        expect((await CreateStudent.create(student)).error).toBeTruthy();
    });

    test('Student without cpf', async () => {
        const student: Omit<IStudent, 'id'> = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola',
            ra: 1234561213,
            cpf: '',
        }

        expect((await CreateStudent.create(student)).error).toBeTruthy();
    });
});
