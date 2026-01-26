import {
    Modal,
    Box,
    TextField,
    Button,
    Stack,
    Typography
} from "@mui/material";
import { useState } from "react";

const initialState = {
    name: "",
    description: "",
    price: "",
    stock: "",
};

export default function CreateProductModal({ open, onClose, onCreate }) {
    const [product, setProduct] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onCreate(product);
            setProduct(initialState);
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Crear producto
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Nombre"
                        value={product.name}
                        onChange={(e) =>
                            handleChange("name", e.target.value)
                        }
                    />

                    <TextField
                        label="Descripción"
                        value={product.description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                    />

                    <TextField
                        label="Precio"
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                            handleChange("price", e.target.value)
                        }
                    />

                    <TextField
                        label="Stock"
                        type="number"
                        value={product.stock}
                        onChange={(e) =>
                            handleChange("stock", e.target.value)
                        }
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Crear
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
