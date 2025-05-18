import { atom, useRecoilState } from "recoil";

const appUuidState = atom<string>({
  key: "appUuid",
  default: "",
});

export function useAppUuidRecoil() {
  const [appUuid, setAppUuid] = useRecoilState(appUuidState);

  return {
    appUuid,
    setAppUuid,
  };
}
