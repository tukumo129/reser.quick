import { atom, useRecoilState } from "recoil";
import { GetAppSettingData } from "../api/UseAppGetSettings";

const appSettingsState = atom<GetAppSettingData>({
  key: "appSettings",
  default: {
    storeName: null,
    reserveSlotTime: null,
    maxReserveNumber: null,
    reserveMonthsLimit: null,
  },
});

export function useAppSettingsRecoil() {
  const [appSettings, setAppSettings] = useRecoilState(appSettingsState);

  return {
    appSettings,
    setAppSettings,
  };
}
