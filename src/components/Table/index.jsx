/* eslint-disable react/prop-types */
import { CloseOutlined, InfoOutlined } from "@mui/icons-material";
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
import { useState } from "react";
import DeleteModal from "../../pages/Home/components/deleteModal";
import axios from "axios";

const TableData = ({ data, columns }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const fetchData = () => {
    axios.get("http://localhost:3000/password");
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "24px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => {
                return (
                  <TableCell align="center" key={index}>
                    {column}
                  </TableCell>
                );
              })}
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
                <TableCell align="center">{row.password}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    style={{ marginRight: 4 }}
                  >
                    <InfoOutlined />
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    variant="contained"
                    onClick={handleModalOpen}
                    handleClose={handleModalClose}
                    idData={row.id}
                  >
                    <CloseOutlined />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteModal isOpen={isOpen} handleClose={handleModalClose} />
    </>
  );
};

export default TableData;
