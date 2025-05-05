import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ListaProducto } from '../components/Producto/ListaProducto';

import axios from 'axios';


const productosMock = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
];

describe('ListaProducto', () => {
    it('debe mostrar los productos correctamente', async () => {

        jest.spyOn(axios, 'get').mockResolvedValue({ data: productosMock });

        render(<ListaProducto />);


        await waitFor(() => screen.getByText('Producto 1'));
        

        expect(screen.getByText('Producto 1')).toBeInTheDocument();
        expect(screen.getByText('Producto 2')).toBeInTheDocument();
    });
});
