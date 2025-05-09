export const routePath = {
  Login: "/login",
  PasswordForgot: "password/forgot",
  PasswordReset: "password/reset",
  CreateUser: "/user/create",
  Top: "/top",
  Reserves: "/reserves",
  ReserveCreate: "/reserve/create",
  ReserveDetail: "/reserve/:reserveId",
  Setting: "/setting",

  AppTop: "/app/:uuid",
  AppReserveCreate: "/app/:uuid/reserve/create/:date",
  AppErrorPage: "/app/:uuid/error",

  ErrorNotFound: "*",
};

export const getRoutePath = (path: string, uuid: string) => {
  return path.replace(":uuid", uuid ?? "");
};
