import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  AppCreateReserveParams,
  useAppCreateReserveMutation,
} from "@/app/api/UseAppCreateReserve";
import { useAppUuidRecoil } from "@/app/recoils/AppUuidRecoil";
import { getRoutePath, routePath } from "@/enums/routePath";

export type AppCreateReserveSchema = {
  name: string;
  startTime: string;
  guestNumber: number;
  reserveOptionId: number;
};

export const AppCreateReserveForm = (startDate: string) => {
  const { appUuid } = useAppUuidRecoil();
  const {
    register: AppCreateReserveData,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppCreateReserveSchema>({});
  const { mutate, isLoading } = useAppCreateReserveMutation(appUuid);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: AppCreateReserveSchema) => {
    const params: AppCreateReserveParams = {
      reserve: {
        name: data.name,
        start_date_time: `${startDate} ${data.startTime}`,
        guest_number: data.guestNumber,
        reserve_option_id: data.reserveOptionId,
      },
    };

    mutate(params, {
      onSuccess: () => {
        navigate(getRoutePath(routePath.AppTop, appUuid));
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 400) {
            navigate(getRoutePath(routePath.AppTop, appUuid));
            toast({
              title: "登録に失敗しました",
              description: "予約可能な時間を過ぎたため登録できませんでした",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          } else {
            handleDefaultError();
          }
        } else {
          handleDefaultError();
        }
      },
    });
  };
  const handleDefaultError = () => {
    navigate(getRoutePath(routePath.AppTop, appUuid));
    toast({
      title: "登録に失敗しました",
      description: "予期しないエラーが発生しました",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return {
    AppCreateReserveData,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isLoading,
  };
};
