/**
 * A method result
 */
export type Result<T, E = any> = T extends void
    ? void | {
        result?: T;
        error?: E;
    }
    : {
        result?: T;
        error?: E;
    };
