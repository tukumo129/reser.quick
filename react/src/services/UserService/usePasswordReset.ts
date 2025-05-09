import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { AxiosError } from "axios";

export type usePasswordResetParams = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

type PasswordResetData = {
  status: string;
};

export const usePasswordResetMutation = (): UseMutationResult<
  PasswordResetData,
  AxiosError<{ error: string }>,
  usePasswordResetParams
> => {
  return useMutation((params: usePasswordResetParams) =>
    callPost(ApiPath.PASSWORD_RESET, params),
  );
};
