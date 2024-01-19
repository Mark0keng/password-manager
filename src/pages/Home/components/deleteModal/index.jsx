/* eslint-disable react/prop-types */
import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";

const DeleteModal = ({ isOpen, handleClose, dataId }) => {
  const deleteData = async () => {
    await axios.delete(`http://localhost:3000/password/${dataId}`);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: 5,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" style={{ lineHeight: 1 }}>
          Delete Data
        </Typography>

        <Typography
          variant="p"
          component="p"
          style={{ lineHeight: 3, fontFamily: "serif" }}
        >
          Anda yakin ingin menghapus data ini?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              deleteData();
              handleClose();
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
