import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { Reserve } from "../../types/Reserve";

export type useUpdateReserveStatusParams = {
  reserveId: number;
  status: string;
};

export type UpdateReserveStatusData = {
  reserve: Reserve;
};

export const useUpdateReserveStatusMutation = (): UseMutationResult<
  UpdateReserveStatusData,
  Error,
  useUpdateReserveStatusParams
> => {
  return useMutation<
    UpdateReserveStatusData,
    Error,
    useUpdateReserveStatusParams
  >((params: useUpdateReserveStatusParams) => {
    const path = ApiPath.RESERVE_STATUS.replace(
      ":reserveId",
      params.reserveId.toString(),
    );
    return callPut(path, params);
  });
};
