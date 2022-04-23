import { useMutation } from 'react-query'
import { userSignUp } from '../API'

export default function useSignUp() {
  return useMutation(userSignUp);
}
