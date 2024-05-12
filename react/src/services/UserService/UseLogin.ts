import { UseMutationResult, useMutation } from "react-query";
import { callLogin } from "../ApiCallBase";
import { User } from "../../types/User";

export type useUserLoginParams = {
    email: string,
    password: string,
}

type userLoginData = {
    user: User,
    token: string,
}

export const useUserLoginMutation = ():UseMutationResult<userLoginData, Error, useUserLoginParams>  => {
    return useMutation<userLoginData, Error, useUserLoginParams>(
        (params: useUserLoginParams) => callLogin(params)
    );
}