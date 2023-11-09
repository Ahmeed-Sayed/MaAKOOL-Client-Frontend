import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import "./card.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
export default function ProudctCard() {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    boxShadow: "4px 1px 26px 0px rgba(0, 0, 0, 0.1)",
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/resturant/products/")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  const queryClient = useQueryClient();

  return (
    <Grid container spacing={2} p={2.5}>
      {products.map((product, index) => (
        <Grid item key={index} xs={12} xl={2} sm={4} md={3}>
          <Card sx={{ padding: 1.5 }} style={cardStyle}>
            <CardActionArea style={{ flex: "1" }}>
              <CardMedia
                component="img"
                height="180"
                image="https://dummyimage.com/340x200.png/ff4444/ffffff"
                alt="Pizza Image"
                sx={{ borderRadius: 1, padding: 0 }}
              />
              <CardContent style={{ flex: "1" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Typography size="small" color="primary" fontSize={"large"}>
                {product.price} EGP
              </Typography>
              {/* <Button
                size="small"
                color="primary"
                variant="contained"
                // onClick={(e) => {
                //   e.stopPropagation();
                //   dispatch(addItem(product));
                // }}
              >
                Add to Cart
              </Button> */}
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={async (e) => {
                  e.stopPropagation();
                  // dispatch(addItem(product));

                  // Make the API call
                  try {
                    const response = await axios.post(
                      "http://localhost:8000/cart/add_to_order/",
                      {
                        product: product.id,
                      }
                    );
                    queryClient.invalidateQueries("order");

                    console.log(response.data.message);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
