import { CreateStudentProvider } from "./CreateStudentProvider";
import { TableNames } from "../../../TableNames";
import { Crud } from "../../../common";
import { IStudent } from "../IStudent";


describe('Register student', () => {
    const StudentCrudTest = new Crud<IStudent>(TableNames.student, true);
    const CreateStudent = new CreateStudentProvider(StudentCrudTest);

    test('Add new student', async () => {
        const student: Omit<IStudent, 'id' | 'ra'> = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola',
            cpf: '000.000.000-00',
        }

        expect(await CreateStudent.create(student)).toEqual(1);
    });

    test('Add new student 2', async () => {
        const student: Omit<IStudent, 'id' | 'ra'> = {
            email: 'aluno2@aluno.com',
            name: 'Aluno 2 da Escola',
            cpf: '000.000.000-00',
        }

        expect(await CreateStudent.create(student)).toEqual(2);
    });

    test('Student without email', async () => {
        const student: Omit<IStudent, 'id' | 'ra'> = {
            email: '',
            name: 'Aluno da Escola',
            cpf: '000.000.000-00',
        }

        expect(((await CreateStudent.create(student) as any)).error).toBeTruthy();
    });

    test('Student without name', async () => {
        const student: Omit<IStudent, 'id' | 'ra'> = {
            email: 'aluno@aluno.com',
            name: '',
            cpf: '000.000.000-00',
        }

        expect(((await CreateStudent.create(student) as any)).error).toBeTruthy();
    });
    
    test('Student without cpf', async () => {
        const student: Omit<IStudent, 'id' | 'ra'> = {
            email: 'aluno@aluno.com',
            name: 'Aluno da Escola',
            cpf: '',
        }

        expect(((await CreateStudent.create(student) as any)).error).toBeTruthy();
    });
});
