import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserGoogleLoginMutation } from "@/admin/api/User/userGoogleLogin";
import { routePath } from "@/enums/routePath";

export const useGoogleLoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isLoading } = useUserGoogleLoginMutation();
  const navigate = useNavigate();

  const googleOnSubmit = (data: CredentialResponse) => {
    const token = data.credential;
    if (token) {
      mutate(
        {
          google_token: token,
        },
        {
          onSuccess: () => {
            setErrorMessage("");
            navigate(routePath.Top);
          },
          onError: (error) => {
            if (error.response?.status === 409) {
              setErrorMessage("このメールアドレスは既に登録されています。");
              return;
            }
            setErrorMessage("Googleログインに失敗しました");
            return;
          },
        },
      );
    }
  };

  return { googleOnSubmit, errorMessage, setErrorMessage, isLoading };
};
