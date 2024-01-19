import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./style.module.scss";

import Navbar from "../../components/Navbar";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateModal from "./components/createModal";
import { CloseOutlined, InfoOutlined } from "@mui/icons-material";
import DeleteModal from "./components/deleteModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isOpen, isOpenDeleteModal]);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setIsOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setIsOpenDeleteModal(false);
  };

  const passwordValidation = (password) => {
    if (password.length < 6) {
      setError("Password mimimal 6 karakter");
    }
  };

  const fetchData = async () => {
    const response = await axios
      .get("http://localhost:3000/password")
      .then((response) => {
        return response.data;
      });
    setData(response);
  };

  return (
    <div className={classes.container}>
      <Navbar />

      <Button
        variant="contained"
        onClick={() => {
          handleModalOpen();
        }}
      >
        TAMBAH DATA
      </Button>
      <CreateModal isOpen={isOpen} handleClose={handleModalClose} />

      <TableContainer component={Paper} style={{ marginTop: "24px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Provider</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.provider}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    style={{ marginRight: 4 }}
                    onClick={() => {
                      navigate(`/detail/${row.id}`);
                    }}
                  >
                    <InfoOutlined />
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setDeleteId(row.id);
                      handleDeleteModalOpen();
                    }}
                  >
                    <CloseOutlined />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleClose={handleDeleteModalClose}
        dataId={deleteId}
      />
    </div>
  );
};

export default Home;
