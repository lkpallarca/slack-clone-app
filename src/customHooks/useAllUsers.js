import React, { useState, useEffect } from 'react';
import { useQuery, QueryCache } from 'react-query';
import { fetchUsers } from '../API';

export default function useAllUsers() {
  const { data, status } = useQuery('allUsers', fetchUsers);
  const [allUsers, setAllUsers] = useState([]);
  const [checker, setChecker] = useState('');

  useEffect(() => {
    if(status === 'success') {
      setChecker('success');
    }
  }, [status])
  
  useEffect(() => {
    if(data) {
      setAllUsers(data);
    }
  }, [data])
  
  return { allUsersData: allUsers, fetchedAllUsers: checker, data }
}
