import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { User } from "@/types/User";

export type CreateUserParams = {
  email: string;
  password: string;
};

type CreateUserData = {
  user: User;
  token: string;
};

export const useCreateUserMutation = (): UseMutationResult<
  CreateUserData,
  AxiosError,
  CreateUserParams
> => {
  return useMutation<CreateUserData, AxiosError, CreateUserParams>(
    (params: CreateUserParams) => callPost(ApiPath.USER, params),
  );
};
