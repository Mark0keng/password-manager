import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const Category = () => {
  const { category } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/password");

    const modifiedData = res?.data?.reduce((result, item) => {
      if (item?.category === category) {
        result.push(item);
      }
      return result;
    }, []);

    setData(modifiedData);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "10%" }}>
        {data?.map((item, index) => {
          return (
            <Card sx={{ minWidth: 275, marginBottom: 5 }} key={index}>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Account Category
                  </Typography>
                  <Typography sx={{ fontSize: 16, lineHeight: 1 }} gutterBottom>
                    {item.category}
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Email
                  </Typography>
                  <Typography sx={{ fontSize: 16, lineHeight: 1 }} gutterBottom>
                    {item.email}
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Provider
                  </Typography>
                  <Typography sx={{ fontSize: 16, lineHeight: 1 }} gutterBottom>
                    {item.provider}
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Password
                  </Typography>
                  <Typography sx={{ fontSize: 16, lineHeight: 1 }} gutterBottom>
                    {item?.password}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Category;
