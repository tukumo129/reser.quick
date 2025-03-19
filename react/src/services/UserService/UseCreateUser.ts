import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "../ApiCallBase";
import { User } from "../../types/User";
import { ApiPath } from "../ApiPath";
import { AxiosError } from "axios";

export type useCreateUserParams = {
  email: string;
  password: string;
};

type createUserData = {
  user: User;
  token: string;
};

export const useCreateUserMutation = (): UseMutationResult<
  createUserData,
  AxiosError,
  useCreateUserParams
> => {
  return useMutation<createUserData, AxiosError, useCreateUserParams>(
    (params: useCreateUserParams) => callPost(ApiPath.USER, params),
  );
};
