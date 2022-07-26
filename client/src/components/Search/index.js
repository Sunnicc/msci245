import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, styled, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from '@material-ui/core';

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3105";
//const serverURL = ''


const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar,
    }
}

);

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      darker: '#053e85',
    },
  },
});



const Search = () => {
  const classes = useStyles()
    const [titleSearchTerm, setTitleSearchTerm] = React.useState('');
    const [actorSearchTerm, setActorSearchTerm] = React.useState('');
    const [directorSearchTerm, setDirectorSearchTerm] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleTitle = (event) => {
      setTitleSearchTerm(event.target.value);
    };
    const handleActor = (event) => {
      setActorSearchTerm(event.target.value);
    };
    const handleDirector = (event) => {
      setDirectorSearchTerm(event.target.value);
    };


    const [movieIDList, setMovieIDList] = React.useState([]); //get movie id that satisfy search conditions
    const [ID, setID] = React.useState(''); //separate ID 
    const [dataList, setDataList] = React.useState([]); //get data with movieID

    //force rendering
    const [,updateState]= React.useState();
    const forceUpdate = React.useCallback(()=> updateState({}), [])

    const [L, setL] = React.useState('');


    //1st process: get movie id
    const handleMovieSearch = (movieIDList,ID) => {

        callApiFindMovie()
          .then(res => {
            console.log("callApiFindMovie returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiFindMovie parsed: ", parsed[0])
            //setMovieIDList(parsed);
            
            movieIDList = parsed
            console.log("movie list", movieIDList);
            console.log('data length',movieIDList.length)
            if(movieIDList.length == 0){
              setMessage('Nothing is found')
            }
            getAnswer(movieIDList,ID);
            setL(movieIDList.length)            
          });
    }

    const callApiFindMovie = async () => {
    
        const url = serverURL + "/api/findMovie";
        console.log(url);
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
          },
          body: JSON.stringify({
            titleSearchTerm: titleSearchTerm,
            actorSearchTerm: actorSearchTerm,
            directorSearchTerm: directorSearchTerm
          })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Found movies: ", body);
        return body;
    }


    //2nd process
    const getAnswer = (movieIDList,ID) => {
      console.log(movieIDList)
        movieIDList.map(a => {
          ID = a.id;
          getData(dataList,ID);
        })
        console.log(ID)
    }
    //3rd process
    const getData = ( dataList,ID ) => {
          callApiGetData( ID)
            .then(res => {
              console.log("callApiGetData returned: ", res)
              var parsed = JSON.parse(res.express);
              console.log("callApiGetData parsed: ", parsed);
              dataList.push(parsed);
              console.log('get datas !!!!!!!!!!!')
              console.log(dataList);
              console.log('total length',dataList.length)              
              //setDataList(dataList)
              forceUpdate();
            })
        }
    
    const callApiGetData = async (ID) => {
      const url = serverURL + "/api/getData";
      console.log(url);
      console.log(ID)
    
      const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
              ID: ID,
            })
      });
    
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("User settings: ", body);
      return body;
    }



    const onButtonClick = () =>{

      if(titleSearchTerm!=='' || actorSearchTerm !== '' || directorSearchTerm !== ''){
        setMovieIDList([])
        handleMovieSearch(movieIDList,ID) 
      } else {setMessage('add at least one criteria')}
        //setDataList([]); 
        

        
    };

  return (

      <div>
         <ThemeProvider theme={theme}>

        <AppBar color = "primary"  elevation={0.0}   >
          <Toolbar>
            <Box sx={{ p: 3, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', width: '80%'}}>
              <Typography variant="h5" color="inherit" component="div"  >
                Searching page
              </Typography>
            </Box>
            <Box sx={{ p: 2, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', }}>
              <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => history.push('/')}
                >
                <Typography variant="h6" color="inherit" component="div" >
                  Landing
                </Typography>
              </Link>
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
        <div className={classes.toolbar}></div>
        <p></p>

        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              width: '1%',
              display: 'inline-block',
              p: 1,
              mx: 1,
              fontSize: '0.875rem',
              fontWeight: '700',
            }}
          >
          </Box>
        <Box
          sx={{
            width: '90%',
            display: 'inline-block',
            p: 1,
            mx: 1,
            fontSize: '0.875rem',
            fontWeight: '700',
            textAlign: 'center',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
            borderRadius: 2,
          }}
        >

          <SearchTitle
              label="Search by title"
              onTitleSearchChange={handleTitle}
              titleSearchTerm={titleSearchTerm}
          />

          <SearchActor
              label="Search by actor"
              onActorSearchChange={handleActor}
              actorSearchTerm={actorSearchTerm}
            />

          <SearchDirector
              label="Search by director"
              onDirectorSearchChange={handleDirector}
              directorSearchTerm={directorSearchTerm}
            />

          <p></p>

          <Box
            sx={{ 
              display: 'inline-block',
              p: 1,
              mx: 1,
              fontSize: '0.875rem',
              fontWeight: '700',
              textAlign:'center'
            }}
          >
            <Button variant="outlined" onClick= {(event)=> onButtonClick(event)}>
            Seacrh Movie
            </Button>

            <p></p>

            { dataList.length ==0 &&  message} 

            

            { dataList.length !==0 &&  <List list={dataList} L={L} /> }


          </Box>
        </Box>
      </Box>
    </div>
  );
}

const SearchTitle= ({titleSearchTerm,onTitleSearchChange}) => {
    return(
      <div>
        <TextField 
        id="standard-basic" 
        label="Title"
        value={titleSearchTerm}
        onChange={onTitleSearchChange} />  
      </div>
    )
  }
  const SearchActor= ({actorSearchTerm,onActorSearchChange}) => {
    return(
      <div>
        <TextField 
        id="standard-basic" 
        label="Actor"
        value={actorSearchTerm}
        onChange={onActorSearchChange} />  
      </div>
    )
  }
  const SearchDirector= ({directorSearchTerm,onDirectorSearchChange}) => {
    return(
      <div>
        <TextField 
        id="standard-basic" 
        label="Director"
        value={directorSearchTerm}
        onChange={onDirectorSearchChange} />  
      </div>
    )
  }

  const List = ({ list, L}) => {
    return (
      <>
        {list.map((item, index) => {
          if( (list.length - L) <= index ) {
            return (
            <Item 
              key={index}
              item={item}
              index={index}
            />

          );
          }
        })}
      </>
  
    )
  }

  
  const Item = ({ item,  index, }) => { 
    return (
      <div>
      <p></p>
        <hr></hr>
        <Typography variant="h5" gutterBottom component="div">
          Movie Name: { item[0].name}
        </Typography>
  
        <Typography variant="h6" gutterBottom component="div">
          Director: {item[0].director}
        </Typography>
  
        <Typography variant="h6" gutterBottom component="div">
          Score: {item[0].scoring}
        </Typography>

        <Typography variant="h6" gutterBottom component="div">
          Reviews: {item[0].Reviews}
        </Typography>

    </div>
    )}

export default Search;