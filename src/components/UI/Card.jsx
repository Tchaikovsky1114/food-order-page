import styled from "@emotion/styled";

import React from 'react';

const MealCard = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: #fff;
`

const Card = ({children}) => {
  return (
    <MealCard>
      {children}
    </MealCard>
  );
};

export default Card;