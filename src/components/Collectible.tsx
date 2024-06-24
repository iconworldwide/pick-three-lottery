import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserCards } from '../context/UserContext'; 
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { Timestamp } from '@firebase/firestore-types';

const ItemContainer = styled.div`  
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 16px;
  text-align: center;
  background-color: #ccc;
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

`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin: 4px 0;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  margin-left: 10px;
  margin-right: 10px;
`;

const PurchaseButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  width: 260px;

  &:disabled {
    background-color: #ccc;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

interface CollectibleProps {
  item: UserCards;
  owned: boolean;
  onPurchase: (item: UserCards) => void;
}

const Collectible: React.FC<CollectibleProps> = ({ item, owned, onPurchase }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const storage = getStorage();
  const { title, description, requiredLevel, price, passed } = item;


  const fireBaseTime = new Date(
    item.endDate.seconds * 1000 + item.endDate.nanoseconds / 1000000,
  ).toLocaleString();

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getDownloadURL(ref(storage, item.imageUrl));
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL: ", error);
      }
    };

    fetchImageUrl();
  }, [item.imageUrl, storage]);

  return (
    <ItemContainer>
      {imageUrl && <ItemImage src={imageUrl} alt={title} />}
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
      {owned && (
        <div>
          <ItemDetails>
            <div>Boss Level: <b>{requiredLevel}</b></div>
            <div>Price: <b>G$ {price.toLocaleString('en-us', { minimumFractionDigits: 0 })}</b></div>
          </ItemDetails>
          <ItemDetails>
            <div>End Sale Date: <b>{fireBaseTime}</b></div>
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
