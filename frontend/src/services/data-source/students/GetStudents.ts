import { IApiResponse } from '../IApiResponse';
import { Result } from './../../types/Result';
import { ApiConfig } from '../ApiConfigs';
import { IStudent } from './IStudents';

interface IGetStudent {
    update(id: number, student: IStudent): Promise<Result<IStudent, string>>;
    create(student: IStudent): Promise<Result<IStudent, string>>;
    getById(id: number): Promise<Result<IStudent, string>>;
    delete(id: number): Promise<Result<boolean, string>>;
    getAll(): Promise<Result<IStudent[], string>>;
}

export const GetStudent: IGetStudent = {
    async create(student: IStudent): Promise<Result<IStudent>> {
        throw new Error("Not implemented");
    },
    async update(id: number, student: IStudent): Promise<Result<IStudent>> {
        throw new Error("Not implemented");
    },
    async getById(id: number): Promise<Result<IStudent>> {
        throw new Error("Not implemented");
    },
    async delete(id: number): Promise<Result<boolean>> {
        try {
            const { data: { data, error } } = await ApiConfig.delete<IApiResponse<boolean>>('/student/' + id);
            if (!error) {
                return { result: data };
            } else {
                return { error: 'Hove um erro ao realizar tentar apagar o registro!' };
            }
        } catch (error) {
            return { error: 'Hove um erro ao realizar tentar apagar o registro!' }
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
