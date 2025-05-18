import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type PasswordForgotParams = {
  email: string;
};

type PasswordForgotData = {
  status: string;
};

export const usePasswordForgotMutation = (): UseMutationResult<
  PasswordForgotData,
  AxiosError<{ error: string }>,
  PasswordForgotParams
> => {
  return useMutation((params: PasswordForgotParams) =>
    callPost(ApiPath.PASSWORD_FORGOT, params),
  );
};
