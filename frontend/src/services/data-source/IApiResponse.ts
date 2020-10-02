export interface IApiResponse<T = any> {
    statusCode: string;
    message?: string;
    error?: string;
    data?: T
}