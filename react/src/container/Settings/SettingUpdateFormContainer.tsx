import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateSettingMutation, useUpdateSettingParams } from "../../services/SettingService/UseUpdateSetting";
import { routePath } from "../../enums/routePath";
import { useToast } from "@chakra-ui/react";

export type useUpdateSettingSchema = {
  storeName: string;
  reserveSlotTime: string,
  maxReserveNumber: number | null,
  reserveMonthsLimit: number | null,
  maxAvailableReserve: number | null,
  openTimes: openTimesSchema[]
}

export type openTimesSchema = {
  id: number | null
  type: number
  date: string | null
  week: number | null
  startTime: string | null
  endTime: string | null
  maxAvailableReserve: number | null
}

export const useSettingUpdateForm = () => {
  const { register: SettingUpdateData, control, handleSubmit, formState: { errors }, reset } = useForm<useUpdateSettingSchema>();
  const { mutate } = useUpdateSettingMutation();
  const navigate = useNavigate();
  const toast = useToast()

  const onSubmit = (data: useUpdateSettingSchema) => {
    const params: useUpdateSettingParams = {
      setting: {
        store_name: data.storeName,
        reserve_slot_time: data.reserveSlotTime,
        max_reserve_number: data.maxReserveNumber ?? null,
        reserve_months_limit: data.reserveMonthsLimit ?? null,
        max_available_reserve: data.maxAvailableReserve ?? null,
        open_times: data.openTimes.map((item) => ({
          id: item.id ?? null,
          type: item.type,
          date: item.date ?? null,
          week: item.week ?? null,
          start_time: item.startTime ?? null,
          end_time: item.endTime ?? null,
          max_available_reserve: item.maxAvailableReserve ?? null,
        })),
      }
    }

    mutate(params, {
      onSuccess: () => {
        navigate(routePath.Top);
        toast({
          title: "設定が更新できました",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
      onError: () => {
        navigate(routePath.Top)
        toast({
          title: "登録に失敗しました",
          description: "予期しないエラーが発生しました",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  return { SettingUpdateData, control, handleSubmit, onSubmit, errors, reset };
}
