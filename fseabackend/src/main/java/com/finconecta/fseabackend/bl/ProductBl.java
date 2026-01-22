package com.finconecta.fseabackend.bl;

import com.finconecta.fseabackend.dao.Product;
import com.finconecta.fseabackend.dto.ProductDto;
import com.finconecta.fseabackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * -------------------------------------------------------------------------*
 * Información General
 * -------------------------------------------------------------------------*
 * Código de Aplicación:
 * Código de Objeto:
 * Descripción:
 * Author Prog.: Sebastian Francisco Belmonte Cerveró
 * -------------------------------------------------------------------------*
 * Fecha | Author | Comentario
 * 22.01.2026 | Sebastian Francisco Belmonte Cerveró | Creación Inicial
 * -------------------------------------------------------------------------*
 */
@Service
public class ProductBl {

    @Autowired
    private ProductRepository productRepository;

    public ProductDto createProduct(ProductDto productDto) {
        try {
            Product product = new Product();
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setPrice(productDto.getPrice());
            product.setStock(productDto.getStock());
            Product savedProduct = productRepository.save(product);
            ProductDto newProductDto = new ProductDto(savedProduct);
            return newProductDto;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
