import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Tooltip,
} from "@mui/material";
import "./card.css";
import axios from "axios";
import { useQueryClient } from "react-query";

export default function ProudctCard(props) {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    height: "480px",
    boxShadow: "4px 1px 26px 0px rgba(0, 0, 0, 0.1)",
  };
  const queryClient = useQueryClient();
  return !props.products ? (
    <div className="fs-1 text-center mt-1 "> No Data To show</div>
  ) : (
    <Grid container spacing={2} p={2.5}>
      {props.products.map((product, index) => (
        <Grid item key={index} xs={12} xl={2} sm={4} md={3}>
          <Card sx={{ padding: 1.5 }} style={cardStyle}>
            <CardActionArea style={{ flex: "1" }}>
              <CardMedia
                component="img"
                height="150"
                width="150"
                src={`http://127.0.0.1:8000${product.image}`}
                alt="image"
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
            <CardActions
              sx={{ justifyContent: "space-between", marginBottom: "15" }}
            >
              <Typography size="small" color="primary" fontSize={"large"}>
                {product.price} USD
              </Typography>
              <Tooltip
                title={!localStorage.id ? "You need to be logged in" : ""}
              >
                <span>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const response = await axios.post(
                          "http://localhost:8000/orders/add_to_order/",
                          {
                            product: product.id,
                            userId: localStorage.id,
                          }
                        );
                        queryClient.invalidateQueries("order");
                        console.log(response.data.message);
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    disabled={!localStorage.id}
                  >
                    Add to Cart
                  </Button>
                </span>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
