import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  UserLoginParams,
  useUserLoginMutation,
} from "@/admin/api/User/userLogin";
import { routePath } from "@/enums/routePath";

export const useLoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register: loginData,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginParams>();
  const { mutate, isLoading } = useUserLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (data: UserLoginParams) => {
    mutate(data, {
      onSuccess: () => {
        setErrorMessage("");
        navigate(routePath.Top);
      },
      onError: () => {
        setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
      },
    });
  };
  return { loginData, handleSubmit, onSubmit, errors, errorMessage, isLoading };
};
