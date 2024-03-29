import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, styled, ThemeProvider } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from '@material-ui/core';


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


//const serverURL = "http://ov-research-4.uwaterloo.ca:3105";
//const serverURL = "";
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3105";
//const opacityValue = 0.9;


const MyPaper = styled(Paper)(({ theme }) => ({
    color: '#212121',
    backgroundColor: '#dcedc8',
    padding: 8,
    borderRadius: 4,
  }));

const Reviews = () => {
  const classes = useStyles()

  const [userID,setUserID]= React.useState(1);
 
  const [movies, setMovies] =  React.useState([]);

  React.useEffect(() => {  
    getMovies(); 
  }, []);

  const getMovies = ( ) => {
      callApiGetMovies()
        .then(res => {
          console.log("callApiGetMovies returned: ", res)
          var parsed = JSON.parse(res.express);
          console.log("callApiGetMovies parsed: ", parsed);
          setMovies(parsed);
        })
    }

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
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


  const [selectedMovie, setSelectedMovie] = React.useState('');
  const handleMovieSelect = (event) => {
    setSelectedMovie(event.target.value);
  };


  const [reviewData, setReviewData] = React.useState([]);

  console.log('-------------------------------------');

  const [enteredTitle, setEnteredTitle] = React.useState('');
  const handleTitle = (event) => {
    setEnteredTitle(event.target.value);
  };

  const [enteredReview, setEnteredReview] = React.useState('');
  const handleReview = (event) => {
    setEnteredReview(event.target.value);
  };

  const [selectedRating, setSelectedRating] = React.useState('');
  const handleRating = (event) => {
    setSelectedRating(event.target.value);
  };


  const [v0, setV0] = React.useState('');
  const [v1, setV1] = React.useState('');
  const [v2, setV2] = React.useState('');
  const [v3, setV3] = React.useState('');
  const [v4, setV4] = React.useState('');


  const onButtonClick = () =>{
    if(selectedMovie === '') {
      setV0("Please select the movie"); 
      setV4('');
    } else{ setV0(''); }
    
    if(enteredTitle === '') {
      setV1("Please enter the title");
      setV4('');
    }     else{ setV1(''); }

    if(enteredReview === '') {
      setV2("Please write the review");
      setV4('');
    }  else{ setV2(''); }

    if(selectedRating === '') {
      setV3("Please select the rating");
      setV4('');
    } 
    else{ setV3(''); }

    if(selectedMovie!==''&& enteredTitle !== '' && enteredReview !== '' && selectedRating !== '') {
      setV4("Your review has been received");

      const newList = reviewData.concat({selectedMovie, enteredTitle,enteredReview, selectedRating });
      setReviewData(newList);
      

      addReview(  );

      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');
      setV0('');
      setV1('');
      setV2('');
      setV3('');       
      
    }
  };

 const addReview = (  ) => {
    callApiAddReview(  )
      .then(res => {
        console.log("callApiAddReview returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiAddReview parsed: ", parsed);
      })
  }

  const callApiAddReview = async ( ) => {
    const url = serverURL + "/api/addReview";
    console.log(url);
    console.log( "api add review section");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: userID,
        selectedMovie: selectedMovie,
        enteredTitle: enteredTitle,
        enteredReview: enteredReview,
        selectedRating: selectedRating,
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("complete: ", body);
    return body;
  }



  const getMovieName = (id) => {
    const movieList = [...movies];
    for (let i=0; i<Object.keys(movieList).length; i++){
      if(movieList[Object.keys(movieList)[i]].id === id){
        return (
          movieList[Object.keys(movieList)[i]].name
          );
      }
    }
  };

 
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
  
    return (
      <MyPaper>
        <Typography variant="h5" gutterBottom component="div">
          Movie Name:{ getMovieName(item.selectedMovie)}
        </Typography>
  
        <Typography variant="h6" gutterBottom component="div">
          Review Title: {item.enteredTitle}
        </Typography>
  
        <Typography variant="h6" gutterBottom component="div">
          Review: {item.enteredReview}
        </Typography>
  
        <Typography variant="h6" gutterBottom component="div">
          Rate: {item.selectedRating}
        </Typography>
  
  
      </MyPaper>
    )
  }



  return (

      <div>
        <ThemeProvider theme={theme}>
          <AppBar color = "primary"  elevation={0.0}  >
        
                <Toolbar>
                    <Box sx={{ p: 3, borderRadius: 2, fontSize: '0.875rem', fontWeight: '700', width: '80%'}}>
                        <Typography variant="h5" color="inherit" component="div"  >
                            Review page
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
            <div className={classes.toolbar}></div>
            <p></p>

        <Grid >
          <Box textAlign='center'>
          <Typography variant="h3" gutterBottom component="div">
            Review a movie
            </Typography>

            <p></p>
          
            <MovieSelection
            onMovieChange={handleMovieSelect}
            selectedMovie={selectedMovie}
            movies={movies}
            getMovieName={getMovieName}
            />
            {v0}

            <p></p>
          <ReviewTitle
              onReviewTitleChange={handleTitle}
              enteredTitle={enteredTitle}
            />            
            {v1}

            <p></p>
            <ReviewBody
              onReviewBodyChange={handleReview}
              enteredReview={enteredReview}
            />
            {v2}

            <p></p>
            <ReviewRating
              selectedRating= {selectedRating}
              onRatingChange = {handleRating}
            />
            {v3}

            <p></p>
            <Button variant="outlined" onClick= {(event)=> onButtonClick(event)}>
                  Submit
            </Button>
            <p></p>
            {v4}

          </Box>

      </Grid>
        <p></p>
        {reviewData.length !==0 &&<List list={reviewData} />}

      </div>

  );
}

