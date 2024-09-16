import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";

export type useUpdateStoreSettingParams = {
  setting:{
    store_name: string;
    day_open_times: {
      date: string
      open_time: string
      close_time: string
    }[]
    week_open_times: {
      week: number
      open_time: string
      close_time: string
    }[]
  }
}

export type UpdateStoreSettingData = null

export const useUpdateStoreSettingMutation = (): UseMutationResult<
  UpdateStoreSettingData,
  Error,
  useUpdateStoreSettingParams
> => {
  return useMutation<UpdateStoreSettingData, Error, useUpdateStoreSettingParams>(
    (params: useUpdateStoreSettingParams) => callPut(ApiPath.STORE_SETTING, params),
  );
};
