import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type PasswordResetParams = {
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
  PasswordResetParams
> => {
  return useMutation((params: PasswordResetParams) =>
    callPost(ApiPath.PASSWORD_RESET, params),
  );
};
