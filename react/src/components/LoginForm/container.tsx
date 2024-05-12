import { useForm } from 'react-hook-form';
import { useUserLoginMutation, useUserLoginParams } from '../../services/UserService/UseLogin';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../enums/routePath';

export const useLoginForm = () => {
  const { register: loginData, handleSubmit, formState: { errors } } = useForm<useUserLoginParams>();
  const { mutate } = useUserLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (data: useUserLoginParams) => {
    mutate(data, {
      onSuccess: (data) => {
        navigate(routePath.Top);
        console.log(data);
      },
      onError: (error) => {
        console.error('Error:', error);
      }
    });
  };
  return {loginData, handleSubmit, onSubmit, errors}
}
