import { createTheme } from '@mui/material/styles';


const arcBlue = "#33a137"
const arcOrange = "#FFBA60"
const arcGrey = "#868686"

export default createTheme({
    palette:{
        common:{
            blue:arcBlue,
            orange:arcOrange
        },
        primary:{
            main:arcBlue
        },
        secondary:{
            main:arcOrange
        }
    },
    typography:{
      tab:{
      fontFamily:"Raleway",
      textTransform:"none",
      fontWeight:700,
      
    },
    estimate:{
        fontFamily:"Pacifico",
        fontSize:"1rem",
        textTransform:"none",
        color:"white"
    },
    h2:{
        fontFamily: "Raleway",
        fontWeight:700,
        fontSize:"2.5rem",
        color:arcBlue,
        lineHeight:1.5
    },
    h3:{
        fontFamily: "'Montserrat', sans-serif",
        fontSize:"2.5rem",
        color:arcBlue,
    },
    h4:{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight:600,
        fontSize:"1.75rem",
        color:arcBlue,
        lineHeight:1.5
    },
    h5:{
        fontWeight:400,
        fontFamily: "'Montserrat', sans-serif",
        fontSize:"1.75rem",
    },
    h6:{
        fontWeight:500,
        fontFamily: "'Montserrat', sans-serif"
    },
    subtitle1:{
        fontSize:"1.1rem",
        fontWeight:300,
        fontFamily: "'Montserrat', sans-serif"
    },
    subtitle2:{
        fontSize:"1.25rem",
        fontWeight:300,
        color:"white"     
    },
    body1:{
        fontSize:"1.25rem",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight:400
    },
    learnButton:{
        borderColor:arcBlue,
        color:arcBlue,
        borderWidth:2,
        textTransform:"none",
        borderRadius:50,
        fontFamily:"Roboto",
        fontWeight:"bold",
    },
    caption:{
        fontSize:"1rem",
        fontWeight:300,
        color:arcGrey
    }
},
// overrides: {
    // MuiInputLabel:{
    //     root:{
    //         color:arcBlue,
    //         fontSize:"1rem"
    //     }
    // },
    // MuiInput:{
    //     root:{
    //         color:arcGrey,
    //         fontWeight:300
    //     },
    //     underline:{
    //         "&:before" : {
    //             borderBottom : `2px solid ${arcBlue}`
    //         }
    //     },
    //     "&:hover:not($disabled):not($focused):not($error):before":{
    //         borderBottom : `2px solid ${arcBlue}`
    //     }
    // }

// }
})