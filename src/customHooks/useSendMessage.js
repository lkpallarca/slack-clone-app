import { useMutation } from 'react-query';
import { sendMessage } from '../API';

export default function useSendMessage() {
  return useMutation(sendMessage);
}