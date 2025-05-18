import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CreateUserParams,
  useCreateUserMutation,
} from "@/admin/api/User/createUser";
import { routePath } from "@/enums/routePath";

export type useCreateUserSchema = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const useCreateUserForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register: createUserData,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<useCreateUserSchema>();
  const { mutate, isLoading } = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = (data: useCreateUserSchema) => {
    const params: CreateUserParams = {
      email: data.email,
      password: data.password,
    };
    mutate(params, {
      onSuccess: (data) => {
        setErrorMessage("");
        navigate(routePath.Top);
        localStorage.setItem("token", data.token);
      },
      onError: (error) => {
        if (error.response?.status === 409) {
          setErrorMessage("このメールアドレスは既に登録されています。");
          return;
        }
        setErrorMessage("ユーザー登録に失敗しました。");
        return;
      },
    });
  };
  return {
    createUserData,
    handleSubmit,
    watch,
    onSubmit,
    errors,
    errorMessage,
    isLoading,
  };
};
