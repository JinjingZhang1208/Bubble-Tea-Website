import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Import the jest-dom library functions
import '@testing-library/jest-dom/extend-expect';

describe('Footer Component Tests', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('No. 1 Bubble Tea Company in Vancouver. See Our Location:')).toBeInTheDocument();
    expect(screen.getByText('No. 1234 Bubble Street, Vancouver, BC')).toBeInTheDocument();
    expect(screen.getByText('© 2023 northeasternbubbletea.com. All Rights Reserved.')).toBeInTheDocument();
  });

  test('renders Location link with correct route', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    // Use queryByText to avoid the "multiple elements" issue
    const locationLink = screen.queryByText('Location');
    expect(locationLink.tagName).toBe('A');
    expect(locationLink.getAttribute('href')).toBe('/location');
  });
});
