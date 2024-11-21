import React, {useState, useEffect} from 'react';
import {globalusername, globalpassword} from '../screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useApiToken = () => {
  // console.log('golbaluser name in token', globalusername);
  const [apiToken, setApiToken] = useState(null);
  const [run, setrun] = useState(true);
  const fetchApiToken = async () => {
    if (!globalusername || !globalpassword) {
      console.log("came into the global state for token");
      // If not, retrieve them from AsyncStorage
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');
      try {
        const response = await fetch(
          'https://Exim.Tranzol.com/api/test/APILogin',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: storedUsername,
              password: storedPassword,
            }),
          },
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length !== 0) {
            setrun(false);
            setApiToken(data);
          } else {
            setrun(true);
          }
        } else {
          console.log('Failed to fetch API token');
        }
      } catch (error) {
        console.log('Error fetching API token:', error);
      }
    } else {
      try {
        console.log("came into the async state for token");
        const response = await fetch(
          'https://Exim.Tranzol.com/api/test/APILogin',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: globalusername,
              password: globalpassword,
            }),
          },
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length !== 0) {
            setrun(false);
            setApiToken(data);
          } else {
            setrun(true);
          }
        } else {
          console.log('Failed to fetch API token');
        }
      } catch (error) {
        console.log('Error fetching API token:', error);
      }
    }
  };

  useEffect(() => {
    if (run) {
      fetchApiToken();
    }
  }, [run]);

  return apiToken;
};

export default useApiToken;
