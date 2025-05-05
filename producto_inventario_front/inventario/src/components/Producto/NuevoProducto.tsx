import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../../settings/appsetting";
import { IProducto } from "../../interface/IProducto";
import { ICategoria } from "../../interface/ICategoria";

export const NuevoProducto: React.FC = () => {
    const [nombre, setNombre] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [categoria, setCategoria] = useState<ICategoria | null>(null);
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get<ICategoria[]>(`${appsettings.apiUrl}/categorias`);
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener categorías", error);
                Swal.fire("Error", "No se pudieron cargar las categorías", "error");
            }
        };
        obtenerCategorias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim()) {
            Swal.fire("Error", "El nombre del producto es obligatorio", "error");
            return;
        }

        try {
            const response = await axios.get<IProducto[]>(`${appsettings.apiUrl}/productos`);
            const productoExistente = response.data.find((producto) => producto.nombre.toLowerCase() === nombre.toLowerCase());

            if (productoExistente) {
                Swal.fire("Error", "Ya existe un producto con ese nombre", "error");
                return;
            }
        }
        catch (error) {
            console.error("Error al verificar el nombre del producto", error);
            Swal.fire("Error", "Hubo un problema al verificar el nombre del producto", "error");
            return;
        }

        if (!precio || Number(precio) <= 0) {
            Swal.fire("Error", "El precio debe ser mayor que 0", "error");
            return;
        }

        if (stock === "" || Number(stock) < 0) {
            Swal.fire("Error", "El stock debe ser mayor o igual que 0", "error");
            return;
        }

        if (!categoria) {
            Swal.fire("Error", "Debes seleccionar una categoría", "error");
            return;
        }

        const nuevoProducto: IProducto = {
            nombre,
            precio: Number(precio),
            stock: Number(stock),
            categoria
        };

        try {
            await axios.post(`${appsettings.apiUrl}/productos`, nuevoProducto);
            Swal.fire("Éxito", "Producto creado exitosamente", "success");
            navigate("/");
        } catch (error) {
            console.error("Error al crear el producto", error);
            Swal.fire("Error", "No se pudo crear el producto", "error");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Card style={{ width: "100%", maxWidth: "600px" }}>
                <CardBody>
                    <CardTitle tag="h3" className="mb-4 text-center">
                        Nuevo Producto
                    </CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="precio">Precio</Label>
                            <Input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} min="" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="stock">Stock</Label>
                            <Input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} min="" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="categoria">Categoría</Label>
                            <Input
                                type="select"
                                id="categoria"
                                value={categoria?.idCategoria || ""}
                                onChange={(e) =>
                                    setCategoria(categorias.find((cat) => cat.idCategoria === Number(e.target.value)) || null)
                                }
                            >
                                <option value="">Selecciona una categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat.idCategoria} value={cat.idCategoria}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <div className="d-flex justify-content-end gap-3 mt-4">
                            <Button color="success" type="submit">
                                Crear Producto
                            </Button>
                            <Button color="secondary" type="button" onClick={() => navigate("/")}>
                                Volver
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};
