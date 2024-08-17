import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreateReserveMutation, useCreateReserveParams } from "../../services/ReserveService/UseCreateReserve";
import { routePath } from "../../enums/routePath";
import { useToast } from "@chakra-ui/react";

const schema = z.object({
  name: z.string().min(1, {message: '名前を入力してください'}).max(50, '50文字以内で入力してください'),
  startDate: z.string().min(1, {message: '開始日を入力してください'}),
  startTime: z.string().min(1, {message: '開始時刻を入力してください'}),
  endDate: z.string().min(1, {message: '終了日を入力してください'}),
  endTime: z.string().min(1, {message: '終了時刻を入力してください'}),
  guestNumber: z.string()
    .refine(val => !isNaN(parseFloat(val)), '数字を入力してください')
    .transform(val => parseInt(val))
}).superRefine((data, ctx) => {
  const startDateTime = new Date(`${data.startDate} ${data.startTime}`)
  const endDateTime = new Date(`${data.endDate} ${data.endTime}`)
  if(startDateTime >= endDateTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['endDate'],
      message: '終了日時は開始日時より後にしてください',
    })
  }
  if(data.guestNumber <= 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['guestNumber'],
      message: '0以上の値を設定してください',
    })
  }
  if(data.guestNumber > 1000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['guestNumber'],
      message: '1000以下の値を設定してください',
    })
  }
}) 

type useCreateReserveSchema = z.infer<typeof schema>

export const useReserveCreateForm = () => {
  const { register: ReserveCreateData, handleSubmit, formState: { errors } } = useForm<useCreateReserveSchema>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useCreateReserveMutation();
  const navigate = useNavigate();
  const toast = useToast()

  const onSubmit = (data: useCreateReserveSchema) => {
    const params: useCreateReserveParams = {
      reserve: {
        name: data.name,
        start_date_time: `${data.startDate} ${data.startTime}`,
        end_date_time: `${data.endDate} ${data.endTime}`,
        guest_number: data.guestNumber,
      }
    }

    mutate(params, {
      onSuccess: () => {
        navigate(routePath.Reserves);
      },
      onError: () => {
        navigate(routePath.Reserves)
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
  return { ReserveCreateData, handleSubmit, onSubmit, errors };
};
