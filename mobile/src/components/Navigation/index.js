import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const NavigationLogic = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get('d');

    if (paramValue) {
      navigation.replace('Cap', { queryParams: { d: paramValue } });
    } else {
      navigation.replace('Sign-in');
    }
  }, [navigation]);

  return null;
};

export default NavigationLogic;
