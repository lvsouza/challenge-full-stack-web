import { GetAllStudentsProvider } from "./GetAllStudentsProvider";
import { TableNames } from "../../../TableNames";
import { Crud } from "../../../common";
import { IStudent } from "../IStudent";


describe('Get all students', () => {
    const StudentCrudTest = new Crud<IStudent>(TableNames.student, true);
    const getAllStudentsProvider = new GetAllStudentsProvider(StudentCrudTest);

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

    test('Validing 2 new students', async () => {
        expect((await getAllStudentsProvider.getAll()).result?.length).toBe(2);
    });
});
