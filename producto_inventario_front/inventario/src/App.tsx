
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { ListaCategoria } from "./components/Categoria/ListaCategoria"
import { ListaProducto } from "./components/Producto/ListaProducto"
import { NuevoProducto } from "./components/Producto/NuevoProducto"
import { EditarProducto } from "./components/Producto/EditarProducto"
import { NuevaCategoria } from "./components/Categoria/NuevaCategoria"
import { EditarCategoria } from "./components/Categoria/EditarCategoria"
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaProducto/>}></Route>
        <Route path="/listaProducto" element={<ListaProducto/>}></Route>
        <Route path="/nuevoProducto" element={<NuevoProducto />}></Route>
        <Route path="/editarProducto/:id" element={<EditarProducto/>}></Route>

        <Route path="/listaCategoria" element={<ListaCategoria/>}></Route>
        <Route path="/nuevaCategoria" element={<NuevaCategoria/>}></Route>
        <Route path="/editarCategoria/:id" element={<EditarCategoria/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
