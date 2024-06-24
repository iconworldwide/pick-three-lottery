import React, { useState, useEffect, useRef } from 'react';
import Collectible from '../components/Collectible';
import { useUserContext, UserCards } from '../context/UserContext';
import { db } from '../firebase';
import { collection, query, getDocs } from "firebase/firestore";
import usePreloadImages from '../hooks/usePreloadImages';
import SegmentedControl from '../components/SegmentedControl';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';

const Cards: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const [currentItems, setCurrentItems] = useState<UserCards[]>([]);
  const [passedItems, setPassedItems] = useState<UserCards[]>([]);
  const [userCards, setUserCards] = useState<UserCards[]>(user?.cards || []);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchCards = async () => {
    const q = query(collection(db, "cards"));
    const querySnapshot = await getDocs(q);
    const fetchedCurrentItems: UserCards[] = [];
    const fetchedPassedItems: UserCards[] = [];
    querySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id } as UserCards;  // Ensure id is included and unique
      if (data.passed) {
        fetchedPassedItems.push(data);
      } else {
        fetchedCurrentItems.push(data);
      }
    });

    // Update image URLs
    const updateImageUrls = async (items: UserCards[]) => {
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          if (item.imageUrl.startsWith('gs://')) {
            const storageRef = ref(storage, item.imageUrl);
            item.imageUrl = await getDownloadURL(storageRef);
          }
          return item;
        })
      );
      return updatedItems;
    };

    setPassedItems(await updateImageUrls(fetchedPassedItems));
    setCurrentItems(await updateImageUrls(fetchedCurrentItems));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handlePurchase = async (item: UserCards) => {
    if (!user || user.coins < item.price) return;

    const updatedUser = {
      ...user,
      coins: user.coins - item.price,
      cards: [...user.cards, item] // Store full card object
    };

    await updateUser(updatedUser);
    setUserCards(updatedUser.cards);
    fetchCards(); // Refresh cards after purchase
  };

  const controlRef = useRef<HTMLDivElement>(null);

  // Collect all image URLs for preloading
  const allImageUrls = [...currentItems, ...passedItems, ...userCards].map(item => item.imageUrl);
  usePreloadImages(allImageUrls);

  return (
    <div className='cards-main-container'>
      <SegmentedControl
        name="group-1"
        callback={(val, index) => setSelectedIndex(index)}
        defaultIndex={0}
        controlRef={controlRef}
        segments={[
          {
            label: 'Current',
            value: 'current',
          },
          {
            label: 'Passed',
            value: 'passed',
          },
          {
            label: 'Owned',
            value: 'owned',
          }
        ]}
      />

      <div>
      {selectedIndex === 0 && (
          <div className='current-cards'>
            <div className='cards-container'>
              {currentItems
                .filter(item => !userCards.some(userCard => userCard.id === item.id))
                .map(item => (
                  <Collectible key={item.id} item={item} owned={true} onPurchase={handlePurchase} />
                ))}
            </div>
          </div>
        )}

        {selectedIndex === 1 && (
          <div className='passed-cards'>
            <div className='cards-container'>
              {passedItems.map(item => (
                <Collectible key={item.id} item={item} owned={false} onPurchase={handlePurchase} />
              ))}
            </div>
          </div>
        )}

        {selectedIndex === 2 && (
          <div className='owned-cards'>
            <div className='cards-container'>
              {userCards.map(item => (
                <Collectible key={item.id} item={item} owned={false} onPurchase={handlePurchase} />
              ))}
            </div>
          </div>
        )}
      </div>      
    </div>   
  );
};

export default Cards;