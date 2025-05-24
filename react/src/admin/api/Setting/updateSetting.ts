import { UseMutationResult, useMutation } from "react-query";
import { callPut } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type UpdateSettingParams = {
  setting: {
    store_name: string;
    reserve_slot_time: string;
    max_reserve_number: number;
    reserve_months_limit: number;
    reserve_block_minutes: number;
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
  UpdateSettingParams
> => {
  return useMutation<UpdateSettingData, Error, UpdateSettingParams>(
    (params: UpdateSettingParams) => callPut(ApiPath.SETTING, params),
  );
};
