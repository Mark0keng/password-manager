/* eslint-disable react/prop-types */
import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import classes from "./style.module.scss";
import { useEffect } from "react";

const CreateModal = ({ isOpen, handleClose }) => {
  useEffect(() => {
    reset({
      email: "",
      provider: "",
      password: "",
      category: "",
    });
  }, [handleClose]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post("http://localhost:3000/password", {
      email: data.email,
      provider: data.provider,
      password: data.password,
      category: data.category,
    });

    handleClose();
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
        <Typography variant="h6" component="h2" style={{ lineHeight: 3 }}>
          Tambah Data
        </Typography>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.formControl}>
              <label htmlFor="email" className={classes.label}>
                Email
              </label>
              <input
                className={classes.input}
                type="text"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className={classes.error}>{errors.email?.message}</p>
            </div>

            <div className={classes.formControl}>
              <label htmlFor="provider" className={classes.label}>
                Provider
              </label>
              <input
                className={classes.input}
                type="text"
                id="provider"
                {...register("provider", { required: "Provider is required" })}
              />
              <p className={classes.error}>{errors.provider?.message}</p>
            </div>

            <div className={classes.formControl}>
              <label className={classes.label}>Password</label>
              <input
                className={classes.input}
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Min characters is 6",
                  },
                })}
              />
              <p className={classes.error}>{errors.password?.message}</p>
            </div>

            <div className={classes.formControl}>
              <label className={classes.label}>Category</label>
              <select
                className={classes.select}
                {...register("category", { required: "Category is required" })}
              >
                <option value=""></option>
                <option value="Work">Work</option>
                <option value="Family">Family</option>
                <option value="Personal">Personal</option>
              </select>
              <p className={classes.error}>{errors.category?.message}</p>
            </div>
            <Button variant="contained" type="submit">
              TAMBAH DATA
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateModal;
