/**
 * Represents the student table in database
 */
export interface IStudent {
    /**
     * Table identifier
     */
    id: number;
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
