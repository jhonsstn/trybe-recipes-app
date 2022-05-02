import React, { useState, useEffect, useContext } from 'react';
import fetchData from '../services/apiHelper';

import CategoryButton from './CategoryButton';
import { Context } from '../context/AppContext';

function Categories() {
  const [categories, setCategories] = useState([]);
  const { setMeals, setDrinks } = useContext(Context);

  const { pathname } = window.location;

  useEffect(() => {
    const URL = `https://www.${
      pathname === '/foods' ? 'themealdb' : 'thecocktaildb'
    }.com/api/json/v1/1/list.php?c=list`;

    const key = pathname === '/foods' ? 'meals' : 'drinks';

    fetch(URL)
      .then((response) => response.json())
      .then((data) => setCategories(data[key]));
  }, [pathname]);

  const allCategories = async () => {
    await fetchData('name', '', pathname).then((data) => {
      if (pathname === '/foods') {
        setMeals(data);
      } else {
        setDrinks(data);
      }
    });
  };

  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => allCategories() }
      >
        All
      </button>

      {categories
        && categories.map(({ strCategory }, index) => {
          const FOUR = 4;
          if (index <= FOUR) {
            return (
              <CategoryButton key={ strCategory } strCategory={ strCategory } />
            );
          }
          return null;
        })}
    </div>
  );
}

export default Categories;
