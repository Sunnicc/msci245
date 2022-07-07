import * as React from 'react';
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { FormControl, Radio, RadioGroup, FormControlLabel,FormLabel  } from '@mui/material';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';


//const serverURL = "http://ov-research-4.uwaterloo.ca:3105";
const serverURL = "";


const opacityValue = 0.9;

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#dcedc8',
        darker: '#9aa58c',
      },
      neutral: {
        main: '#81c784',
        contrastText: '#5a8b5c',
      },
    },
});



const Design = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  textAlign: 'center',
  color: theme.palette.text.primary,
  padding: 8,
}));

const MyPaper = styled(Paper)(({ theme }) => ({
    color: '#212121',
    backgroundColor: '#dcedc8',
    padding: 8,
    borderRadius: 4,
  }));

const Review = () => {

  const [userID,setUserID]= React.useState(1);
  const [mode,setMode]= React.useState(0);

  const loadUserSettings=(userID)=> {
    callApiLoadUserSettings(userID)
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed)
        setMode( parsed[0]);
      });
  }

  const callApiLoadUserSettings = async (userID) => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  const [reviewData, setReviewData] = React.useState([]);
  const [movies, setMovies] =  React.useState([]);

  React.useEffect(() => {  
    getMovies(); 
  }, []);

  const getMovies = () => {
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

  /*const getMovieTitle = (id, movies) => {
    for (let i=0; i<movies.length;i++){
      if(movies[i].id == id){
        return movies[i].name;
      }
    }
  }*/

  /*const getMovieTitle = (id, movies) => {
    {movies.map(movie => {
      if(movie.id == id)
      return(
        movie.name
      )})}
  }*/


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
  
  const reviewID = reviewData.length +1;
  
  
  const onButtonClick = () =>{
    if(enteredTitle == '') {
      alert("Please enter your review title")
    } else if (enteredReview == ''){
      alert("Please enter your review")
    } else if (selectedRating == ''){
      alert( "Please select the rating")
    } else{
      alert("Your review has been received");

      
      const newList = reviewData.concat({selectedMovie, enteredTitle,enteredReview, selectedRating, reviewID });
      setReviewData(newList);

      addReview();

      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');       
      
    }
  };

  //reviewID, userID, selectedMovie, enteredTitle, enteredReview, selectedRating

 const addReview = () => {
    callApiAddReview()
      .then(res => {
        console.log("callApiAddReview returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiAddReview parsed: ", parsed[0]);
      })
  }

  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        reviewID: reviewID,
        userID: userID,
        selectedMovie: selectedMovie,
        enteredTitle: enteredTitle,
        enteredReview: enteredReview,
        selectedRating: selectedRating,
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }



  const List = ({ list}) => {
    return (
      <>
        {list.map((item, index) => {
          return (
            <Item
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
        <Typography variant="h5" gutterTop component="div">
          Movie Name:{ item.selectedMovie}
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
    <ThemeProvider theme={theme.primary}>
      <div>

        <Grid item xs={8}>
          <Design>
            <Typography variant="h3" gutterBottom component="div">
            Review a movie
            </Typography>
          </Design>
        </Grid>

        <Grid item xs={8}>
          <Design>

            <MovieSelection
            onMovieChange={handleMovieSelect}
            selectedMovie={selectedMovie}
            movies={movies}
            />

          </Design>
        </Grid>

        <Grid item xs={8}>
          <Design>

          <ReviewTitle
              onReviewTitleChange={handleTitle}
              enteredTitle={enteredTitle}
            />
            
          </Design>
        </Grid>
        
        <Grid item xs={8}>
          <Design>

            <ReviewBody
              onReviewBodyChange={handleReview}
              enteredReview={enteredReview}
            />

          </Design>
        </Grid>

        <Grid item xs={8}>
          <Design>


            <ReviewRating
              selectedRating= {selectedRating}
              onRatingChange = {handleRating}
            />

          </Design>
        </Grid>


        <Grid item xs={8}>
          
          <Design>
    

          <Button variant="contained" color= "#dcedc8"
              onClick= {(event)=> onButtonClick(event)}>
                Submit
          </Button>

          </Design>
        </Grid>


        {reviewData.length !=0 &&<List list={reviewData} />}


      </div>

    </ThemeProvider>
  );
}

const MovieSelection = ({movies,onMovieChange,selectedMovie }) =>{

  
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
      
          
     <Typography variant="h6" gutterBottom component="div">
        {"selected movie: "+selectedMovie}
      </Typography>
      

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

            <FormControlLabel value = {1} control={<Radio />} label="1" labelPlacement="top" />
            <FormControlLabel value = {2} control={<Radio />} label="2" labelPlacement="top" />
            <FormControlLabel value = {3} control={<Radio />} label="3" labelPlacement="top"/>
            <FormControlLabel value = {4} control={<Radio />} label="4" labelPlacement="top"/>
            <FormControlLabel value = {5} control={<Radio />} label="5" labelPlacement="top" />

        </RadioGroup>
      </FormControl> 
    

      {/*<Typography variant="h6" gutterBottom component="div">
      {"selected rate: "+selectedRating.getClass().getName()}
  </Typography>*/}
    </div>
  )
}
export default Review;