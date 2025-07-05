import { UseMutationResult, useMutation } from "react-query";
import { callLogin } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { User } from "@/types/User";

export type UserLoginParams = {
  email: string;
  password: string;
};

type UserLoginData = {
  user: User;
  token: string;
};

export const useUserLoginMutation = (): UseMutationResult<
  UserLoginData,
  Error,
  UserLoginParams
> => {
  return useMutation<UserLoginData, Error, UserLoginParams>(
    (params: UserLoginParams) => callLogin(ApiPath.LOGIN, params),
  );
};
