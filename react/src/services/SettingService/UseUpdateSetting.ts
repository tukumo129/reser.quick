import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";

export type useUpdateSettingParams = {
  setting: {
    store_name: string;
    reserve_slot_time: string;
    max_reserve_number: number | null;
    reserve_months_limit: number | null;
    max_available_reserve: number | null;
    open_times: {
      id: number | null;
      type: number;
      date: string | null;
      week: number | null;
      start_time: string | null;
      end_time: string | null;
      max_available_reserve: number | null;
    }[];
  };
};

export type UpdateSettingData = null;

export const useUpdateSettingMutation = (): UseMutationResult<
  UpdateSettingData,
  Error,
  useUpdateSettingParams
> => {
  return useMutation<UpdateSettingData, Error, useUpdateSettingParams>(
    (params: useUpdateSettingParams) => callPut(ApiPath.SETTING, params),
  );
};
