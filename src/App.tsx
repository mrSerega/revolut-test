import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { ExchangeScreen } from './components/ExchangeScreen/ExchangeScreen';
import { ExchangeScreenContainer } from './components/ExchangeScreen/ExchangeScreenContainer';
import { Currency } from './typings/currency';

function App() {
  return (
    <ExchangeScreenContainer/>
  );
}

export default App;
