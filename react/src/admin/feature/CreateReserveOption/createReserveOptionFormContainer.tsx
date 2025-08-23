import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  CreateReserveOptionParams,
  useCreateReserveOptionMutation,
} from "@/admin/api/ReserveOption/createReserveOption";
import { routePath } from "@/enums/routePath";

const schema = z.object({
  optionName: z
    .string()
    .min(1, { message: "オプション名を入力してください" })
    .max(50, "50文字以内で入力してください"),
  slotTime: z.coerce
    .number()
    .min(1, { message: "予約枠時間を入力してください" }),
  price: z.coerce.number().min(1, { message: "金額を入力してください" }),
});

type useCreateReserveOptionSchema = z.infer<typeof schema>;

export const useCreateReserveOptionForm = () => {
  const {
    register: CreateReserveOptionData,
    handleSubmit,
    formState: { errors },
  } = useForm<useCreateReserveOptionSchema>({
    resolver: zodResolver(schema),
  });
  const { mutate, isLoading } = useCreateReserveOptionMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: useCreateReserveOptionSchema) => {
    const params: CreateReserveOptionParams = {
      reserve_option: {
        name: data.optionName,
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
  return { CreateReserveOptionData, handleSubmit, onSubmit, errors, isLoading };
};
