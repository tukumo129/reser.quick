import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routePath } from "../enums/routePath";
import { useUserLoginMutation, useUserLoginParams } from "../services/UserService/UseLogin";
import { useState } from "react";

export const useLoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('')
        navigate(routePath.Top);
      },
      onError: () => {
        setErrorMessage('メールアドレスまたはパスワードが正しくありません。')
      },
    });
  };
  return { loginData, handleSubmit, onSubmit, errors, errorMessage };
};
