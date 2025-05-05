package com.example.producto_inventario.controller;

import com.example.producto_inventario.service.ProductoService;
import com.example.producto_inventario.model.Producto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/productos")
public class ProductoController {


    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService){
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> getAllProducts(){
        return this.productoService.getAllProducts();
    }

    @PostMapping
    public ResponseEntity<Object> createProduct(@Valid @RequestBody Producto producto){

        return productoService.createProduct(producto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCategoria(@PathVariable("id") Long id) {
        return productoService.getProducto(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable("id") Long id,@Valid @RequestBody Producto producto){
        return productoService.updateProduct(id, producto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long idProducto){
        return productoService.deleteProduct(idProducto);
    }
}
