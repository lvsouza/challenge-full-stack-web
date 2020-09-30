import { GetStudentByIdProvider } from "./GetStudentByIdProvider";
import { TableNames } from "../../../TableNames";
import { Crud } from "../../../common";
import { IStudent } from "../IStudent";


describe('Get a student by their id', () => {
    const StudentCrudTest = new Crud<IStudent>(TableNames.student, true);
    const getStudentByIdProvider = new GetStudentByIdProvider(StudentCrudTest);

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

    test('Validing students 1', async () => {
        expect((await getStudentByIdProvider.getById(1)).result?.id).toBe(1);
    });

    test('Validing students 2', async () => {
        expect((await getStudentByIdProvider.getById(2)).result?.id).toBe(2);
    });
});
