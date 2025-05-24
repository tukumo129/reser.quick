import { atom, useRecoilState } from "recoil";
import { GetAppSettingData } from "../api/UseAppGetSettings";

const appSettingsState = atom<GetAppSettingData>({
  key: "appSettings",
  default: {
    storeName: null,
    reserveSlotTime: null,
    maxReserveNumber: 10,
    reserveMonthsLimit: 3,
    reserveBlockMinutes: 30,
  },
});

export function useAppSettingsRecoil() {
  const [appSettings, setAppSettings] = useRecoilState(appSettingsState);

  return {
    appSettings,
    setAppSettings,
  };
}
