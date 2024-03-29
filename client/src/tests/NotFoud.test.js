import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import NotFound from '../pages/NotFound.jsx';

describe('NotFound Component', () => {
  test('displays the correct text', () => {
    render(<NotFound />);
    expect(screen.getByText('NotFound')).toBeInTheDocument();
  });
});