import React, { useEffect, useState } from "react";
import axios from "axios";
import { ICategoria } from "../../interface/ICategoria";
import { Button, Table, Card, CardBody, CardHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { appsettings } from "../../settings/appsetting";

export const ListaCategoria = () => {
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const navigate = useNavigate();

    const obtenerCategorias = async () => {
        try {
            const response = await axios.get<ICategoria[]>(`${appsettings.apiUrl}/categorias`);
            setCategorias(response.data);
        } catch (error) {
            console.error("Error al obtener las categorías", error);
            Swal.fire("Error", "No se pudieron cargar las categorías", "error");
        }
    };

    const eliminarCategoria = async (id: number) => {
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
                await axios.delete(`${appsettings.apiUrl}/categorias/${id}`);
                Swal.fire("Eliminada", "La categoría ha sido eliminada", "success");
                obtenerCategorias();
            } catch (error: any) {
                console.error("Error al eliminar la categoría", error);
                // Verificamos si 'error.response' existe y si la respuesta contiene el mensaje esperado
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    if (errorMessage === "Debes eliminar primero el producto") {
                        Swal.fire("Error", "Debes eliminar primero el producto", "error");
                    } else {
                        Swal.fire("Error", errorMessage, "error");
                    }
                } else {
                    Swal.fire("Error", "No se pudo eliminar la categoría", "error");
                }
            }
        }
    };
    
    
    
    

    useEffect(() => {
        obtenerCategorias();
    }, []);

    return (
        <div className="container mt-4">
            {/* Card principal */}
            <Card className="shadow-sm">
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0 font-weight-bold">Lista de Categorías</h4>
                    <div className="d-flex gap-2">
                        <Button
                            color="primary"
                            onClick={() => navigate("/nuevaCategoria")}
                            size="sm"
                        >
                            Nueva Categoría
                        </Button>
                        <Button
                            color="warning"
                            onClick={() => navigate("/listaProducto")}
                            size="sm"
                        >
                            Productos
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="p-3">
                    {/* Si no hay categorías */}
                    {categorias.length === 0 ? (
                        <p className="text-center">No hay categorías disponibles.</p>
                    ) : (
                        <Table striped responsive hover size="sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((categoria) => (
                                    <tr key={categoria.idCategoria}>
                                        <td>{categoria.nombre}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button
                                                    color="warning"
                                                    size="sm"
                                                    onClick={() => navigate(`/editarCategoria/${categoria.idCategoria}`)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => eliminarCategoria(categoria.idCategoria!)}
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
                </CardBody>
            </Card>
        </div>
    );
};
