import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  UpdateReserveOptionParams,
  useUpdateReserveOptionMutation,
} from "@/admin/api/ReserveOption/updateReserveOption";
import { routePath } from "@/enums/routePath";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "オプション名を入力してください" })
    .max(50, "50文字以内で入力してください"),
  slotTime: z.coerce
    .number()
    .min(1, { message: "予約枠時間を入力してください" }),
  price: z.coerce.number().min(1, { message: "金額を入力してください" }),
});

type useUpdateReserveOptionSchema = z.infer<typeof schema>;

export const useUpdateReserveOptionForm = (reserveOptionId: number) => {
  const {
    register: UpdateReserveOptionData,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<useUpdateReserveOptionSchema>({
    resolver: zodResolver(schema),
  });
  const { mutate, isLoading } = useUpdateReserveOptionMutation(reserveOptionId);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: useUpdateReserveOptionSchema) => {
    const params: UpdateReserveOptionParams = {
      reserve_option: {
        name: data.name,
        slot_time: data.slotTime,
        price: data.price,
      },
    };

    mutate(params, {
      onSuccess: () => {
        navigate(routePath.ReserveOptions);
      },
      onError: () => {
        navigate(routePath.ReserveOptions);
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
  return {
    UpdateReserveOptionData,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isLoading,
  };
};
