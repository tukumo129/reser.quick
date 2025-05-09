import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { AxiosError } from "axios";

export type usePasswordForgotParams = {
  email: string;
};

type PasswordForgotData = {
  status: string;
};

export const usePasswordForgotMutation = (): UseMutationResult<
  PasswordForgotData,
  AxiosError<{ error: string }>,
  usePasswordForgotParams
> => {
  return useMutation((params: usePasswordForgotParams) =>
    callPost(ApiPath.PASSWORD_FORGOT, params),
  );
};
