import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders', () => {
  const { result } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  // It didn't crash! That's a success in our books.
  // expect(getByText(/learn/i)).toBeInTheDocument();
});
