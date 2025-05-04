package com.example.producto_inventario.service;

import com.example.producto_inventario.model.Categoria;
import com.example.producto_inventario.model.Producto;
import com.example.producto_inventario.repositiry.CategoriaRepository;
import com.example.producto_inventario.repositiry.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class ProductoService {
    HashMap<String, Object> datos = new HashMap<>();

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Producto> getAllProducts(){
        return productoRepository.findAll();
    }

    public ResponseEntity<Object> createProduct(@RequestBody Producto producto){
        Optional<Producto> res = productoRepository.findProductoByNombre(producto.getNombre());

        datos = new HashMap<>();

        if(res.isPresent()){
            datos.put("error", true);
            datos.put("message", "Ya existe un producto con ese nombre");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        }

        if (producto.getCategoria() == null || producto.getCategoria().getIdCategoria() == null) {
            datos.put("error", true);
            datos.put("message", "La categoría es obligatoria");
            return new ResponseEntity<>(datos, HttpStatus.BAD_REQUEST);
        }

        Long idCategoria = producto.getCategoria().getIdCategoria();
        Optional<Categoria> categoria = categoriaRepository.findById(idCategoria);
        if (categoria.isEmpty()) {
            datos.put("error", true);
            datos.put("message", "Categoría no encontrada");
            return new ResponseEntity<>(datos, HttpStatus.BAD_REQUEST);
        }

        producto.setCategoria(categoria.get());

        productoRepository.save(producto);
        datos.put("message", "Se guardó con éxito");
        datos.put("data", producto);
        return new ResponseEntity<>(datos, HttpStatus.CREATED);
    }

    public ResponseEntity<Object> getProducto(Long id) {
        Optional<Producto> producto = productoRepository.findById(id);

        if (producto.isPresent()) {
            return new ResponseEntity<>(producto.get(), HttpStatus.OK);
        } else {
            Map<String, Object> datos = new HashMap<>();
            datos.put("error", true);
            datos.put("message", "Producto no encontrado");
            return new ResponseEntity<>(datos, HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<Object> updateProduct(Long id, Producto producto){
        datos = new HashMap<>();

        Optional<Producto> existe = productoRepository.findById(id);

        if(existe.isEmpty()){
            datos.put("error", true);
            datos.put("message", "Producto no encontrado");
            return new ResponseEntity<>(datos, HttpStatus.NOT_FOUND);
        }

        Optional<Producto> productExist = productoRepository.findProductoByNombre(producto.getNombre());
        if (productExist.isPresent() && !productExist.get().getIdProducto().equals(id)) {
            datos.put("error", true);
            datos.put("message", "Ya existe otro producto con ese nombre");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        }

        if (producto.getCategoria() == null || producto.getCategoria().getIdCategoria() == null) {
            datos.put("error", true);
            datos.put("message", "La categoría es obligatoria");
            return new ResponseEntity<>(datos, HttpStatus.BAD_REQUEST);
        }

        Long idCategoria = producto.getCategoria().getIdCategoria();
        Optional<Categoria> categoria = categoriaRepository.findById(idCategoria);
        if (categoria.isEmpty()) {
            datos.put("error", true);
            datos.put("message", "Categoría no encontrada");
            return new ResponseEntity<>(datos, HttpStatus.BAD_REQUEST);
        }

        producto.setCategoria(categoria.get());

        producto.setIdProducto(id);
        productoRepository.save(producto);
        datos.put("message", "Producto actualizado con éxito");
        datos.put("data", producto);
        return new ResponseEntity<>(datos, HttpStatus.OK);

    }

    public ResponseEntity<Object> deleteProduct(Long id) {
        datos = new HashMap<>();

        boolean existe = this.productoRepository.existsById(id);
        if (!existe) {
            datos.put("error", true);
            datos.put("message", "No existe un producto con ese id");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        };

        productoRepository.deleteById(id);
        datos.put("message", "Producto eliminado");
        return new ResponseEntity<>(datos, HttpStatus.ACCEPTED);
    }
}
