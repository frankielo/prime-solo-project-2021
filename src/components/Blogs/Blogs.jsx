import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pagination from '@mui/material/Pagination';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

const Blogs = () => {

    const [expandId, setExpandId] = React.useState("");
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
        setPage(value);
      };

    const handleExpandClick = (id) => {
        if(expandId === id){
            setExpandId("")
        }
        else{
            setExpandId(id)
        }
    };

    useEffect(() => {
        dispatch({ type : 'FETCH_PUBLISHED_POSTS'})
    }, [])

    const publishedPostList = useSelector(state => state.post.publishedPost)
    return (
        <Grid container direction="row" spacing={4} style={{marginTop:"3rem",width:"80%",margin:"auto"}} justifyContent="center">

        {publishedPostList.map(post=>
        <Grid item style={{width:"25%"}} key={post.id} xs={4}>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post.post_author[0]}
            </Avatar>
          }

          title={post.post_title}
          subheader={`Author: ${post.post_author}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.post_image_url}
          alt={post.post_title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
                {`Posted On : ${post.post_date.split("T")[0]}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expandId === post.id}
            onClick={()=>{handleExpandClick(post.id)}}
            aria-expanded={expandId === post.id}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandId === post.id} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{post.post_content}</Typography>
          </CardContent>
        </Collapse>
        </Card>
      </Grid>
        )}

      {/* <Grid item>
            <Pagination count={500} page={page} onChange={handleChange} />
      </Grid> */}
      </Grid>
    )
}

export default Blogs



