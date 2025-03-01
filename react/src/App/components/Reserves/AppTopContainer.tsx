import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@chakra-ui/react";
import { getRoutePath, routePath } from "../../../enums/routePath";
import { useAppCreateReserveMutation, useAppCreateReserveParams } from "../../api/UseAppCreateReserve";
import { useAppUuidRecoil } from "../../recoils/AppUuidRecoil";

const schema = z.object({
  name: z.string().min(1, { message: '名前を入力してください' }).max(50, '50文字以内で入力してください'),
  startDate: z.string().min(1, { message: '開始日を入力してください' }),
  startTime: z.string().min(1, { message: '開始時刻を入力してください' }),
  guestNumber: z.number(),
}).superRefine((data, ctx) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(data.startTime)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['startTime'],
      message: '時刻は "HH:MM" の形式で入力してください',
    });
  }
})

type useAppTopSchema = z.infer<typeof schema>

export const useAppReserveCreateForm = () => {
  const { appUuid } = useAppUuidRecoil()
  const { register: ReserveCreateData, handleSubmit, formState: { errors } } = useForm<useAppTopSchema>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useAppCreateReserveMutation();
  const navigate = useNavigate();
  const toast = useToast()

  const onSubmit = (data: useAppTopSchema) => {
    const params: useAppCreateReserveParams = {
      reserve: {
        name: data.name,
        start_date_time: `${data.startDate} ${data.startTime}`,
        guest_number: data.guestNumber,
      }
    }

    mutate(params, {
      onSuccess: () => {
        navigate(getRoutePath(routePath.AppTop, appUuid))
      },
      onError: () => {
        navigate(getRoutePath(routePath.AppTop, appUuid))
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
