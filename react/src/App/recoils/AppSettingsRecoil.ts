import { atom, useRecoilState } from "recoil";

const appSettingsState = atom({
  key: 'appSettings',
  default: {},
});

export function useAppSettingsRecoil() {
  const [appSettings, setAppSettings] = useRecoilState(appSettingsState);

  return {
    appSettings,
    setAppSettings,
  }
}