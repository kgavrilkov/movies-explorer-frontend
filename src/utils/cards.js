import pic1 from '../images/pic1.jpg';
import pic2 from '../images/pic2.jpg';
import pic3 from '../images/pic3.jpg';
import pic4 from '../images/pic4.jpg';
import pic5 from '../images/pic5.jpg';
import pic6 from '../images/pic6.jpg';
import pic7 from '../images/pic7.jpg';
import pic8 from '../images/pic8.jpg';
import pic9 from '../images/pic9.jpg';
import pic10 from '../images/pic10.jpg';
import pic11 from '../images/pic11.jpg';
import pic12 from '../images/pic12.jpg';
import pic13 from '../images/pic13.jpg';
import pic14 from '../images/pic14.jpg';
import pic15 from '../images/pic15.jpg';
import pic16 from '../images/pic16.jpg';

export const cards = [
  {
    id: '1',
    image: pic1,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: 'isLiked'
  },
  {
    id: '2',
    image: pic2,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: 'isLiked'
  },
  {
    id: '3',
    image: pic3,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: 'isLiked'
  },
  {
    id: '4',
    image: pic4,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '5',
    image: pic5,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '6',
    image: pic6,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '7',
    image: pic7,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '8',
    image: pic8,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '9',
    image: pic9,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '10',
    image: pic10,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '11',
    image: pic11,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '12',
    image: pic12,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '13',
    image: pic13,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '14',
    image: pic14,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '15',
    image: pic15,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  },
  {
    id: '16',
    image: pic16,
    name: '33 слова о дизайне',
    duration: '1ч42м',
    like: ''
  }
];  

export const filteredCards = cards.filter((card) => {
  return card.like.length > 0;
});