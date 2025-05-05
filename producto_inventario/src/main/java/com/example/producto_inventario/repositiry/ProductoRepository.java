package com.example.producto_inventario.repositiry;

import com.example.producto_inventario.model.Categoria;
import com.example.producto_inventario.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Optional<Producto> findProductoByNombre(String nombre);

    boolean existsByCategoria(Categoria categoria);
}
