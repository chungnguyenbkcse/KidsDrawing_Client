export const LOG_IN: string = "LOG_IN";
export const LOG_OUT: string = "LOG_OUT";

export function login(username: string): ILogInActionType {
    return { type: LOG_IN, username: username };
}

export function logout(): ILogOutActionType {
    return { type: LOG_OUT};
}

interface ILogInActionType { type: string, username: string };
interface ILogOutActionType { type: string };
