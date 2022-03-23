import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o componebte NotFound.js', () => {
  test('Verifica se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      render(<NotFound />);

      const notFoundHeading = screen.getByRole('heading', {
        level: 2, name: /Page requested not found/i,
      });
      expect(notFoundHeading).toBeInTheDocument();
    });

  test('Verifica se a página mostra a imagem', () => {
    render(<NotFound />);

    const notFoundImage = screen.getByAltText(/Page requested was not found/i);

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
