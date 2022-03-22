import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente About.js', () => {
  test('Verifica se a página contém as informações sobre a Pokédex', () => {
    render(<About />);

    const infoPage = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(infoPage).toBeInTheDocument();
  });

  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const aboutHeading = screen.getByRole('heading', {
      level: 2, name: 'About Pokédex',
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const aboutParagrafo = screen.getAllByText(/Pokémons/i);
    expect(aboutParagrafo).toHaveLength(2);
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);

    const aboutImage = screen.getByRole('img');

    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
