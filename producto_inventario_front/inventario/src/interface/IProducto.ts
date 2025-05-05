import { ICategoria } from "./ICategoria";

export interface IProducto {
    idProducto?: number; 
    nombre: string;
    precio: number;
    stock: number;
    categoria: ICategoria;
}
