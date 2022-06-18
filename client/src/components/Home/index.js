import * as React from 'react';
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { FormControl, Radio, RadioGroup, FormControlLabel,FormLabel  } from '@mui/material';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';
import { textAlign } from '@mui/system';


const serverURL = "http://ov-research-4.uwaterloo.ca:3105";

const opacityValue = 0.9;

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#dcedc8',
        darker: '#9aa58c',
        backgroundColor: '#f0f4c3',
        textAlign:'center'
      },
      neutral: {
        main: '#81c784',
        contrastText: '#5a8b5c',
      },
    },
});

const Design = styled(Paper)(({ theme }) => ({
  color: 'darkslategray',
  backgroundColor: '#fff',
  padding: 8,
  borderRadius: 4,
  textAlign: 'center',
}));
const ReviewPaper = styled(Paper)(({ theme }) => ({
  color: 'darkslategray',
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
        console.log("loadUserSettings parsed: ", parsed[0])
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

  
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const handleMovieSelect = (event) => {
    setSelectedMovie(event.target.value);
  };

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
    if(selectedMovie == '') {
      setV0("Please select the movie");
      setV4('');
    }
    else{
      setV0('');
    }
    
    if(enteredTitle == '') {
      setV1("Please enter the title");
      setV4('');
    }
    else{
      setV1('');
    }

    if(enteredReview == '') {
      setV2("Please write the review");
      setV4('');
    } 
    else{
      setV2('');
    }

    if(selectedRating == '') {
      setV3("Please select the rating");
      setV4('');
    } 
    else{
      setV3('');
    }
    
    if(selectedMovie!=''&& enteredTitle != '' && enteredReview != '' && selectedRating != '') {
      setV4("Your review has been received");
      const reviewID = reviewData.length+1;
      const newList = reviewData.concat({selectedMovie, enteredTitle,enteredReview, selectedRating, reviewID });
      setReviewData(newList);
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

  

  const List = () => {
    return (
      <>
      <hr/>
      <ReviewPaper>
        <Typography variant="h6" gutterBottom component="div">
          Reviews
        </Typography>
      </ReviewPaper>
        

        {reviewData.map((item, index) => {
          return (
            <ReviewPaper>
              <Typography variant="h5" gutterTop component="div">
                Movie Name:{item.selectedMovie}
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
        
            </ReviewPaper>
          );
        })}
      </>
  
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
            />
            {v0}
          </Design>
        </Grid>

        <Grid item xs={8}>
          <Design>
          <ReviewTitle
              onReviewTitleChange={handleTitle}
              enteredTitle={enteredTitle}
            />
            {v1}
          </Design>
        </Grid>
        
        <Grid item xs={8}>
          <Design>

            <ReviewBody
              onReviewBodyChange={handleReview}
              enteredReview={enteredReview}
            />
            {v2}
          </Design>
        </Grid>

        <Grid item xs={8}>
          <Design>
            <ReviewRating
              selectedRating= {selectedRating}
              onRatingChange = {handleRating}
            />
            {v3}
          </Design>
        </Grid>


        <Grid item xs={8}>
          <Design>
          <Button variant="contained" 
              onClick= {(event)=> onButtonClick(event)}>
                Submit
          </Button>
          </Design>
          <Design>
            {v4}
          </Design>
        </Grid>

        <Grid item xs={8}>
          {reviewData.length !=0 &&<List />}
        </Grid>
        
      </div>

    </ThemeProvider>

  );
}


const ReviewTitle= ({enteredTitle,onReviewTitleChange}) => {
  return(
    <div>
      <Typography variant="h5" gutterBottom component="div">
        Enter a title for the review
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
          Write a review
      </Typography>

      <TextField 
      id="standard-basic" 
      label="Review"
      multiline
      inputProps={{
        maxlength: CHARACTER_LIMIT
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





const MovieSelection = ({onMovieChange,selectedMovie }) =>{
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
                <MenuItem value={"Avengers: Endgame"}>Avengers: Endgame</MenuItem>
                <MenuItem value={"Spider-Man: Far from Home"}>Spider-Man: Far from Home</MenuItem>
                <MenuItem value={"Black Widow"}>Black Widow</MenuItem>
                <MenuItem value={"Doctor Strange"}>Doctor Strange</MenuItem>
                <MenuItem value={"Iron Man"}>Iron Man</MenuItem>
          </Select> 
        </FormControl>
      </Box>
      
           {/*
      <Typography variant="h7" gutterBottom component="div">
        {"selected movie: "+selectedMovie}
  </Typography>*/}
      

    </div>
  )
}



const ReviewRating = ({selectedRating, onRatingChange})=>{

  return(
    <div>
      <Typography variant="h5" gutterBottom component="div">
          Select the rating
      </Typography>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={selectedRating}
          onChange={onRatingChange}>

            <FormControlLabel value ='1' control={<Radio />} label="1" labelPlacement="top" />
            <FormControlLabel value ='2' control={<Radio />} label="2" labelPlacement="top" />
            <FormControlLabel value ='3'control={<Radio />} label="3" labelPlacement="top"/>
            <FormControlLabel value ='4'control={<Radio />} label="4" labelPlacement="top"/>
            <FormControlLabel value ='5'control={<Radio />} label="5" labelPlacement="top" />

        </RadioGroup>
      </FormControl> 

      {/*

      <Typography variant="h7" gutterBottom component="div">
      {"selected rate: "+selectedRating}
  </Typography>*/}
    </div>
  )
}
export default Review;