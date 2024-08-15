import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routePath } from "../enums/routePath";
import { useUserLoginMutation, useUserLoginParams } from "../services/UserService/UseLogin";

export const useLoginForm = () => {
  const {
    register: loginData,
    handleSubmit,
    formState: { errors },
  } = useForm<useUserLoginParams>();
  const { mutate } = useUserLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (data: useUserLoginParams) => {
    mutate(data, {
      onSuccess: () => {
        navigate(routePath.Top);
        // TODO ログイン成功時の処理
      },
      onError: () => {
        // TODO ログイン失敗時の処理
      },
    });
  };
  return { loginData, handleSubmit, onSubmit, errors };
};
