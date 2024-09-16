import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUpdateStoreSettingMutation, useUpdateStoreSettingParams } from "../../services/SettingService/UseUpdateStoreSetting";
import { routePath } from "../../enums/routePath";
import { useToast } from "@chakra-ui/react";

const weekOpenTimeSchema = z.object({
  week: z.number(),
  openTime: z.string(),
  closeTime: z.string(),
});
const dayOpenTimeSchema = z.object({
  date: z.string().min(1, {message: '日付が未設定のデータがあります'}),
  openTime: z.string(),
  closeTime: z.string(),
});

const schema = z.object({
  storeName: z.string().min(1, {message: '名前を入力してください'}).max(50, '50文字以内で入力してください'),
  weekOpenTimes: z.array(weekOpenTimeSchema),
  dayOpenTimes: z.array(dayOpenTimeSchema),
}) 

export type useUpdateStoreSettingSchema = z.infer<typeof schema>

export const useStoreSettingUpdateForm = () => {
  const { register: StoreSettingUpdateData, setValue, handleSubmit, formState: { errors } } = useForm<useUpdateStoreSettingSchema>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useUpdateStoreSettingMutation();
  const navigate = useNavigate();
  const toast = useToast()

  const onSubmit = (data: useUpdateStoreSettingSchema) => {
    const params: useUpdateStoreSettingParams = {
      setting: {
        store_name: data.storeName,
        week_open_times: data.weekOpenTimes.map((item) => ({
          week: item.week,
          open_time: item.openTime,
          close_time: item.closeTime,
        })),    
        day_open_times: data.dayOpenTimes.map((item) => ({
          date: item.date,
          open_time: item.openTime,
          close_time: item.closeTime,
        })),    
      }
    }

    console.log(params)

    mutate(params, {
      onSuccess: () => {
        navigate(-1);
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
  return { StoreSettingUpdateData, setValue, handleSubmit, onSubmit, errors };
};
