import React,{useEffect}  from 'react';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';

import axios from 'axios'



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



export default function AdminPosts() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch({
         type : 'FETCH_ALL_POSTS'
     })
  }, [])

  const onEditCategory = (rowId,currentStatus)=>{

    let status = ""
    currentStatus === "draft" ? status = "published" : status = "draft"

    dispatch({
        type : 'TOGGLE_BLOG_ACTIVATION',
        payload : {rowId,status}
    })

    // axios.put(`/api/posts/${rowId}`,{status})

    // dispatch({
    //     type : 'FETCH_ALL_POSTS'
    // })
    // dispatch({
    //     type : 'FETCH_PUBLISHED_POSTS'
    // })

  }


  const fullPostList = useSelector(state => state.post.allPost)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fullPostList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer component={Paper}  style={{maxWidth:"90%",margin:"auto",marginTop:"5rem"}}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">

      <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell >Author</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Image</TableCell>
            <TableCell >Content</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Activate/Deactivate Post</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? fullPostList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : fullPostList
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: 120 }}>
                {row.post_title}
              </TableCell>
              <TableCell style={{ width: 80 }} >
                {row.post_author}
              </TableCell>
              <TableCell style={{ width: 80 }} >
                {row.post_date.split('T')[0]}
              </TableCell>
              <TableCell style={{ width: 80 }}>
                <img src={row.post_image_url} alt={row.post_title} width="50" />
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.post_content}
              </TableCell>
              <TableCell style={{ width: 80 }} >
                {row.post_status}
              </TableCell>
              <TableCell style={{ width: 80 }} >

                <Typography paragraph style={{cursor:"pointer", textDecoration:"underline",color:"blue"}}
                onClick = {()=>{onEditCategory(row.id,row.post_status)}}
                >  {row.post_status === "draft" ? "Activate" : "Deactivate"}  </Typography>

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
              count={fullPostList.length}
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
  );
}



