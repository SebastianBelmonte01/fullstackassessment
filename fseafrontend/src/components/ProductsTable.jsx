import { DataGrid } from "@mui/x-data-grid";
import { Paper, CircularProgress, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "../api/product.service.js";

export default function ProductsTable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [forbidden, setForbidden] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rowCount, setRowCount] = useState(0);

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
    ];

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

    return (
        <Paper sx={{ height: 500, width: "100%" }}>
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
    );
}
