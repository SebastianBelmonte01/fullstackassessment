package com.finconecta.fseabackend.api;

import com.finconecta.fseabackend.bl.ProductBl;
import com.finconecta.fseabackend.dto.PageResponse;
import com.finconecta.fseabackend.dto.ProductDto;
import com.finconecta.fseabackend.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

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
@RestController()
@RequestMapping("/api/v1/products")
public class ProductApi {

    @Autowired
    private ProductBl productBl;

    @PostMapping()
    public ResponseDto<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        try{
            productDto = productBl.createProduct(productDto);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDto<>(false, "Error creating product", null, 500);
        }
        ResponseDto<ProductDto> response = new ResponseDto<>(true, "Created sucessfully", productDto, 201);
        return response;
    }

    @GetMapping()
    public ResponseDto<PageResponse<ProductDto>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ){
        PageResponse<ProductDto> products;
        try{
            products = productBl.getProducts(page, size);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDto<>(false, "Error fetching products", null, 500);
        }
        ResponseDto<PageResponse<ProductDto>> response = new ResponseDto<>(true, "Products fetched successfully", products, 200);
        return response;
    }

    @PutMapping("/{id}/deactivate")
    public ResponseDto<String> deactivateProduct(@PathVariable Long id) {
        try {
            productBl.deactivateProduct(id);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDto<>(false, "Error deactivating product", null, 500);
        }
        return new ResponseDto<>(true, "Product deactivated successfully", null, 200);
    }

    @PutMapping()
    public ResponseDto<ProductDto> updateProduct(@RequestBody ProductDto productDto) {
        try {
            productDto = productBl.updateProduct(productDto);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDto<>(false, "Error updating product", null, 500);
        }
        if (productDto == null) {
            return new ResponseDto<>(false, "Product not found", null, 404);
        } else {
            return new ResponseDto<>(true, "Product updated successfully", productDto, 200);
        }
    }

}
