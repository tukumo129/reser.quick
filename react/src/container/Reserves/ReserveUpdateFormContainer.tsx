import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  useUpdateReserveMutation,
  useUpdateReserveParams,
} from "../../services/ReserveService/UseUpdateReserve";
import { routePath } from "../../enums/routePath";
import { useToast } from "@chakra-ui/react";

const schema = z
  .object({
    name: z
      .string()
      .min(1, { message: "名前を入力してください" })
      .max(50, "50文字以内で入力してください"),
    startDate: z.string().min(1, { message: "開始日を入力してください" }),
    startTime: z.string().min(1, { message: "開始時刻を入力してください" }),
    endDate: z.string().min(1, { message: "終了日を入力してください" }),
    endTime: z.string().min(1, { message: "終了時刻を入力してください" }),
    guestNumber: z.number(),
  })
  .superRefine((data, ctx) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(data.startTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startTime"],
        message: '時刻は "HH:MM" の形式で入力してください',
      });
    }
    if (!timeRegex.test(data.endTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endTime"],
        message: '時刻は "HH:MM" の形式で入力してください',
      });
    }
    const startDateTime = new Date(`${data.startDate} ${data.startTime}`);
    const endDateTime = new Date(`${data.endDate} ${data.endTime}`);
    if (startDateTime >= endDateTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "終了日時は開始日時より後にしてください",
      });
    }
    if (data.guestNumber <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestNumber"],
        message: "0以上の値を設定してください",
      });
    }
    if (data.guestNumber > 1000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestNumber"],
        message: "1000以下の値を設定してください",
      });
    }
  });

type useUpdateReserveSchema = z.infer<typeof schema>;

export const useReserveUpdateForm = (reserveId: number) => {
  const {
    register: ReserveUpdateData,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<useUpdateReserveSchema>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useUpdateReserveMutation(reserveId);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: useUpdateReserveSchema) => {
    const params: useUpdateReserveParams = {
      reserve: {
        name: data.name,
        start_date_time: `${data.startDate} ${data.startTime}`,
        end_date_time: `${data.endDate} ${data.endTime}`,
        guest_number: data.guestNumber,
      },
    };

    mutate(params, {
      onSuccess: () => {
        navigate(routePath.Reserves);
      },
      onError: () => {
        navigate(routePath.Reserves);
        toast({
          title: "更新に失敗しました",
          description: "予期しないエラーが発生しました",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  return { ReserveUpdateData, handleSubmit, onSubmit, errors, reset };
};
