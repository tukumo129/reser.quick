import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";

export type useUserLogoutParams = null;

type userLogoutData = null;

export const useUserLogoutMutation = (): UseMutationResult<
  userLogoutData,
  Error,
  useUserLogoutParams
> => {
  return useMutation<userLogoutData, Error, useUserLogoutParams>(() =>
    callPost(ApiPath.LOGOUT),
  );
};
