package com.example.producto_inventario.service;

import com.example.producto_inventario.model.Categoria;
import com.example.producto_inventario.repository.CategoriaRepository;
import com.example.producto_inventario.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CategoriaService {
    HashMap<String, Object> datos = new HashMap<>();

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ProductoRepository productoRepository;
    public List<Categoria> getAllCategorias(){
        return categoriaRepository.findAll();
    }

    public ResponseEntity<Object> createCategoria(Categoria categoria){
        Optional<Categoria> existe = categoriaRepository.findCategoriaByNombre(categoria.getNombre());

        datos = new HashMap<>();

        if(existe.isPresent()){
            datos.put("error", true);
            datos.put("message", "Ya existe una categoría con ese nombre");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        }

        categoriaRepository.save(categoria);
        datos.put("message", "Categoría guardada con éxito");
        datos.put("data", categoria);
        return new ResponseEntity<>(datos, HttpStatus.CREATED);
    }

    public ResponseEntity<Object> getCategoria(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()) {
            return new ResponseEntity<>(categoria.get(), HttpStatus.OK);
        } else {
            Map<String, Object> datos = new HashMap<>();
            datos.put("error", true);
            datos.put("message", "Categoría no encontrada");
            return new ResponseEntity<>(datos, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Object> updateCategoria(Long id, Categoria categoria){
        Optional<Categoria> existe = categoriaRepository.findById(id);

        if(existe.isEmpty()){
            datos.put("error", true);
            datos.put("message", "Categoria no encontrada");
            return new ResponseEntity<>(datos, HttpStatus.NOT_FOUND);
        }

        Optional<Categoria> catExist = categoriaRepository.findCategoriaByNombre(categoria.getNombre());

        if (catExist.isPresent() && !catExist.get().getIdCategoria().equals(id)){
            datos.put("error", true);
            datos.put("message", "Ya existe una categoría con ese nombre");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        }

        categoria.setIdCategoria(id);
        categoriaRepository.save(categoria);
        datos.put("message", "Categoría actualizada con éxito");
        datos.put("data", categoria);
        return new ResponseEntity<>(datos, HttpStatus.OK);
    }

    public ResponseEntity<Object> deleteCategoria(Long id) {
        Map<String, Object> datos = new HashMap<>();

        Optional<Categoria> categoriaEliminada = categoriaRepository.findById(id);
        if (categoriaEliminada.isEmpty()) {
            datos.put("message", "No existe una categoría con ese id");
            return new ResponseEntity<>(datos, HttpStatus.BAD_REQUEST);
        }

        if (productoRepository.existsByCategoria(categoriaEliminada.get())) {
            datos.put("message", "Elimina primero el producto asociado");
            return new ResponseEntity<>(datos, HttpStatus.BAD_REQUEST);
        }

        categoriaRepository.deleteById(id);
        datos.put("message", "Categoría eliminada con éxito");
        return new ResponseEntity<>(datos, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{idCategoria}")
    public ResponseEntity<Object> obtenerCategoriaPorId(@PathVariable("idCategoria") Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if (categoria.isEmpty()) {
            return new ResponseEntity<>(Map.of("error", true, "message", "Categoría no encontrada"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categoria.get(), HttpStatus.OK);
    }
}
