import React, { useState, useEffect, useRef } from 'react';
import Collectible from '../components/Collectible';
import { useUserContext, UserCards } from '../context/UserContext';
import SegmentedControl from '../components/SegmentedControl';
import HelpPopupCards from '../components/HelpPopupCards';
import cardsData from '../cards/cards.json';

// Import images
import img01 from '../assets/images/cards/1.png';
import img02 from '../assets/images/cards/2.png';
import img03 from '../assets/images/cards/3.png';
import img04 from '../assets/images/cards/4.png';
import img05 from '../assets/images/cards/5.png';
import img06 from '../assets/images/cards/6.png';
import img07 from '../assets/images/cards/7.png';
import img08 from '../assets/images/cards/8.png';
import img09 from '../assets/images/cards/9.png';
import img10 from '../assets/images/cards/10.png';
import img11 from '../assets/images/cards/11.png';
import img12 from '../assets/images/cards/12.png';
import img13 from '../assets/images/cards/13.png';
import img14 from '../assets/images/cards/14.png';
import img15 from '../assets/images/cards/15.png';
import img16 from '../assets/images/cards/16.png';
import img17 from '../assets/images/cards/17.png';
import img18 from '../assets/images/cards/18.png';
import img19 from '../assets/images/cards/19.png';
import img20 from '../assets/images/cards/20.png';
import img21 from '../assets/images/cards/21.png';

const imageMap = {
  '1.png': img01,
  '2.png': img02,
  '3.png': img03,
  '4.png': img04,
  '5.png': img05,
  '6.png': img06,
  '7.png': img07,
  '8.png': img08,
  '9.png': img09,
  '10.png': img10,
  '11.png': img11,
  '12.png': img12,
  '13.png': img13,
  '14.png': img14,
  '15.png': img15,
  '16.png': img16,
  '17.png': img17,
  '18.png': img18,
  '19.png': img19,
  '20.png': img20,
  '21.png': img21,
};

const Cards: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const [currentItems, setCurrentItems] = useState<UserCards[]>([]);
  const [passedItems, setPassedItems] = useState<UserCards[]>([]);
  const [userCards, setUserCards] = useState<UserCards[]>(user?.cards || []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchCards = async () => {
    const fetchedCurrentItems: UserCards[] = [];
    const fetchedPassedItems: UserCards[] = [];
    cardsData.forEach((card) => {
      if (card.passed) {
        fetchedPassedItems.push(card);
      } else {
        fetchedCurrentItems.push(card);
      }
    });

    setPassedItems(fetchedPassedItems);
    setCurrentItems(fetchedCurrentItems);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handlePurchase = async (item: UserCards) => {
    if (!user || user.coins < item.price) {
      alert("You don't have enough G$");
      return;
    } else if (user.bossInfo.bossLevel >= item.requiredLevel) {
      alert(`Increase your boss level to level "${item.requiredLevel}"`);
      return;
    }

    const updatedUser = {
      ...user,
      coins: user.coins - item.price,
      cards: [...user.cards, item], // Store full card object
    };

    await updateUser(updatedUser);
    setUserCards(updatedUser.cards);
    fetchCards(); // Refresh cards after purchase
  };

  const controlRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="cards-main-container">
      <div className="cards-info-container">
        <button className="question-button" onClick={togglePopup}>?</button>
      </div>
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
          <div className="current-cards">
            <div className="cards-container">
              {currentItems
                .filter((item) => !userCards.some((userCard) => userCard.id === item.id))
                .map((item) => (
                  <Collectible key={item.id.toString()} item={{ ...item, imageUrl: imageMap[item.imageUrl] }} owned={true} onPurchase={handlePurchase} />
                ))}
            </div>
          </div>
        )}

        {selectedIndex === 1 && (
          <div className="passed-cards">
            <div className="cards-container">
              {passedItems.map((item) => (
                <Collectible key={item.id.toString()} item={{ ...item, imageUrl: imageMap[item.imageUrl] }} owned={false} onPurchase={handlePurchase} />
              ))}
            </div>
          </div>
        )}

        {selectedIndex === 2 && (
          <div className="owned-cards">
            <div className="cards-container">
              {userCards.map((item) => (
                <Collectible key={item.id.toString()} item={{ ...item, imageUrl: imageMap[item.imageUrl] }} owned={false} onPurchase={handlePurchase} />
              ))}
            </div>
          </div>
        )}
      </div>      
      {isPopupOpen && <HelpPopupCards onClose={togglePopup} />}
    </div>   
  );
};

export default Cards;