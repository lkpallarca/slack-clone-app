import { getLoggedUser } from "../utils/storage";

export default function useCut() {
  const userId = getLoggedUser().data.id;
  const userEmail = getLoggedUser().data.email;
  const userHeaders = getLoggedUser().headers;
  const image = `https://avatars.dicebear.com/api/human/`;
  const profile = `https://avatars.dicebear.com/api/jdenticon/`;

  return {
    userId,
    userEmail,
    userHeaders,
    image,
    profile
  }
}
