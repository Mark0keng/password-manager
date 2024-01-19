import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3000/password/${id}`);
    setData(res.data);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 200 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 16, lineHeight: 2.5 }} gutterBottom>
              Account Category : {data?.category}
            </Typography>
            <Typography component="div" sx={{ fontSize: 14, paddingBottom: 2 }}>
              Provider : {data?.provider}
            </Typography>
            <Typography component="div">Email : {data?.email}</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Password : {data?.password}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                navigate("/");
              }}
            >
              Kembali
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default Detail;
