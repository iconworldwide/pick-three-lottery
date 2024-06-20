import React from 'react';
import styled from 'styled-components';
import { ItemType } from '../models/tyles';

const ItemContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  text-align: center;
  background-color: #ccc;
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ItemTitle = styled.h3`
  margin: 10px 0;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const PurchaseButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

interface ItemProps {
  item: ItemType;
  onPurchase: (itemId: string) => void;
}

const Collectible: React.FC<ItemProps> = ({ item, onPurchase }) => {
  const { image, title, description, bossLevel, price, timeRemaining, owned, passed } = item;

  return (
    <ItemContainer>
      <ItemImage src={image} alt={title} />
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
      <ItemDetails>
        <div>Boss Level: {bossLevel}</div>
        <div>Price: {price}</div>
      </ItemDetails>
      <ItemDetails>
        <div>Time Remaining: {timeRemaining}s</div>
      </ItemDetails>
      <PurchaseButton onClick={() => onPurchase(item.id)} disabled={owned || passed}>
        {owned ? 'Owned' : passed ? 'Passed' : 'Buy'}
      </PurchaseButton>
    </ItemContainer>
  );
};

export default Collectible;
