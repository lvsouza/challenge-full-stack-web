export interface IStudent {
    /**
     * Table identifier
     */
    id: number | null;
    /**
     * Academic Record
     */
    ra: number;
    /**
     * Individual taxpayer registration number
     */
    cpf: string;
    /**
     * Student name
     */
    name: string;
    /**
     * Email of the student
     */
    email: string;
}
