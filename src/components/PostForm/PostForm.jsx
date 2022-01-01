import React,{useState,useRef,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Input from '@mui/material/Input';
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save';

const useStyles = makeStyles({
    mainContainer:{
        marginTop : "3rem"
    }
  });

  const getStyles = (name, selectedCat, theme) => {
    return {
      fontWeight:
        selectedCat.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const PostForm = () => {

    const classes = useStyles()
    const theme = useTheme();
    const dispatch = useDispatch()

    
    const editValues = useSelector(state => state.post.editPost)
    const categoryList = useSelector(state => state.category.setCategories)

    const [title, setTitle] = useState(editValues.post_title ||  "")
    const [content, setContent] = useState(editValues.post_content || "")
    const [postImage, setpostImage] = useState("")
    const [selectedCat, setselectedCat] = useState(editValues.categoryidlist || []);
    const [editImage, setEditImage] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const inputElement = useRef();
    
    let history = useHistory();

    const clearForm = ()=>{
      setTitle("")
      setContent("")
      setpostImage("")
      setselectedCat([])
      inputElement.current.value = null
    }

    const onEditImage = (id) => {
      const data = new FormData()

      data.append('image', postImage)

      axios.put(`/api/posts/image/${id}`,data).then((res)=>
      {
        setImageUrl(res.data)
        setEditImage(false)
      })
      .catch(err=>console.log(err))
    }


    useEffect(() => {
      
      return () => {
          dispatch({
            type: 'CLEAR_EDIT_VALUES'
          })
      }
    }, [])


    const onSubmitHandler = () => {
        const data = new FormData()
        data.append('title', title)
        data.append('content', content)
        data.append('image', postImage)
        data.append('catId', selectedCat)


        axios.post("/api/posts",data).then((res)=>
        {console.log(res.data)
          dispatch({
            type : 'FETCH_POST'
          })

          history.push("/manageposts");
        })
        .catch(err=>console.log(err))
    }


    const onEditSubmitHandler = (id) => {
      const data = {title,content,catId:selectedCat}
      axios.put(`/api/posts/user/${id}`,data).then((res)=>
      {console.log(res.data,"from edit post handler")

      
        dispatch({
          type : 'FETCH_POST'
        })
        history.push("/manageposts");
      })
      .catch(err=>console.log(err))
  }



    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setselectedCat(
          typeof value === 'string' ? value.split(',') : value,
        );
      };



    const names = [
        1,2,3,4,5,6,7
    ];

    return (
        <>
        <Grid container direction="column" spacing={4} alignContent="center" className = {classes.mainContainer}>
            <Grid item>
                <TextField
                required
                id="outlined-required"
                label="Title"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
            </Grid>
            <Grid item>
            <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Select Category</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedCat}
                onChange={handleChange}
                input={<OutlinedInput label="Select Category" />}
                MenuProps={MenuProps}
             >
                {categoryList.map((category) => (
                    <MenuItem
                    key={category.id}
                    value={category.id}
                    style={getStyles(category.cat_title, selectedCat, theme)}
                    >
                    {category.cat_title}
                    </MenuItem>
                ))}
        </Select>
        </FormControl>
            </Grid>
            { editValues.post_image_url && !editImage ?
            <Grid item container direction="row" style={{width:"50%"}}>
            <Grid item>
                <img src={imageUrl || editValues.post_image_url} alt={editValues.title} width="80" />
            </Grid>
            <Grid item>
              <IconButton onClick={()=>setEditImage(true)}>
                  <EditIcon />
              </IconButton>
            </Grid>
            </Grid> : null
            }
             <Grid container item style={{width:"50%"}}>
            { !editValues.post_image_url || editImage ?
             

              <Grid item>
                <input type="file" required
                ref={inputElement}
                onChange={(e)=>{setpostImage(e.target.files[0])}}
                />
              </Grid>
              : null
            }
            {editImage && postImage ?
              <Grid item>
              <IconButton onClick={()=>onEditImage(editValues.id)}>
                  <SaveIcon />
              </IconButton>
              </Grid> : null 
            }
              </Grid>
            

        <Grid item style={{minWidth:"50%"}}>
            <TextField
            id="outlined-multiline-flexible"
            label="Content"
            required
            multiline
            minRows={10}
            fullWidth
            value={content}
            onChange={(e)=>{setContent(e.target.value)}}
            />
        </Grid>
        
        {editValues.post_title ? 

        <Grid container item style={{maxWidth:"50%"}} spacing={2}>
        <Grid item>
            <Button onClick={()=>onEditSubmitHandler(editValues.id)} variant="contained">Edit And Save</Button>
        </Grid>
        <Grid item>
            <Button  component={Link} to={'/manageposts'} variant="contained">Cancel</Button>
        </Grid>
        </Grid>

          : 
        <Grid container item style={{maxWidth:"50%"}} spacing={2}>
        <Grid item>
            <Button onClick={onSubmitHandler} variant="contained">Submit</Button>
        </Grid>
        <Grid item>
            <Button onClick={()=>clearForm()} variant="contained">Clear</Button>
        </Grid>
        </Grid>
      }


        </Grid>
        </>
    )
}

export default PostForm