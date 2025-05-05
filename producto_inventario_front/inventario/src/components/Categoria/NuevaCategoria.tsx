import React, { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle } from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../../settings/appsetting";
import { ICategoria } from "../../interface/ICategoria";

export const NuevaCategoria = () => {
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim()) {
            Swal.fire("Error", "El nombre de la categoría es obligatorio", "error");
            return;
        }

        try {
            const response = await axios.get<ICategoria[]>(`${appsettings.apiUrl}/categorias`);
            const existe = response.data.some(cat => cat.nombre.toLowerCase() === nombre.toLowerCase());

            if (existe) {
                Swal.fire("Error", "Ya existe una categoría con ese nombre", "error");
                return;
            }
        } catch (error) {
            console.error("Error al verificar categoría", error);
            Swal.fire("Error", "No se pudo verificar la categoría", "error");
            return;
        }

        try {
            const nuevaCategoria: Omit<ICategoria, "idCategoria"> = { nombre };
            await axios.post(`${appsettings.apiUrl}/categorias`, nuevaCategoria);
            Swal.fire("Éxito", "Categoría creada correctamente", "success");
            navigate("/listaCategoria");
        } catch (error) {
            console.error("Error al crear categoría", error);
            Swal.fire("Error", "No se pudo crear la categoría", "error");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Card style={{ width: "100%", maxWidth: "500px" }}>
                <CardBody>
                    <CardTitle tag="h3" className="mb-4 text-center">
                        Crear Categoría
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
                                Crear Categoría
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
