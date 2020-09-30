import { UpdateStudentProvider } from "./UpdateStudentProvider";
import { TableNames } from "../../../TableNames";
import { Crud } from "../../../common";
import { IStudent } from "../IStudent";


describe('Update students', () => {
    const StudentCrudTest = new Crud<IStudent>(TableNames.student, true);
    const updateStudentProvider = new UpdateStudentProvider(StudentCrudTest);

    beforeAll(async () => {
        const student1: IStudent = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola',
            cpf: '000.000.000-00',
            ra: 123456,
            id: null,
        }
        await StudentCrudTest.create(student1);

        const student2: IStudent = {
            email: 'aluno2@aluno.com',
            name: 'Aluno 2 da Escola',
            cpf: '000.000.000-00',
            ra: 78910,
            id: null,
        }
        await StudentCrudTest.create(student2);
    });


    test('Update student 1', async () => {
        const student: Omit<IStudent, 'id' | 'cpf' | 'ra'> = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola EdTech',
        }

        expect((await updateStudentProvider.update(1, student)).result?.name).toBe(student.name);
    });

    test('Update student 1', async () => {
        const student: Omit<IStudent, 'id' | 'cpf' | 'ra'> = {
            email: 'aluno@edtech.com.br',
            name: 'Aluno da Escola EdTech',
        }

        expect((await updateStudentProvider.update(1, student)).result?.email).toBe(student.email);
    });

    test('Update student 2', async () => {
        const student: Omit<IStudent, 'id' | 'cpf' | 'ra'> = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola EdTech',
        }

        expect((await updateStudentProvider.update(2, student)).result?.ra).toBe(78910);
    });

    test('Update student 2', async () => {
        const student: Omit<IStudent, 'id' | 'cpf' | 'ra'> = {
            email: 'aluno@edtech.com.br',
            name: 'Aluno da Escola EdTech',
        }

        expect((await updateStudentProvider.update(2, student)).result?.cpf).toBe('000.000.000-00');
    });
});
