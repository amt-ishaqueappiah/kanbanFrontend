export const isValidString = (input: string) => {
    return typeof input === "string" && input !== "";
};

export const isString = (input: string): boolean => {
    const stringRegex = /^[a-zA-Z-'. ]+$/;

    return stringRegex.test(input);
};
