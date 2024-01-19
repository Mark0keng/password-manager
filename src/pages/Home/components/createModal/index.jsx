/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateModal = ({ isOpen, handleClose }) => {
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [isValid, setIsValid] = useState(true);

  const [errors, setErrors] = useState({
    email: "",
    provider: "",
    password: "",
    category: "",
  });

  useEffect(() => {
    clearErrors();
    clearState();
  }, [handleClose]);

  const handleSubmit = () => {
    setIsValid(true);

    if (email === "") {
      console.log(email);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      setIsValid(false);
    }

    if (provider === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        provider: "Provider is required",
      }));
      setIsValid(false);
    }
    console.log(category.length);
    if (category === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: "Category is required",
      }));
      setIsValid(false);
    }

    if (password === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      setIsValid(false);
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      setIsValid(false);
    }

    postData();
    // console.log();
    // if (isValid) {
    //   postData();
    //   handleClose();
    // }
  };

  const clearErrors = () => {
    setErrors({
      email: "",
      provider: "",
      password: "",
      category: "",
    });
  };

  const clearState = () => {
    setEmail("");
    setProvider("");
    setPassword("");
    setCategory("");
  };

  const postData = async () => {
    await axios.post("http://localhost:3000/password", {
      email,
      provider,
      password,
      category,
    });

    if (isValid) {
      handleClose();
    }
  };

  console.log(isValid);

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
        <Typography variant="h6" component="h2" style={{ lineHeight: 3 }}>
          Tambah Data
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <TextField
            required
            id="outlined-basic"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            helperText={errors.email}
            error={!!errors.email}
          />

          <TextField
            required
            id="outlined-basic"
            label="provider"
            variant="outlined"
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
            }}
            helperText={errors.provider}
            error={!!errors.provider}
          />

          <TextField
            required
            id="outlined-basic"
            label="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            helperText={errors.password}
            error={!!errors.password}
          />

          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              error={!!errors.category}
            >
              <MenuItem value={"Work"}>Work</MenuItem>
              <MenuItem value={"Family"}>Family</MenuItem>
              <MenuItem value={"Personal"}>Personal</MenuItem>
            </Select>
            <FormHelperText>{errors.category}</FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            TAMBAH DATA
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateModal;
