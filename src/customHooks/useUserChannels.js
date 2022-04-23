import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchChannels } from '../API';

export default function useUserChannels() {
  const { data, status } = useQuery('channels', fetchChannels);
  const [userChannels, setUserChannels] = useState([]);
  const [checker, setChecker] = useState('');

  useEffect(() => {
    if(status === 'success') {
      setChecker('success');
    }
  }, [status])
  
  useEffect(() => {
    if(data) {
      setUserChannels(data.data);
    }
  }, [data])
  
  return { userChannels, fetchedUserChannels: checker, data }
}
