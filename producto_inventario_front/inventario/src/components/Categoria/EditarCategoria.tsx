import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../../settings/appsetting";
import { ICategoria } from "../../interface/ICategoria";

export const EditarCategoria = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [originalNombre, setOriginalNombre] = useState("");

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await axios.get<ICategoria>(`${appsettings.apiUrl}/categorias/${id}`);
                const categoria = response.data;
                setNombre(categoria.nombre);
                setOriginalNombre(categoria.nombre);
            } catch (error) {
                console.error("Error al cargar categoría", error);
                Swal.fire("Error", "No se pudo cargar la categoría", "error");
            }
        };

        fetchCategoria();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim()) {
            Swal.fire("Error", "El nombre de la categoría es obligatorio", "error");
            return;
        }

        if (nombre !== originalNombre) {
            try {
                const response = await axios.get<ICategoria[]>(`${appsettings.apiUrl}/categorias`);
                const categoriaExistente = response.data.find(cat => cat.nombre.toLowerCase() === nombre.toLowerCase());

                if (categoriaExistente) {
                    Swal.fire("Error", "Ya existe una categoría con ese nombre", "error");
                    return;
                }
            } catch (error) {
                console.error("Error al verificar nombre", error);
                Swal.fire("Error", "Hubo un problema al verificar el nombre", "error");
                return;
            }
        }

        const categoriaEditada: ICategoria = {
            idCategoria: Number(id),
            nombre
        };

        try {
            await axios.put(`${appsettings.apiUrl}/categorias/${id}`, categoriaEditada);
            Swal.fire("Éxito", "Categoría actualizada correctamente", "success");
            navigate("/listaCategoria");
        } catch (error) {
            console.error("Error al editar categoría", error);
            Swal.fire("Error", "No se pudo actualizar la categoría", "error");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Card style={{ width: "100%", maxWidth: "600px" }}>
                <CardBody>
                    <CardTitle tag="h3" className="mb-4 text-center">
                        Editar Categoría
                    </CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Nombre de la categoría"
                            />
                        </FormGroup>
                        <div className="d-flex justify-content-end gap-3 mt-4">
                            <Button color="primary" type="submit" className="w-48">
                                Actualizar Categoría
                            </Button>
                            <Button color="secondary" type="button" onClick={() => navigate("/listaCategoria")} className="w-48">
                                Volver
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};
