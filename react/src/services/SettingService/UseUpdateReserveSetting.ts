import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";

export type useUpdateReserveSettingParams = {
  setting:{
    max_concurrent_reserve: number|null,
    reserve_slot_time: string,
    default_stay_time: string,
    max_reserve_number: number|null,
    reserve_months_limit: number|null,
  }
}

export type UpdateReserveSettingData = null

export const useUpdateReserveSettingMutation = (): UseMutationResult<
  UpdateReserveSettingData,
  Error,
  useUpdateReserveSettingParams
> => {
  return useMutation<UpdateReserveSettingData, Error, useUpdateReserveSettingParams>(
    (params: useUpdateReserveSettingParams) => callPut(ApiPath.RESERVE_SETTING, params),
  );
};
