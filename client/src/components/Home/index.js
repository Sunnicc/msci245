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


const serverURL = "http://ov-research-4.uwaterloo.ca:31";

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

  constructor=(props)=> {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount= ()=> {
    //this.loadUserSettings();
  }


  loadUserSettings=()=> {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  const initialReviews = [ ];
  const [reviewData, setReviewData] = React.useState(initialReviews);

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
  
  const onButtonClick = () =>{
    if(enteredTitle == '') {
      alert("Please enter your review title")
    } else if (enteredReview == ''){
      alert("Please enter your review")
    } else if (selectedRating == ''){
      alert( "Please select the rating")
    } else{
      alert("Your review has been received");

      const reviewID = reviewData.length+1;
      const newList = reviewData.concat({selectedMovie, enteredTitle,enteredReview, selectedRating, reviewID });
      setReviewData(newList);
       
      
    }
  };

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