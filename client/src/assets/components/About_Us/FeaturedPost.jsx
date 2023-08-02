import PropTypes from 'prop-types';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

function FeaturedPost(props) {
  const { post } = props;

  const navigate = useNavigate();

  return (
    <Grid textAlign="justify"  item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
 
            { post.linkText ? (
            <Link  variant="subtitle1"
            onClick={() => navigate(post.linkUrl)}>
              <Button variant="contained" color="secondary">
              {post.linkText}
              </Button>
            </Link>
            ) :""
            }
            
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
