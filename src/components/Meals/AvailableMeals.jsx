import styled from '@emotion/styled';
import React from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: '초밥',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: '바베큐 버거',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: '그린 샐러드',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const Meals = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: meals-appear 1s ease-out forwards;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  @keyframes meals-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <Meals>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </Meals>
  );
};

export default AvailableMeals;
