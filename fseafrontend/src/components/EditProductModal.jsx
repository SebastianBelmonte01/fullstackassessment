import {
    Modal,
    Box,
    TextField,
    Button,
    Stack,
    Typography
} from "@mui/material";

export default function EditProductModal({
                                             open,
                                             onClose,
                                             product,
                                             onSave
                                         }) {
    if (!product) return null;

    const handleChange = (field, value) => {
        onSave({
            ...product,
            [field]: value,
        }, false);
    };

    const handleSubmit = () => {
        onSave(product, true);
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
                    Editar producto
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

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
