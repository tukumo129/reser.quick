import { atom, useRecoilState } from "recoil";
import { GetAppReserveOptionData } from "../api/UseAppGetSettings";

const appReserveOptionsState = atom<GetAppReserveOptionData[]>({
  key: "appReserveOptions",
  default: [
    {
      id: 0,
      name: "",
      slotTime: 0,
      price: 0,
    },
  ],
});

export function useAppReserveOptionsRecoil() {
  const [appReserveOptions, setAppReserveOptions] = useRecoilState(
    appReserveOptionsState,
  );

  return {
    appReserveOptions,
    setAppReserveOptions,
  };
}
