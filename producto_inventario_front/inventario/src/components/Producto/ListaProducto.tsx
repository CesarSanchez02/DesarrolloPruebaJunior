import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProducto } from "../../interface/IProducto";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { appsettings } from "../../settings/appsetting";

export const ListaProducto = () => {
    const [productos, setProductos] = useState<IProducto[]>([]);
    const navigate = useNavigate();

    const obtenerProductos = async () => {
        try {
            const response = await axios.get<IProducto[]>(`${appsettings.apiUrl}/productos`);
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener los productos", error);
            Swal.fire("Error", "No se pudieron cargar los productos", "error");
        }
    };

    const eliminarProducto = async (id: number) => {
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${appsettings.apiUrl}/productos/${id}`);
                Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
                obtenerProductos();
            } catch (error) {
                console.error("Error al eliminar el producto", error);
                Swal.fire("Error", "No se pudo eliminar el producto", "error");
            }
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Lista de Productos</h2>
                <Button color="primary" onClick={() => navigate("/nuevoProducto")}>
                    Nuevo Producto
                </Button>

                <Button color="warning" onClick={() => navigate("/listaCategoria")}>
                    Categorias
                </Button>
            </div>

            {productos.length === 0 ? (
                <p>No hay productos disponibles.</p>
            ) : (
                <Table striped responsive hover>
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.idProducto}>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio.toFixed(2)}</td>
                                <td>{producto.stock}</td>
                                <td>{producto.categoria?.nombre || "Sin categoría"}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button
                                            color="warning"
                                            size="sm"
                                            onClick={() => navigate(`/editarProducto/${producto.idProducto}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => eliminarProducto(producto.idProducto!)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};
