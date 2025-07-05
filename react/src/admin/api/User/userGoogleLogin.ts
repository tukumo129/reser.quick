import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { callLogin } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { User } from "@/types/User";

export type UserGoogleLoginParams = {
  google_token: string;
};

type UserGoogleLoginData = {
  user: User;
  token: string;
};

export const useUserGoogleLoginMutation = (): UseMutationResult<
  UserGoogleLoginData,
  AxiosError,
  UserGoogleLoginParams
> => {
  return useMutation<UserGoogleLoginData, AxiosError, UserGoogleLoginParams>(
    (params: UserGoogleLoginParams) => callLogin(ApiPath.GOOGLE_LOGIN, params),
  );
};
