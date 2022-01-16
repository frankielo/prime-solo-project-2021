import React,{useEffect,useState} from 'react'
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
import { orange } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';


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


  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
  
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  

const Blogs = () => {

    const [expandId, setExpandId] = React.useState("");
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(12);
    const [selectedCategory,setSelectedCategory] = useState("All")

    const categories = useSelector(state => state.category.setCategories)

    const searchQuery = useSelector(state => state.post.searchQuery)
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
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
        dispatch({ type : 'FETCH_CATEGORIES'})
    }, [])

    const publishedPostList = useSelector(state => state.post.publishedPost)

    const filteredList = publishedPostList.filter
    (post=> post.post_title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (post.categorylist.indexOf(selectedCategory) > -1 || selectedCategory === "All")
    )

    return (
        <>
        <Grid container direction = "column" spacing={3}>
         <Grid container item spacing={1} justifyContent="center">
         <Grid item>
              <Chip label = "All" onClick={()=>setSelectedCategory("All")}/>
            </Grid>
         {categories.map(cat=>
           <Grid item key={cat.id}>
              <Chip label = {cat.cat_title} onClick={()=>setSelectedCategory(cat.cat_title)}/>
            </Grid>
         )}
          </Grid>

        <Grid container item spacing={2} style={{marginTop:"3rem",width:"90%",margin:"auto"}} 
         justifyContent="center">

        {(rowsPerPage > 0
            ? filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredList
            ).map(post=>
        <Grid item  key={post.id} xs={3}>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: orange[700] }} aria-label="recipe">
              {post.post_author[0]}
            </Avatar>
          }
          
          title={typeof (post.post_title.charAt(0)) === "string" ?
          post.post_title.charAt(0).toUpperCase() + post.post_title.slice(1) : post.post_title}
          subheader={`Posted On : ${post.post_date.split("T")[0]}`}

          titleTypographyProps={{variant:'body1' }}
          subheaderTypographyProps={{variant:'subtitle' }}
          >
            
            {/* <Typography variant="body1" color="text.secondary"> 
                {post.post_title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
                
                {`Posted On : ${post.post_date.split("T")[0]}`}
          </Typography> */}

          </CardHeader>
        
        <CardMedia
          component="img"
          height="194"
          image={post.post_image_url}
          alt={post.post_title}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
                
                {`Posted by ${post.post_author}`}
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

<Grid container item justifyContent="center" style={{marginTop:"5rem"}}>
        <Grid item>
        <Stack spacing={2}>
            <TablePagination 
                 labelRowsPerPage='Results Per Page'
                 rowsPerPageOptions={[12, 24, 36, { label: 'All', value: -1 }]}
                 colSpan={3}
                 count={filteredList.length}
                 rowsPerPage={rowsPerPage}
                 page={page} 
                 SelectProps={{
                   inputProps: {
                     'aria-label': 'Results per page'
                   },
                   native: true,
                 }}
                 onPageChange={handleChangePage}
                 onRowsPerPageChange={handleChangeRowsPerPage}
                 ActionsComponent={TablePaginationActions}
            />
        </Stack>
        </Grid>
        </Grid>

      </Grid>
      </Grid>
      </>
    )
}

export default Blogs



