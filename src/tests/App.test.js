import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testando o componente App.js', () => {
  test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByText(/Home/i);
      const linkAbout = screen.getByText(/About/i);
      const linkFavorite = screen.getByText(/Favorite Pokémons/i);

      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(linkFavorite).toBeInTheDocument();
    });

  test('Verifica se a aplicação é redirecionada para a página inicial,'
  + 'na URL "/" ao clicar no link "Home" da barra de navegação',
  () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se a aplicação é redirecionada para a página de About,'
  + 'na URL "/about" ao clicar no link "About" da barra de navegação',
  () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica se a aplicação é redirecionada para a página Favorite Pokémons,'
  + 'na URL "/favorites" ao clicar no link "Favorite Pokémons" da barra de navegação',
  () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada para a página "Not Found" ao'
  + 'entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');

    const notFound = screen.getByRole('heading',
      { name: /Not Found/i });
    expect(notFound).toBeInTheDocument();
  });
});
