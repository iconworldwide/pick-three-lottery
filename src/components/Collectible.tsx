import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserCards } from '../context/UserContext'; 

const ItemContainer = styled.div`  
  border: 1px solid #e9c46a;
  border-radius: 8px;
  margin: 16px;
  text-align: center;
  background-color: #222;
  font-family: 'Sora', sans-serif;
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ItemTitle = styled.h3`
  margin: 4px 0;
  font-size: 22px;
  color: #e9c46a;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #e9c43c;
  margin: 4px 0;
  padding-left: 4px;
  padding-right: 4px;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  margin-left: 10px;
  margin-right: 10px;
  color: #e9c46a;
`;

const PurchaseButton = styled.button`
  padding: 10px 20px;
  background-color: #e9c46a;
  font-family: 'Sora', sans-serif;
  font-size: 24px;
  color: #222;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  margin-bottom: 8px;
  width: 260px;

  &:disabled {
    background-color: #ccc;
  }

  &:active { 
    border-style: outset;
  }
`;

interface CollectibleProps {
  item: UserCards;
  owned: boolean;
  onPurchase: (item: UserCards) => void;
}

const Collectible: React.FC<CollectibleProps> = ({ item, owned, onPurchase }) => {
  const { title, description, requiredLevel, price, passed } = item;
  
  return (
    <ItemContainer>
      <div className='image-container'>
        <ItemImage className='shimmer-effect' src={item.imageUrl} alt={title} />
        <div className="shimmer-overlay"></div>
      </div>
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
      {owned && (
        <div className='collection-item-container'>
          <ItemDetails>
            <div>Boss Level: <b>{requiredLevel}</b></div>
            <div>Price: <b>G$ {price.toLocaleString('en-us', { minimumFractionDigits: 0 })}</b></div>
          </ItemDetails>
          <PurchaseButton onClick={() => onPurchase(item)} disabled={passed}>
            {passed ? 'Passed' : 'Buy'}
          </PurchaseButton>
        </div>
      )}
    </ItemContainer>
  );
};

export default Collectible;
