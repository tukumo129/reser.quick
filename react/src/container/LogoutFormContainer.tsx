import { useNavigate } from "react-router-dom";
import { routePath } from "../enums/routePath";
import { useUserLogoutMutation } from "../services/UserService/UseLogout";
import { useToast } from "@chakra-ui/react";

export const useLogoutForm = () => {
  const { mutate } = useUserLogoutMutation();
  const navigate = useNavigate();
  const toast = useToast()

  const onSubmit = () => {
    console.log("logout")
    mutate(null, {
      onSuccess: () => {
        localStorage.removeItem("token");
        navigate(routePath.Login);
      },
      onError: () => {
        navigate(routePath.Top)
        toast({
          title: "登録に失敗しました",
          description: "予期しないエラーが発生しました",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  return { onSubmit };
};
