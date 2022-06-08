import * as React from 'react';

const App = () => {
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

    return (
        <div>
            <h1>
                React Lecture 3_2
            </h1>

            <Search />

            <hr />

            <List list={textbooks} />

        </div>
    );
}

const Search = () => {
  let searchTerm = '';

  const handleChange = (event) => {
      searchTerm = event.target.value;
  };

  return (
      <div>
          <label htmlFor="search">Search: </label>
          <input
              id="search"
              type="text"
              onChange={handleChange}
          />
          <p>

              Searching for <strong>{searchTerm}</strong>.

          </p>
      </div>
  );
};


const List = (props) => {
    return (
        <ul>
            {props.list.map((item) => {
                return (
                    <Item item={item} />
                );
            })}
        </ul>

    )
}

const Item = (props) => {
    return (
        <li>
            <span>
                <a href={props.item.url}>{props.item.url}</a>
            </span>
            <span> {props.item.title}</span>
            <span>{" by " + props.item.author}</span>
        </li>
    )
}


export default App;