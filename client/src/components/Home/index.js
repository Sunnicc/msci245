import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, styled } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, Radio, RadioGroup, FormControlLabel,FormLabel  } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


//const serverURL = "http://ov-research-4.uwaterloo.ca:3105";
const serverURL = "";
//const serverURL = "http://ec2-18-188-101-79.us-east-2.compute.amazonaws.com:3306";
const opacityValue = 0.9;


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


  //console.log('-------------------------------------');

  const [reviewData, setReviewData] = React.useState([]);

  console.log('-------------------------------------');


/*for (let i=0; i<Object.keys(reviewData).length; i++){
    return (
      console.log(reviewData[Object.keys(reviewData)[i]].ReviewTitle)
      );
  
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


  const [v0, setV0] = React.useState('');
  const [v1, setV1] = React.useState('');
  const [v2, setV2] = React.useState('');
  const [v3, setV3] = React.useState('');
  const [v4, setV4] = React.useState('');


  const onButtonClick = () =>{
    if(selectedMovie == '') {
      setV0("Please select the movie");
      setV4('');
    } else{ setV0(''); }
    
    if(enteredTitle == '') {
      setV1("Please enter the title");
      setV4('');
    }
    else{ setV1(''); }

    if(enteredReview == '') {
      setV2("Please write the review");
      setV4('');
    }  else{ setV2(''); }

    if(selectedRating == '') {
      setV3("Please select the rating");
      setV4('');
    } 
    else{ setV3(''); }

    if(selectedMovie!=''&& enteredTitle != '' && enteredReview != '' && selectedRating != '') {
      setV4("Your review has been received");

      const newList = reviewData.concat({selectedMovie, enteredTitle,enteredReview, selectedRating });
      setReviewData(newList);

      addReview();

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

        <Grid item xs={8}>
          <Design>
            <Typography variant="h3" gutterBottom component="div">
            Review a movie
            </Typography>
          </Design>
        </Grid>

        <Grid item xs={8} >
          <Design>

            <MovieSelection
            onMovieChange={handleMovieSelect}
            selectedMovie={selectedMovie}
            movies={movies}
            />


          </Design>
        </Grid>

        <Grid item xs={8} height="100%">
          <Design>
            {v0}
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

        <Grid item xs={8} height="100%">
          <Design>
            {v1}
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

        <Grid item xs={8} height="100%">
          <Design>
            {v2}
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

        <Grid item xs={8} height="100%">
          <Design>
            {v3}
          </Design>
        </Grid>


        <Grid item xs={8}> 
          <Design>
            <Button variant="outlined" onClick= {(event)=> onButtonClick(event)}>
                  Submit
            </Button>
          </Design>
        </Grid>

        <Grid item xs={8}>
          <Design>
          {v4}
          </Design>
        </Grid>

        {reviewData.length !=0 &&<List list={reviewData} />}

      </div>

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

     {/*<Typography variant="h6" gutterBottom component="div">
        {"selected movie: "+ selectedMovie}
      </Typography>*/}
      
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