const MovieSelection = ({movies,onMovieChange,selectedMovie, getMovieName }) =>{

  return(
    <div>
      <Typography variant="h5" gutterBottom component="div">
          Select a movie
      </Typography>

      <Box >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          
          <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedMovie}
              onChange={onMovieChange}
              autoWidth
              label = "Movie">
                {movies.map(movie => {
              return(
                <MenuItem key={movie.id} value={movie.id}>
                  {movie.name}
                </MenuItem>
              )})}
          </Select> 

        </FormControl>
      </Box>
        <p></p>
          Selected Movie: {getMovieName(selectedMovie)}

      
      
      
    </div>
  )
}




const ReviewTitle= ({enteredTitle,onReviewTitleChange}) => {
  return(
    <div>
      <Typography variant="h5" gutterBottom component="div">
          Write the title of review
      </Typography>

      <TextField 
      id="standard-basic" 
      label="Title"
      value={enteredTitle}
      onChange={onReviewTitleChange} />
      {/*
      {"Title: "+enteredTitle}
      */}

    </div>
  )
}

const ReviewBody= ({enteredReview,onReviewBodyChange}) => {

  const CHARACTER_LIMIT = 200;
  return(
    <div>
      <Typography variant="h5" gutterBottom component="div">
          Write the text of Review
      </Typography>

      <TextField 
      id="standard-basic" 
      label="Review"
      multiline
      inputProps={{
        maxLength: CHARACTER_LIMIT
      }}
      helperText={`${enteredReview.length}/${CHARACTER_LIMIT}`}
      value={enteredReview}
      onChange={onReviewBodyChange} />

      {/*

      {"Review: "+enteredReview}

    */}

    </div>
  )
}


const ReviewRating = ({selectedRating, onRatingChange})=>{

  return(
    <div>
      <Typography variant="h5" gutterBottom component="div">
          Select the rate for the movie
      </Typography>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={selectedRating}
          onChange={onRatingChange}>

            <FormControlLabel value = "1" control={<Radio />} label="1" labelPlacement="top" />
            <FormControlLabel value = "2" control={<Radio />} label="2" labelPlacement="top" />
            <FormControlLabel value = "3" control={<Radio />} label="3" labelPlacement="top"/>
            <FormControlLabel value = "4" control={<Radio />} label="4" labelPlacement="top"/>
            <FormControlLabel value = "5" control={<Radio />} label="5" labelPlacement="top" />

        </RadioGroup>
      </FormControl> 
    

      {/*<Typography variant="h6" gutterBottom component="div">
      {"selected rate: "+selectedRating.getClass().getName()}
  </Typography>*/}
    </div>
  )
}
export default Reviews;