import { Alert } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginForm } from "@/admin/feature/UserLogin/userGoogleLoginFormContainer";

export function UserGoogleLoginComponent() {
  const { googleOnSubmit, errorMessage, setErrorMessage } =
    useGoogleLoginForm();

  return (
    <>
      <GoogleLogin
        onSuccess={googleOnSubmit}
        onError={() => {
          setErrorMessage("Googleログインに失敗しました");
        }}
      />
      {errorMessage && (
        <Alert status="error" mt={4} borderRadius="md">
          {errorMessage}
        </Alert>
      )}
    </>
  );
}
