import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';

import Pokemon from '../components/Pokemon';

const props = {
  pokemon: {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  isFavorite: false,
};

describe('Testando o componente Pokemon.js', () => {
  test('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<Pokemon { ...props } />);

      const pokemonName = screen.getByText(/pikachu/i);
      const pokemonType = screen.getByText(/electric/i);
      const pokemonWeight = screen.getByText(/Average Weight: 6.0 kg/i);
      const pokemonImage = screen.getByRole('img', { name: /Pikachu sprite/i });

      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonWeight).toBeInTheDocument();
      expect(pokemonImage.src).toBe(props.pokemon.image);
    });

  test('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação'
    + 'para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<Pokemon { ...props } />);

    const linkDetails = screen.getByRole('link', /more details/i);
    expect(linkDetails).toBeInTheDocument();
  });

  test('Verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + 'da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<Pokemon { ...props } />);

    const linkDetails = screen.getByRole('link', /more details/i);
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
  });

  test('Verifica se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<Pokemon { ...props } />);

    const linkDetails = screen.getByRole('link', /more details/i);
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('', () => {
    renderWithRouter(<Pokemon { ...props } isFavorite />);

    const favoriteStar = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });

    expect(favoriteStar.src).toContain('star-icon.svg');
  });
});
