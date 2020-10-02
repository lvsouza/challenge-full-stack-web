import { IApiResponse } from '../IApiResponse';
import { Result } from '../../types/Result';
import { ApiConfig } from '../ApiConfigs';
import { IStudent } from './IStudents';

interface IGetStudent {
    update(id: number, student: Omit<IStudent, 'id' | 'ra' | 'cpf'>): Promise<Result<IStudent, string>>;
    create(student: Omit<IStudent, 'id'>): Promise<Result<IStudent, string>>;
    getById(id: number): Promise<Result<IStudent, string>>;
    delete(id: number): Promise<Result<boolean, string>>;
    getAll(): Promise<Result<IStudent[], string>>;
}

export const StudentsDataSource: IGetStudent = {
    async create(student: Omit<IStudent, 'id'>): Promise<Result<IStudent>> {
        try {
            const { data: { data, error, message } } = await ApiConfig.post<IApiResponse<IStudent>>('/student', student);
            if (!error) {
                return { result: data };
            } else {
                return { error: 'Hove um erro ao cadastrar o aluno!' };

            }
        } catch (error) {
            return { error: 'Hove um erro ao cadastrar o aluno!' };
        }
    },
    async update(id: number, student: Omit<IStudent, 'id' | 'ra' | 'cpf'>): Promise<Result<IStudent>> {
        try {
            const { data: { data, error } } = await ApiConfig.put<IApiResponse<IStudent>>('/student/' + id, student);
            if (!error) {
                return { result: data };
            } else {
                return { error: 'Hove um erro na atualização do aluno!' };
            }
        } catch (error) {
            return { error: 'Hove um erro na atualização do aluno!' }
        }
    },
    async getById(id: number): Promise<Result<IStudent>> {
        try {
            const { data: { data, error } } = await ApiConfig.get<IApiResponse<IStudent>>('/student/' + id);
            if (!error) {
                return { result: data };
            } else {
                return { error: 'Hove um erro na consulta!' };
            }
        } catch (error) {
            return { error: 'Hove um erro na consulta!' }
        }
    },
    async delete(id: number): Promise<Result<boolean>> {
        try {
            const { data: { data, error } } = await ApiConfig.delete<IApiResponse<boolean>>('/student/' + id);
            if (!error) {
                return { result: true };
            } else {
                return { error: 'Hove um erro ao tentar apagar o aluno!' };
            }
        } catch (error) {
            return { error: 'Hove um erro ao tentar apagar o aluno!' }
        }
    },
    async getAll(): Promise<Result<IStudent[]>> {
        try {
            const { data: { data: students, error } } = await ApiConfig.get<IApiResponse<IStudent[]>>('/student');
            if (!error) {
                return { result: students }
            } else {
                return { error: 'Hove um erro na consulta!' }
            }
        } catch (error) {
            return { error: 'Hove um erro na consulta!' }
        }
    }
}
