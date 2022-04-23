import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchChannelDetails } from '../API';

export default function useChannelDetails(channelId) {
  const { data } = useQuery(['channelDetails', `${channelId}`], () => fetchChannelDetails(channelId));
  const [channelMembers, setChannelMembers] = useState([]);

  useEffect(() => {
    if(data) {
      setChannelMembers(data);
    }
  }, [data])
  
  return { channelMembers }
}
