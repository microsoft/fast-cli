type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U;

export interface WriteFileConfig {
    /**
     * The directory the file should be written to
     */
    directory: string;
    /**
     * The file name
     */
    name: string;
    /**
     * The contents of the file
     */
    contents: string;
}

export interface StringModifierConfig {
    /**
     * String to prepend to the provided string
     */
    prepend?: string;

    /**
     * String to append to the provided string
     */
    append?: string;
}