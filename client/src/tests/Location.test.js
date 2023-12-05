import React from 'react';
import { render } from '@testing-library/react';
import Location from '../pages/Location.jsx';

describe('Location Component', () => {
  test('renders without crashing', () => {
    render(<Location />);
  });

});
