import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from '@material-ui/core';
import { createTheme, styled, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3105";

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

const MyPage = () => {
    const classes = useStyles()
    const [genreList, setGenreList] = React.useState([]);
    const [selectedGenre, setSelectedGenre] = React.useState('');
    const handleGenreSelect = (event) => {
      setSelectedGenre(event.target.value);
    };
    const [sameGenreList, setSameGenreList] = React.useState([]);

    React.useEffect(() => {  
      getGenres();
    }, []);



    const getGenres = ( ) => {
      callApiGetGenres()
        .then(res => {
          console.log("callApiGetGenres returned: ", res)
          var parsed = JSON.parse(res.express);
          console.log("callApiGetGenres parsed: ", parsed);
          setGenreList(parsed);
        })
    }

    const callApiGetGenres = async () => {
      const url = serverURL + "/api/getGenres";
      console.log(url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("User settings: ", body);
      return body;
    }



    const onSelectClick = () => {
      setSameGenreList([])
      getSameGenreMovies(); 
    }

    const getSameGenreMovies = ( ) => {
      callGetSameGenreMovies(  )
        .then(res => {
          console.log("callGetSameGenreMovies returned: ", res)
          var parsed = JSON.parse(res.express);
          console.log("callGetSameGenreMovies parsed: ", parsed);
          setSameGenreList(parsed)
        })
    }
  
    const callGetSameGenreMovies = async ( ) => {
      const url = serverURL + "/api/getSameGenreMovies";
      console.log(url);
      console.log( "api search for movies with genre");
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          selectedGenre: selectedGenre,
        })
      });
  
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("complete: ", body);
      return body;
    }
    

    

  return (

      <div>
        <ThemeProvider theme={theme}>

        <AppBar color = "primary" elevation={0.0}   >
          <Toolbar>
            <Box sx={{ p: 3, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', width: '80%'}}>
              <Typography variant="h5" color="inherit" component="div"  >
                Genre
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
                onClick={() => history.push('/search')}
                >
                <Typography variant="h6" color="inherit" component="div" >
                  Search
                </Typography>
              </Link>
            </Box>            
          </Toolbar>
        </AppBar>
        </ThemeProvider>
        


        <div className={classes.toolbar}></div>
        <p></p>

        <GenreSelction
            onGenreChange={handleGenreSelect}
            selectedGenre={selectedGenre}
            genres={genreList}
            sameGenreList={sameGenreList}
            onSelectClick={onSelectClick}
            />


        {/*genreList.length !==0 &&<List list={genreList} />  */}
         


      </div>

  );
}

const GenreSelction = ({genres,onGenreChange,selectedGenre, sameGenreList, onSelectClick }) =>{
  return(
    <div>
      <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '1%',
          display: 'inline-block',
          p: 1,
          mx: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',

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
          //textAlign: 'center',

        }}
      >
      

      <Typography variant="h5" gutterBottom component="div">
          Select a Genre which you want to watch
      </Typography>

      <Box >
        <FormControl sx={{ m: 1 }}>
          <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedGenre}
              onChange={onGenreChange}
              autoWidth
              label = "Genre">
                {genres.map(a => {
              return(
                <MenuItem key={a.genres} value={a.genres}>
                  {a.genres}
                </MenuItem>
              )})}
              console.log(sameList)
          </Select> 

          <Typography variant="h6" gutterBottom component="div">
          {"selected genre:"+ selectedGenre}
         </Typography>

          

          <p></p>
          <Button variant="outlined" width= "100%" onClick= {(event)=> onSelectClick(event)}>
            Seacrh Movie
          </Button>
          <p></p>

          only movie "Alien" is able to connect other webpage 'can use button' // genre: "sci-fi" 
          if you click other movie's webpage button, then error  


          { sameGenreList.length !==0 &&  <List list={sameGenreList} /> }

        </FormControl>
      </Box>

      

        </Box>
      </Box>
    </div>
  )
}

const List = ({ list}) => {

  return (
    <>
      {list.map((item, index) => {
        return (
          <Item 
            key={index}
            item={item}
            index={index}
          />
        );
      })}
    </>

  )
}


const Item = ({ item,  index }) => {

  const mName =  item.name


  const url = []
  const finalURL = ''

  const getURL = (url, finalURL ) => {
    callGetURL(  )
      .then(res => {
        console.log("callGetURL returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callGetURL parsed: ", parsed);
        if(parsed !== []){
        url = parsed
        console.log("url",url)
        finalURL = url[0].url
        console.log(finalURL)

        window.location.href = finalURL;}
  

        //url = .url


      })
  }

  const callGetURL = async ( ) => {
    const url = serverURL + "/api/getURL";
    console.log(url);
    console.log( "api search for movieurl");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        mName : mName
      })

    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("complete: ", body);
    return body;
  }

  const onWebClick = () => {
    getURL();

  }




 // href={url}

  return (

  <div>
    <p></p>
      <hr></hr>
      <Typography variant="h5" gutterBottom component="div">
        Movie Name: { item.name}
      </Typography>

      <Typography variant="h6" gutterBottom component="div">
        Year: {item.year}
      </Typography>

      <Typography variant="h6" gutterBottom component="div">
        Director: {item.director}
      </Typography>

      <Button size="medium" variant="outlined" onClick= {(event)=> onWebClick(event)}  >
           WebPage
      </Button>


  </div>

  )}




export default MyPage;