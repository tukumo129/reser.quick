const appUrl = import.meta.env.VITE_APP_URL

export const ApiPath = {
  BASE_PATH: `${appUrl}/api`,
  LOGIN: "/user/login",
  RESERVE: "/reserve/:reserveId",
  RESERVES: "/reserves",
  STORE_SETTING: "/store_setting",
  RESERVE_SETTING: "/reserve_setting",
} as const;
