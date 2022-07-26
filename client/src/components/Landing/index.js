import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core';
import { createTheme, styled, ThemeProvider } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar,
    }
}
)

const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
        darker: '#053e85',
        
      },
    },
  });

const Landing = () => {
    const classes = useStyles()

    return (
        <div>
            <ThemeProvider theme={theme}>
          <AppBar color = "primary" elevation={0.0}   >
                <Toolbar>
                    <Box sx={{ p: 3, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', width: '80%'}}>
                        <Typography variant="h5" color="inherit" component="div"  >
                            Landing page
                        </Typography>
                    </Box>

                    <Box sx={{ p: 2, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', }}>
                    <Link
                        color="inherit"
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/reviews')}
                        >
                            <Typography variant="h6" color="inherit" component="div" >
                                Review          
                            </Typography>
                        </Link>

                    </Box>

                    <Box sx={{ p: 2, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', }}>
                        <Link
                        color="inherit"
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/search')}
                        >
                        <Typography variant="h6" color="inherit" component="div" >
                            Search
                        </Typography>
                        </Link>
                    </Box>

                    <Box sx={{ p: 2, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', }}>
                        <Link
                        color="inherit"
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/myPage')}
                        >
                        <Typography variant="h6" color="inherit" component="div" >
                            Genre
                        </Typography>
                        </Link>
                    </Box>

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    
             <Box
                sx={{
                width: '100%',
                height: '100vh',
                overflow: "hidden",
                backgroundImage: `url(https://cdn.pixabay.com/photo/2017/08/11/00/52/m-ms-2629323_960_720.png)`,
                backgroundSize: "cover"}} >
    
                <Box
                    sx={{ height: '30%',
                    width: '100%',
                    p: 1,
                    my: 1,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    }}
                />
                <Box
                    
                    sx={{
                    width: '100%',
                    height: '20%',
                    p: 1,
                    my: 1,
                    color: '#ffffff',
                    //opacity: 0.5,
                    //backgroundColor: '#ffffff',
                    fontSize: '5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    }}
                >
                    If you're thinking about <br></br>
                    which movie to watch?
                </Box>




                <Box
                    sx={{
                    width: '100%',
                    height: '15%',
                    p: 1,
                    my: 1,
                    color: '#ffffff',
                    //opacity: 0.5,
                    fontSize: '2rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    }}
                >
                    <p>Search for movies or write reviews</p>
                    {/*Reviews are helpful to others*/}
                </Box>
            </Box>

    </div>        
    )
}

export default Landing;