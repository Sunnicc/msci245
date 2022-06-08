import * as React from 'react';

const textbooks = [
  {
    title: 'The Road to React',
    url: 'https://www.roadtoreact.com/',
    author: 'Wieruch, R.',
    year: "2021",
  }, {
    title: 'Learning Node.js',
    url: 'https://github.com/marcwan/LearningNodeJS',
    author: 'Wandschneider, Marc',
    year: "2017",
  },
];



const App = () => {

  return (
    <div>
      <h1>
        React Lecture 3_2
      </h1>

      <Search />

      <hr />

      <List />

    </div>
  );
}

const Search = () => {

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text" onChange={handleChange}
      />

    </div>
  );
};


const List = () => {
  return (
    <ul>
      {textbooks.map((item) => {
        return (
          <li>
            <span>
              <a href={item.url}>{item.url}</a>
            </span>
            <span> {item.title}</span>
            <span>{" by " + item.author}</span>
          </li>);
      })}
    </ul>

  )
}


export default App;