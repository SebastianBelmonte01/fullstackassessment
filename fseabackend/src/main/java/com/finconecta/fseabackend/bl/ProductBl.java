package com.finconecta.fseabackend.bl;

import com.finconecta.fseabackend.dao.Product;
import com.finconecta.fseabackend.dto.ProductDto;
import com.finconecta.fseabackend.logging.LogService;
import com.finconecta.fseabackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

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
    @Autowired
    private LogService logService;

    public ProductDto createProduct(ProductDto productDto) {
        try {
            Product product = new Product();
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setPrice(productDto.getPrice());
            product.setStock(productDto.getStock());
            product.setStatus(true);
            Product savedProduct = productRepository.save(product);
            ProductDto newProductDto = new ProductDto(savedProduct);
            logService.info("Product created: " + newProductDto.getId(), null);
            return newProductDto;
        }
        catch (Exception e) {
            e.printStackTrace();
            logService.error("Error creating product: " + e.getMessage(), null);
        }
        return null;
    }

    public Page<ProductDto> getProducts(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

//        List<Product> products = productRepository.findAllByStatus(true);
//        List<ProductDto> productDtos = products.stream()
//                .map(ProductDto::new)
//                .toList();
        Page<ProductDto> products = productRepository.findAllByStatus(true, pageable)
                .map(ProductDto::new);
        logService.info("Fetched " + products.getTotalElements() + " active products", null);
        return products;
    }

    public void deactivateProduct(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            product.setStatus(false);
            logService.info("Product deactivated: " + id, null);
            productRepository.save(product);
        }
    }

    public ProductDto updateProduct(ProductDto productDto) {
        Product product = productRepository.findProductByProductIdAndStatus(productDto.getId(), true);
        if (product != null) {
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setPrice(productDto.getPrice());
            product.setStock(productDto.getStock());
            Product updatedProduct = productRepository.save(product);
            logService.info("Product updated: " + productDto.getId(), null);
            return new ProductDto(updatedProduct);
        }
        return null;
    }
}
