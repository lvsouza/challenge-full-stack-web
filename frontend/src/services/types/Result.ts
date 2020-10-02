/**
 * A method result
 */
export type Result<T, E = any> = T extends void
    ? void | {
        error?: E;
    }
    : {
        result?: T;
        error?: E;
    };
