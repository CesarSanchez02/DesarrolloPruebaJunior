package com.example.producto_inventario.test;

import com.example.producto_inventario.model.Categoria;
import com.example.producto_inventario.model.Producto;
import com.example.producto_inventario.repository.ProductoRepository;
import com.example.producto_inventario.repository.CategoriaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Transactional
public class ProductoRepositoryTest {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    private Categoria categoria;

    @BeforeEach
    public void setUp() {
        categoria = new Categoria();
        categoria.setNombre("Electrónica");
        categoriaRepository.save(categoria);
    }

    @Test
    public void testFindProductoByNombre() {
        Producto producto = new Producto();
        producto.setNombre("Producto 1");
        producto.setPrecio(100.0);
        producto.setStock(10);
        producto.setCategoria(categoria);

        productoRepository.save(producto);

        Optional<Producto> result = productoRepository.findProductoByNombre("Producto 1");

        assertTrue(result.isPresent());
        assertEquals("Producto 1", result.get().getNombre());
    }

    @Test
    public void testExistsByCategoria() {
        Producto producto = new Producto();
        producto.setNombre("Producto 1");
        producto.setPrecio(100.0);
        producto.setStock(10);
        producto.setCategoria(categoria);

        productoRepository.save(producto);

        boolean exists = productoRepository.existsByCategoria(categoria);

        assertTrue(exists);
    }
}
