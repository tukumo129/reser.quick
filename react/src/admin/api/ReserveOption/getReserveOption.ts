import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { ReserveOption } from "@/types/ReserveOption";

export type GetReserveOptionData = {
  reserveOption: ReserveOption;
};

const defaultValues = {
  id: 0,
  contractId: 0,
  name: "",
  slotTime: 30,
  price: 1000,
};

export const useGetReserveOption = (reserveOptionId: number) => {
  const path = ApiPath.RESERVE_OPTION.replace(
    ":reserveOptionId",
    reserveOptionId.toString(),
  );
  const { data, isLoading, error } = useQuery<GetReserveOptionData, Error>(
    [ApiPath.RESERVE_OPTION, reserveOptionId],
    () => callGet(path),
  );
  return {
    reserveOption: data?.reserveOption || defaultValues,
    isLoading,
    error,
  };
};
