const appUrl = import.meta.env.VITE_APP_URL;

export const ApiPath = {
  BASE_PATH: `${appUrl}/api`,
  LOGIN: "/user/login",
  LOGOUT: "/user/logout",
  USER: "/user",
  RESERVE: "/reserve/:reserveId",
  RESERVE_STATUS: "/reserve/:reserveId/status",
  RESERVES: "/reserves",
  RESERVES_COUNT: "/reserves/count",
  SETTING: "/setting",

  APP_AUTH: "/app/:uuid/auth",
  APP_RESERVE_DATES: "/app/:uuid/reserves/dates",
  APP_RESERVE_TIMES: "/app/:uuid/reserves/times",
  APP_RESERVES: "/app/:uuid/reserves",
} as const;

export const getRoutePath = (path: string, uuid: string) => {
  return path.replace(":uuid", uuid ?? "");
};
