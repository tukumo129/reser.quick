import { UseMutationResult, useMutation } from "react-query";
import { callPost } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { Reserve } from "@/types/Reserve";

export type AppCreateReserveParams = {
  reserve: {
    name: string;
    guest_number: number;
    start_date_time: string;
  };
};

export type AppCreateReserveData = {
  reserve: Reserve;
};

export const useAppCreateReserveMutation = (
  uuid: string,
): UseMutationResult<AppCreateReserveData, Error, AppCreateReserveParams> => {
  return useMutation<AppCreateReserveData, Error, AppCreateReserveParams>(
    (params: AppCreateReserveParams) =>
      callPost(ApiPath.APP_RESERVES.replace(":uuid", uuid.toString()), params),
  );
};
