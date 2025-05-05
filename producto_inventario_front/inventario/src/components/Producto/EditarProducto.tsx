import React, { useState, useEffect } from "react";
import axios from "axios";
import { IProducto } from "../../interface/IProducto";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../../settings/appsetting";
import { ICategoria } from "../../interface/ICategoria";

export const EditarProducto = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState<ICategoria | null>(null);
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [originalNombre] = useState("");

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get<ICategoria[]>(`${appsettings.apiUrl}/categorias`);
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al cargar categorías", error);
                Swal.fire("Error", "No se pudieron cargar las categorías", "error");
            }
        };

        const fetchProducto = async () => {
            try {
                const response = await axios.get<IProducto>(`${appsettings.apiUrl}/productos/${id}`);
                const producto = response.data;
                setNombre(producto.nombre);
                setPrecio(producto.precio.toString());
                setStock(producto.stock.toString());
                setCategoria(producto.categoria || null);
            } catch (error) {
                console.error("Error al cargar producto", error);
                Swal.fire("Error", "No se pudo cargar el producto", "error");
            }
        };

        fetchCategorias();
        fetchProducto();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!nombre.trim()) {
            Swal.fire("Error", "El nombre del producto es obligatorio", "error");
            return;
        }
    
        // Solo verificar el nombre si ha cambiado
        if (nombre !== originalNombre) {  // Comparar con el nombre original del producto
            try {
                const response = await axios.get<IProducto[]>(`${appsettings.apiUrl}/productos`);
                const productoExistente = response.data.find((producto) => producto.nombre.toLowerCase() === nombre.toLowerCase());
        
                if (productoExistente) {
                    Swal.fire("Error", "Ya existe un producto con ese nombre", "error");
                    return;
                }
            } catch (error) {
                console.error("Error al verificar el nombre del producto", error);
                Swal.fire("Error", "Hubo un problema al verificar el nombre del producto", "error");
                return;
            }
        }
        
    
        if (!precio || Number(precio) <= 0) {
            Swal.fire("Error", "El precio debe ser mayor que 0", "error");
            return;
        }
    
        if (!stock || Number(stock) < 0) {
            Swal.fire("Error", "El stock no puede ser negativo", "error");
            return;
        }
    
        if (!categoria) {
            Swal.fire("Error", "Debes seleccionar una categoría", "error");
            return;
        }
    
        const productoEditado: IProducto = {
            idProducto: Number(id),
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria,
        };
    
        try {
            await axios.put(`${appsettings.apiUrl}/productos/${id}`, productoEditado);
            Swal.fire("Éxito", "Producto actualizado correctamente", "success");
            navigate("/");
        } catch (error) {
            console.error("Error al editar producto", error);
            Swal.fire("Error", "No se pudo actualizar el producto", "error");
        }
    };
    
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Card style={{ width: "100%", maxWidth: "600px" }}>
                <CardBody>
                    <CardTitle tag="h3" className="mb-4 text-center">
                        Editar Producto
                    </CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Nombre del producto"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="precio">Precio</Label>
                            <Input
                                type="number"
                                id="precio"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                min="0"
                                step="0.01"
                                placeholder="Precio del producto"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="stock">Stock</Label>
                            <Input
                                type="number"
                                id="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                min="0"
                                placeholder="Cantidad en stock"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="categoria">Categoría</Label>
                            <Input
                                type="select"
                                id="categoria"
                                value={categoria?.idCategoria || ""}
                                onChange={(e) =>
                                    setCategoria(categorias.find(cat => cat.idCategoria === Number(e.target.value)) || null)
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
                            <Button color="primary" type="submit" className="w-48">
                                Actualizar Producto
                            </Button>
                            <Button color="secondary" type="button" onClick={() => navigate("/")} className="w-48">
                                Volver
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};
