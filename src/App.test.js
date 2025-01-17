import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Wizeline’s Academy React Bootcamp/i);
  expect(linkElement).toBeInTheDocument();
});
