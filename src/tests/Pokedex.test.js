import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';

import App from '../App';

const qtdButtons = 9;

describe('Testando o componente Pokedex.js', () => {
  test('Verifica se a página contém um heading "h2" com o texto "Encountered pokémons"',
    () => {
      renderWithRouter(<App />);

      const pokedexHeading = screen.getByRole('heading', {
        level: 2, name: 'Encountered pokémons',
      });
      expect(pokedexHeading).toBeInTheDocument();
    });

  test('Verifica se é exibido o próximo Pokémon da lista quando o botão'
  + '"Próximo pokémon" é clicado',
  () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
  });

  test('Verifique se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon).toHaveLength(1);
  });

  test('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(qtdButtons);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
