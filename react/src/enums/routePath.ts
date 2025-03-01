export const routePath = {
  Login: "/login",
  Top: "/top",
  Reserves: "/reserves",
  ReserveCreate: "/reserve/create",
  ReserveDetail: "/reserve/:reserveId",
  Setting: "/setting",
  ErrorPage: "/error/404",
  AdminErrorPage: "/error/404",

  AppTop: "/app/:uuid",
  AppReserveCreate: "/app/:uuid/reserve/create",
  AppErrorPage: "/app/:uuid/error/404",
}

export const getRoutePath = (path: string, uuid: string) => {
  return path.replace(":uuid", uuid ?? '');
} 