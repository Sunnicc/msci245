import * as React from 'react';

const App = () => {

  const initialRecipes = [
    {
      title: 'Fruit salad',
      difficulty: '2',
      ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
      calories: "200",
      instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
      recipeID: 1,
    }, {
      title: 'Avocado wrap',
      difficulty: '3',
      ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
      calories: "400",
      instructions: "Wash all fruits and vegetables. Slice avocados and apples. Mix all ingredients and wrap them in a tortilla bread.",
      recipeID: 2
    },
  ];

  const [selectedRecipesList, setSelectedRecipesList] = React.useState([]);
  const [recipes, setRecipes] = React.useState(initialRecipes);
  const [editedItem, setEditedItem] = React.useState('');

  const handleToggleIngredients = (item) => {
    if (selectedRecipesList.includes(item.recipeID)) {
      var index = selectedRecipesList.indexOf(item.recipeID);
      var selectedRecipesListCopy = [...selectedRecipesList];
      selectedRecipesListCopy.splice(index, 1);
      setSelectedRecipesList(selectedRecipesListCopy);
      console.log('selectedRecipesList: ', selectedRecipesList);

    } else {
      var selectedRecipesListCopy = [...selectedRecipesList];
      selectedRecipesListCopy.push(item.recipeID);
      setSelectedRecipesList(selectedRecipesListCopy);
      console.log('selectedRecipesList: ', selectedRecipesList);
      //setSelectedRecipe(item.recipeID);
    }
  }

  const handleEditInstructions = (item) => {
    setEditedItem(item.recipeID);
  }

  const handleUpdateInstructions = (index, instructions) => {
    console.log("ID: ", index);
    var recipesCopy = recipes;
    recipesCopy[index].instructions = instructions;
    setRecipes(recipesCopy);
    setEditedItem('');
  }



  return (
    <div>
      <h1>
        Recipe finder
      </h1>


      <List
        list={recipes}
        selectedRecipesList={selectedRecipesList}
        onToggleIngredients={handleToggleIngredients}
        onEditInstructions={handleEditInstructions}
        onUpdateInstructions={handleUpdateInstructions}
        editedItem={editedItem}
      />

    </div>
  );
}



const List = ({ list, selectedRecipesList, onToggleIngredients, onEditInstructions, onUpdateInstructions, editedItem }) => {
  return (
    <ul>
      {list.map((item, index) => {
        return (
          <Item
            item={item}
            index={index}
            selectedRecipesList={selectedRecipesList}
            onToggleIngredients={onToggleIngredients}
            onEditInstructions={onEditInstructions}
            onUpdateInstructions={onUpdateInstructions}
            editedItem={editedItem}
          />
        );
      })}
    </ul>

  )
}

const Item = ({ item, selectedRecipesList, onToggleIngredients, onEditInstructions, onUpdateInstructions, editedItem, index }) => {
  const [instructions, setInstructions] = React.useState(item.instructions);

  const onChangeInstructions = (event) => {
    setInstructions(event.target.value);
    //console.log(instructions);
  }

  const onApplyChanges = () => {
    onUpdateInstructions(index, instructions);
  }

  return (
    <li>
      <p> {"Title: " + item.title}</p>
      <p> {"Difficulty: " + item.difficulty}</p>
      {selectedRecipesList.includes(item.recipeID) && (
        <>
          <p>Ingredients: </p>
          <ul>
            {item.ingredients.map((ingredient) => (<li>{ingredient}</li>))}
          </ul>

        </>
      )}

      <p>
        <Button
          item={item}
          label={selectedRecipesList.includes(item.recipeID) ? 'Hide ingredients' : 'Show ingredients'}
          onButtonClick={onToggleIngredients}
        />
      </p>

      <p>
        Instructions:
        {editedItem != item.recipeID ? (
          <>
            {item.instructions}
            <Button
              item={item}
              label={'Edit instruction'}
              onButtonClick={onEditInstructions}
            />
          </>
        ) : (
          <>
            <input id='edit' type='text' size='80' onChange={onChangeInstructions} value={instructions} />
            <Button
              item={item}
              label={'Save'}
              onButtonClick={onApplyChanges}
            />
          </>
        )}
      </p>
      <p>{"Calories: " + item.calories}</p>
    </li>
  )
}

const Button = ({ item, label, onButtonClick }) => (
  <button type="button" onClick={(event) => onButtonClick(item, event)}>
    {label}
  </button>
)


export default App;