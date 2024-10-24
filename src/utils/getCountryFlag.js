import React from 'react';
import { Flag } from 'react-flag-kit';
import currencyToCountry from './currencyToCountry';

export const getCountryFlag = (currency) => {
  const countryCode = currencyToCountry[currency];
  return countryCode ? <Flag country={countryCode} size={24} /> : null;
};
