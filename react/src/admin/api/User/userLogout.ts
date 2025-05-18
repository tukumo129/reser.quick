import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type UserLogoutParams = null;

type UserLogoutData = null;

export const useUserLogoutMutation = (): UseMutationResult<
  UserLogoutData,
  Error,
  UserLogoutParams
> => {
  return useMutation<UserLogoutData, Error, UserLogoutParams>(() =>
    callPost(ApiPath.LOGOUT),
  );
};
