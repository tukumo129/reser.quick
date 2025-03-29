import axios, { AxiosInstance } from "axios";
import { ApiPath } from "./ApiPath";
import { routePath } from "../enums/routePath";

const baseURL = ApiPath.BASE_PATH;

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : undefined,
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && error.config.url !== ApiPath.LOGIN) {
      window.location.replace(routePath.Login);
    }
    return Promise.reject(error);
  },
);

export const callGet = async <TParam extends Record<string, string>>(
  path: string,
  pathParam: TParam = {} as TParam,
) => {
  const queryString = new URLSearchParams(pathParam).toString();
  const url = queryString ? `${path}?${queryString}` : path;
  const response = await axiosClient.get(url);
  return response.data;
};

export const callPost = async <TBody extends Record<string, unknown>>(
  path: string,
  body: TBody = {} as TBody,
) => {
  const response = await axiosClient.post(path, body);
  return response.data;
};

export const callPut = async <TBody extends Record<string, unknown>>(
  path: string,
  body: TBody = {} as TBody,
) => {
  const response = await axiosClient.put(path, body);
  return response.data;
};

export const callDelete = async <
  TParam extends Record<string, string>,
  TBody extends Record<string, unknown>,
>(
  path: string,
  pathParam: TParam = {} as TParam,
  body: TBody = {} as TBody,
) => {
  const queryString = new URLSearchParams(pathParam).toString();
  const url = queryString ? `${path}?${queryString}` : path;
  const response = await axiosClient.delete(url, { params: body });
  return response.data;
};

export const callLogin = async <TBody extends Record<string, unknown>>(
  body: TBody = {} as TBody,
) => {
  const response = await axiosClient.post(ApiPath.LOGIN, body);
  const token = response.data?.token;
  localStorage.setItem("token", token);
  axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
  return response.data;
};
