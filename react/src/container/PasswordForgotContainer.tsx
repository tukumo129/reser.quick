import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routePath } from "../enums/routePath";
import { useToast } from "@chakra-ui/react";
import {
  usePasswordForgotMutation,
  usePasswordForgotParams,
} from "../services/UserService/usePasswordForgot";

export const passwordForgotForm = () => {
  const {
    register: passwordForgotData,
    handleSubmit,
    formState: { errors },
  } = useForm<usePasswordForgotParams>();
  const { mutate } = usePasswordForgotMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: usePasswordForgotParams) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "メールを送信しました",
          description: "メール内容に従い、パスワードをリセットしてください",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate(routePath.Login);
      },
      onError: (error) => {
        toast({
          title: "メール送信に失敗しました",
          description:
            error.response?.data?.error || "想定外のエラーが発生しました",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  return { passwordForgotData, handleSubmit, onSubmit, errors };
};
