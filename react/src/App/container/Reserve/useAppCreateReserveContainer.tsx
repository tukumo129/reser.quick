import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  useAppCreateReserveMutation,
  useAppCreateReserveParams,
} from "../../api/UseAppCreateReserve";
import { getRoutePath, routePath } from "../../../enums/routePath";
import { useAppUuidRecoil } from "../../recoils/AppUuidRecoil";

export type useAppCreateReserveSchema = {
  name: string;
  startTime: string;
  guestNumber: number;
};

export const useAppCreateReserveForm = (startDate: string) => {
  const { appUuid } = useAppUuidRecoil();
  const {
    register: AppCreateReserveData,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<useAppCreateReserveSchema>({});
  const { mutate } = useAppCreateReserveMutation(appUuid);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: useAppCreateReserveSchema) => {
    const params: useAppCreateReserveParams = {
      reserve: {
        name: data.name,
        start_date_time: `${startDate} ${data.startTime}`,
        guest_number: data.guestNumber,
      },
    };

    mutate(params, {
      onSuccess: () => {
        navigate(getRoutePath(routePath.AppTop, appUuid));
      },
      onError: () => {
        navigate(getRoutePath(routePath.AppTop, appUuid));
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
  return { AppCreateReserveData, handleSubmit, onSubmit, errors, reset };
};
