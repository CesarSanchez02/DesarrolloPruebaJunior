package com.example.producto_inventario.controller;

import com.example.producto_inventario.model.Categoria;
import com.example.producto_inventario.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping(path = "api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService){
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public List<Categoria> listarCategorias(){
        return this.categoriaService.getAllCategorias();
    }

    @PostMapping
    public ResponseEntity<Object> createCategoria(@Valid @RequestBody Categoria categoria){
        return categoriaService.createCategoria(categoria);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCategoria(@PathVariable("id") Long id) {
        return categoriaService.getCategoria(id);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Object> updatedCategoria(@PathVariable("id") Long id,@Valid @RequestBody Categoria categoria){
        return categoriaService.updateCategoria(id, categoria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCategoria(@PathVariable("id") Long id){
        return categoriaService.deleteCategoria(id);
    }
}
