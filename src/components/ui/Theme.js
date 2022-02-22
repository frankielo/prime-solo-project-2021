import { createTheme } from '@mui/material/styles';


const arcBlue = "#F8F9FA"
const arcOrange = "#FFBA60"
const arcGrey = "#212529"

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
        "fontFamily": "'Montserrat', sans-serif",
      tab:{
      fontFamily:"'Montserrat', sans-serif",
      textTransform:"none",
      fontWeight:700,
      
    },
    estimate:{
        fontFamily:"'Montserrat', sans-serif",
        fontSize:"1rem",
        textTransform:"none",
        color:"white"
    },
    h2:{
        fontFamily: "'Montserrat', sans-serif",
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
        fontFamily: "'Montserrat', sans-serif",
        fontWeight:500,
        color:"white"     
    },
    body1:{
        fontSize:"1.25rem",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight:400,
        color:"#212529"
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
components: {
MuiButton: {
    variants: [
      {
        props: { variant: 'contained' },
        style: {
          backgroundColor: "#1C7ED6",
          color:"white"
        },
      }
    ],
  },
  MuiTextField: {
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
            borderColor: `black !important`,
            borderWidth: '0.1px'
        },
      }
    ],
  },
  MuiInputLabel : {
    variants: [
        {
          props: { variant: 'outlined' },
          style: {
                color: 'black !important' 
          },
        }
      ]
  }
}
// overrides: {
//     MuiButton: {
//         root:{
//         color: 'blue'
//         }
//     },
//   }
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