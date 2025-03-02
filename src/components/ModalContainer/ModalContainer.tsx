import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ModalContainer = ({ open, onClose, title, children }: any) => (
    <Modal open={open} onClose={onClose}>
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                maxWidth: "90%",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
            </Typography>
            {children}
        </Box>
    </Modal>
);

export default ModalContainer;
