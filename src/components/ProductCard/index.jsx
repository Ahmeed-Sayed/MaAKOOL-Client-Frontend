import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import "./card.css";
export default function ProudctCard(props) {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    boxShadow: "5px 5px 5px 5px darkgrey",
  };

  return (
    <Grid container spacing={4}>
      {props.products.map((product, index) => (
        <Grid item key={index}>
          <Card sx={{ maxWidth: 345, padding: 1.5 }} style={cardStyle}>
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
                  {product.itemName}
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
              <Button size="small" color="primary" variant="contained">
                GO to product
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
