import { useMutation } from 'react-query';
import { userLogIn } from '../API';
import { setLoggedUser } from '../utils/storage';

export default function useLogin() {
  return useMutation(userLogIn, {
    onSuccess: data => {
      const userData = { ...data.data, headers: data.headers };
      setLoggedUser(userData);
    }
  });
}
