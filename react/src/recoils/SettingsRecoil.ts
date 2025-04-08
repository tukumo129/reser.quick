import { atom, useRecoilState } from "recoil";
import { GetSettingData } from "../services/SettingService/UseGetSetting";

const settingsState = atom<GetSettingData>({
  key: "settings",
  default: {
    storeName: "",
    reserveSlotTime: "",
    maxReserveNumber: null,
    reserveMonthsLimit: null,
    maxAvailableReserve: null,
    openTimes: [],
  },
});

export function useSettingsRecoil() {
  const [settings, setSettings] = useRecoilState(settingsState);

  return {
    settings,
    setSettings,
  };
}
