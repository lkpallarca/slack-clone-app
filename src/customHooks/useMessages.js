import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchOurMessages, fetchTheirMessages } from '../API';

export default function useMessages(ourId, theirId, category, theirCategory) {
  const { data: fetchedMessagesFromUs, isLoading: oursIsLoading } = useQuery(`${ourId}messages`, 
    () => fetchOurMessages(ourId, category),
    { refetchInterval: 1000 }
  );
  
  const { data: fetchedMessagesFromThem, isLoading: theirsIsLoading } = useQuery(`${theirId}messages`, 
    () => fetchTheirMessages(theirId, theirCategory),
    { refetchInterval: 1000 }
  );

  const [ourMessages, setOurMessages] = useState([]);
  const [theirMessages, setTheirMessages] = useState([]);

  useEffect(() => {
    if(oursIsLoading && theirsIsLoading) {
      return
    }
    if(fetchedMessagesFromUs) {
      setOurMessages(fetchedMessagesFromUs.data);
    } else {
      setOurMessages([]);
    }
    if(fetchedMessagesFromThem) {
      setTheirMessages(fetchedMessagesFromThem.data);
    } else {
      setTheirMessages([]);
    }
  }, [fetchedMessagesFromUs, fetchedMessagesFromThem])
  
  return { ourMessages, theirMessages }
}
