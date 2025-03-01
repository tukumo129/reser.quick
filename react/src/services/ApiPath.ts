const appUrl = import.meta.env.VITE_APP_URL

export const ApiPath = {
  BASE_PATH: `${appUrl}/api`,
  LOGIN: "/user/login",
  RESERVE: "/reserve/:reserveId",
  RESERVES: "/reserves",
  SETTING: "/setting",

  APP_RESERVES: "/app/:uuid/reserves/dates",
  APP_AUTH: "/app/:uuid/auth",
  APP_RESERVE_DATES: "/app/:uuid/reserves/dates",
} as const;

export const getRoutePath = (path: string, uuid: string) => {
  return path.replace(":uuid", uuid ?? '');
}
