import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUpdateReserveSettingMutation, useUpdateReserveSettingParams } from "../../services/SettingService/UseUpdateReserveSetting";
import { routePath } from "../../enums/routePath";
import { useToast } from "@chakra-ui/react";

const schema = z.object({
  maxConcurrentReserve: z.number().optional(),
  reserveSlotTime: z.string().min(1, {message: '予約枠単位を入力してください'}),
  defaultStayTime: z.string().min(1, {message: '標準滞在時間を入力してください'}),
  maxReserveNumber: z.number().optional(),
  reserveMonthsLimit: z.number().optional(),
}).superRefine((data, ctx) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(data.reserveSlotTime)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['reserveSlotTime'],
      message: '"HH:MM" の形式で入力してください',
    });
  }
  if (!timeRegex.test(data.defaultStayTime)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['defaultStayTime'],
      message: '"HH:MM" の形式で入力してください',
    });
  }
  if (data.maxConcurrentReserve !== undefined && data.maxConcurrentReserve > 1000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['maxConcurrentReserve'],
      message: '1000以下の値を設定してください',
    });
  }
  if (data.maxReserveNumber !== undefined && data.maxReserveNumber > 1000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['maxReserveNumber'],
      message: '1000以下の値を設定してください',
    });
  }
  if (data.reserveMonthsLimit !== undefined && data.reserveMonthsLimit > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['reserveMonthsLimit'],
      message: '100以下の値を設定してください',
    });
  }
}) 

export type useUpdateReserveSettingSchema = z.infer<typeof schema>

export const useReserveSettingUpdateForm = () => {
  const { register: ReserveSettingUpdateData, setValue, handleSubmit, formState: { errors } , reset} = useForm<useUpdateReserveSettingSchema>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useUpdateReserveSettingMutation();
  const navigate = useNavigate();
  const toast = useToast()

  const onSubmit = (data: useUpdateReserveSettingSchema) => {
    const params: useUpdateReserveSettingParams = {
      setting: {
        max_concurrent_reserve: data.maxConcurrentReserve ?? null,
        reserve_slot_time: data.reserveSlotTime,
        default_stay_time: data.defaultStayTime,
        max_reserve_number: data.maxReserveNumber ?? null,
        reserve_months_limit: data.reserveMonthsLimit ?? null,
      }
    }

    mutate(params, {
      onSuccess: () => {
        navigate(routePath.Top);
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
  return { ReserveSettingUpdateData, setValue, handleSubmit, onSubmit, errors, reset};
};
