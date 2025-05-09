import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routePath } from "../enums/routePath";
import { useToast } from "@chakra-ui/react";
import {
  usePasswordResetMutation,
  usePasswordResetParams,
} from "../services/UserService/usePasswordReset";

export const passwordResetForm = () => {
  const {
    register: passwordResetData,
    handleSubmit,
    formState: { errors },
  } = useForm<usePasswordResetParams>();
  const { mutate } = usePasswordResetMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: usePasswordResetParams) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "リセットされました",
          description: "パスワードがリセットされました",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate(routePath.Login);
      },
      onError: (error) => {
        toast({
          title: "リセットに失敗しました",
          description:
            error.response?.data?.error || "パスワードのリセットに失敗しました",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  return { passwordResetData, handleSubmit, onSubmit, errors };
};
