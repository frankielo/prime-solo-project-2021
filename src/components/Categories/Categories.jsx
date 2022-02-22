import React,{useEffect,useState}  from 'react';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import deleteIcon from '../../assets/deleteIcon.png'
import editIcon from '../../assets/editIcon.png'
import axios from 'axios'
import swal from 'sweetalert';
import InputAdornment from '@mui/material/InputAdornment';
import addButton from '../../assets/addButton.png'
import SaveAsIcon from '@mui/icons-material/SaveAs';

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



export default function Categories() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [category, setCategory] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editRowId, setEditRowId] = useState("")
  const [editMode, setEditMode] = useState(false)
  
  const dispatch = useDispatch()


  const onSaveEdit = () => {
    axios.put(`/api/category/${editRowId}`,{title:editTitle}).then(()=>
    {dispatch({
        type:'FETCH_CATEGORIES'
    })
      setEditMode(false)
      setEditTitle("")
      setEditRowId("")
      })
  }

  const onAddCategory = ()=>{
      axios.post("/api/category",{title:category}).then(()=>
      dispatch({
          type:'FETCH_CATEGORIES'
      })
      )
      setCategory("")
  }



  const categoryList = useSelector(state => state.category.setCategories)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteHandler = (id) => {
    swal({
        title: "Are you sure?",
        text: " This can also delete all the posts attached to this category.Once deleted, you will not be able to recover this Category and all attached posts!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            axios.delete(`/api/category/${id}`).then(()=>

            {
                swal("Poof! Your Category has been deleted!", {
                icon: "success",
              })

              dispatch({
                type : 'FETCH_CATEGORIES'
            })
            }

            ).catch(err=>console.log("error while deleting the category", err))

        } else {
          swal("Your Category is safe!");
        }
      });
      
  }

  return (

    <Grid container direction="column" spacing = {2} style={{marginTop:"2rem",width:"80%",margin:"auto"}}>
    <Grid container item>
        <Grid item>
        <TextField
            id="outlined-name"
            label={editMode ? "Edit a category" : "Add a Category"}
            value={ editMode ? editTitle : category}
            onChange={editMode ? (e)=>setEditTitle(e.target.value) : (e)=>setCategory(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                  {!editMode ?
                  <IconButton onClick={onAddCategory}>
                    <img src={addButton} alt="add icon" />
                  </IconButton> : 
                  <IconButton onClick={onSaveEdit} size="large">
                    <SaveAsIcon style={{ color: '#1C7ED6' }} />
                  </IconButton>
                  }
              </InputAdornment>,
            }}
        />
        </Grid>
        {/* { editMode ?
            <Grid item>
                <Button variant="contained" onClick={onSaveEdit}>Save New Title</Button>
            </Grid> :
        <Grid item>
            <Button variant="contained" onClick={onAddCategory}>Add</Button>
        </Grid>

        } */}
    </Grid>
    <Grid item container>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">

      <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell >Category Title</TableCell>
            <TableCell >Delete</TableCell>
            <TableCell >Edit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : categoryList
          ).map((row,index) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: 20 }}>
                {row.id}
              </TableCell>
              <TableCell style={{ width: 320 }} >
                {row.cat_title}
              </TableCell>
              <TableCell style={{ width: 10 }} >
              <IconButton onClick={()=>{onDeleteHandler(row.id)}}>
                  <img src={deleteIcon} alt="delete icon" />
              </IconButton>
              </TableCell>
              <TableCell style={{ width: 10 }} >
              <IconButton onClick={()=>{setEditTitle(row.cat_title);setEditRowId(row.id);setEditMode(true)}}>
                  <img src={editIcon} alt="edit icon" />
              </IconButton>
              </TableCell>
              
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={categoryList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
  );
}




