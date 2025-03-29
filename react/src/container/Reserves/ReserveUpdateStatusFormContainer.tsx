import { useToast } from "@chakra-ui/react";
import { useUpdateReserveStatusMutation } from "../../services/ReserveService/UseUpdateReserveStatus";
import { reserveStatus } from "../../enums/reserveStatus";

export const useReserveUpdateStatusForm = () => {
  const { mutate } = useUpdateReserveStatusMutation();
  const toast = useToast();

  const onSubmit = (reserveId: number, checked: boolean) => {
    const params = {
      reserveId: reserveId,
      status: checked ? reserveStatus.Complete : reserveStatus.NoComplete,
    };
    mutate(params, {
      onSuccess: () => {
        toast({
          title: "更新に成功しました",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
      onError: () => {
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
  return { onSubmit };
};
