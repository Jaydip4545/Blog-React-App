import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blog(props) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    const { data } = await axios.delete("/api/v1/blog/delete-blog/" + props.id);
    if (data?.success) {
      alert("Blog Deleted SuccessFully");
      props.deleteItem(e);
      navigate("/my-blogs");
    }
  };
  const handleEdit = (e) => {
    //console.log(props.id);
    navigate("/update-blog/" + props.id);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={props.name}
        subheader={props.time}
      />
      {props.flag && (
        <div>
          <Button variant="outlined" size="small" onClick={handleDelete}>
            {" "}
            <DeleteIcon />
          </Button>
          <Button variant="outlined" size="small" onClick={handleEdit}>
            {" "}
            <EditOutlinedIcon />
          </Button>
        </div>
      )}
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Title : {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Blog Content : <br />
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
