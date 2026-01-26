import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Paper, CircularProgress, Box, Button, Stack} from "@mui/material";
import { useEffect, useState } from "react";
import {createProduct, deleteProduct, getProducts, updateProduct} from "../api/product.service.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import EditProductModal from "./EditProductModal.jsx";
import AddIcon from '@mui/icons-material/Add';
import CreateProductModal from "./CreateProductModal.jsx";


export default function ProductsTable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [forbidden, setForbidden] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rowCount, setRowCount] = useState(0);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);


    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Nombre", flex: 1 },
        { field: "description", headerName: "Descripción", flex: 2 },
        {
            field: "price",
            headerName: "Precio",
            width: 120,
            type: "number",
            valueFormatter: (params) => `${params} Bs.`,
        },
        {
            field: "stock",
            headerName: "Stock",
            width: 100,
            type: "number",
        },
        {
            field: "delete",
            headerName: "Eliminar",
            type: "actions",
            width: 100,
            getActions: (params) => [
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDelete(params.id)}
                        showInMenu={false}
                    />,
                ]
        },
        {
            field: "edit",
            headerName: "Editar",
            type: "actions",
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    key="edit"
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={() => handleEditOpen(params.row)}
                    showInMenu={false}
                />,
            ]
        },
    ];


    const handleEditOpen = (product) => {
        setSelectedProduct(product);
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedProduct(null);
    };

    const handleEditSave = async (product, submit) => {
        setSelectedProduct(product);

        if (!submit) return;

        try {
            await updateProduct(product);

            setRows((prev) =>
                prev.map((row) =>
                    row.id === product.id ? product : row
                )
            );

            handleEditClose();
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(page, pageSize);
                setRows(response.data.data.content);
                setRowCount(response.data.data.totalElements);
            } catch (error) {
                if (error.response?.status === 403) {
                    setForbidden(true);
                } else {
                    console.error("Error fetching products", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, pageSize]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (forbidden) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
            >
                <Box textAlign="center">
                    <h2>No permission</h2>
                    <p>You don’t have permission to view this content.</p>
                </Box>
            </Box>
        );
    }

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setRows((prev) => prev.filter((row) => row.id !== id));
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const handleCreate = async (product) => {
        const response = await createProduct(product);

        setRows((prev) => [
            response.data.data,
            ...prev,
        ]);

        setRowCount((prev) => prev + 1);
    };





    return (
        <>
            <Stack direction="row" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenCreate(true)}
                >
                    Agregar producto
                </Button>
            </Stack>
            <Paper sx={{ height: "20rm", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationMode="server"
                    rowCount={rowCount}
                    pageSizeOptions={[5, 10, 20]}
                    paginationModel={{ page, pageSize }}
                    onPaginationModelChange={(model) => {
                        setPage(model.page);
                        setPageSize(model.pageSize);
                    }}
                />
            </Paper>
            <CreateProductModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreate={handleCreate}
            />
            <EditProductModal
                open={openEdit}
                onClose={handleEditClose}
                product={selectedProduct}
                onSave={handleEditSave}
            />
        </>

    );
}
