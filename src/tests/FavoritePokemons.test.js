import React from 'react';
import { screen, render } from '@testing-library/react';
import rederWithRouter from './RenderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testando o componente FavoritePokemons.js', () => {
  test('Verifica se é exibido na tela a mensagem "No favorite pokemon found",'
   + 'se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);

    const notFavorite = screen.getByText('No favorite pokemon found');
    expect(notFavorite).toBeInTheDocument();
  });

  test('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    rederWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const favoriteCard = screen.getAllByRole('link', { name: /more details/i });
    expect(favoriteCard.length).toBe(pokemons.length);
  });
});
