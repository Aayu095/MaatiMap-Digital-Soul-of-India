import type { CulturalCategory, CulturalItem } from '@/lib/types';
import { Palette, CookingPot, Landmark, HandHeart, Music as MusicIconLucide, PartyPopper } from 'lucide-react';

export const CULTURAL_CATEGORIES: CulturalCategory[] = [
  { name: 'Art', slug: 'art', icon: Palette, description: 'Explore diverse traditional and folk art forms from across India.' },
  { name: 'Food', slug: 'food', icon: CookingPot, description: 'Discover regional cuisines, unique dishes, and culinary traditions.' },
  { name: 'Heritage Sites', slug: 'heritage-sites', icon: Landmark, description: 'Visit historical monuments, architectural marvels, and significant landmarks.' },
  { name: 'Rituals', slug: 'rituals', icon: HandHeart, description: 'Learn about ancient customs, ceremonies, and spiritual practices.' },
  { name: 'Music', slug: 'music', icon: MusicIconLucide, description: 'Experience the rich tapestry of Indian classical, folk, and contemporary music.' },
  { name: 'Festivals', slug: 'festivals', icon: PartyPopper, description: 'Celebrate vibrant festivals that mark India\'s cultural calendar.' },
];

export const SAMPLE_CULTURAL_ITEMS: CulturalItem[] = [
  {
    id: 'kathakali',
    title: 'Kathakali Dance',
    summary: 'A classical Indian dance-drama known for its elaborate costumes and makeup.',
    category: 'art',
    imageUrl: 'https://i.postimg.cc/Yq5W1SzV/kathakali-1m.jpg',
    imageHint: 'Kathakali dance',
    latitude: 9.9312,
    longitude: 76.2673,
    region: 'Kerala',
    tags: ['dance', 'classical', 'performance'],
    description: 'Kathakali is a highly stylized classical Indian dance-drama noted for its attractive make-up of characters, elaborate costumes, detailed gestures and well-defined body movements presented in tune with the anchor playback music and complementary percussion. It originated in Kerala during the 17th century.'
  },
  {
    id: 'biryani',
    title: 'Hyderabadi Biryani',
    summary: 'A famous Indian rice dish with meat or vegetables, known for its aroma and spices.',
    category: 'food',
    imageUrl: 'https://i.postimg.cc/cL9ThXp5/hyderabadi-biryani.jpg',
    imageHint: 'Biryani food',
    latitude: 17.3850,
    longitude: 78.4867,
    region: 'Telangana',
    tags: ['rice', 'mughlai', 'spicy'],
    description: 'Hyderabadi Biryani is a form of biryani, from Hyderabad, India. It is prepared in the form of kachay gosht ki biryani and dum ki biryani. It is a staple of Hyderabadi cuisine.'
  },
  {
    id: 'taj-mahal',
    title: 'Taj Mahal',
    summary: 'An ivory-white marble mausoleum on the south bank of the Yamuna river in Agra.',
    category: 'heritage-sites',
    imageUrl: 'https://i.postimg.cc/x1bpjq61/Taj-Mahal.jpg',
    imageHint: 'Taj Mahal',
    latitude: 27.1751,
    longitude: 78.0421,
    region: 'Uttar Pradesh',
    tags: ['monument', 'mughal', 'unesco'],
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.'
  },
  {
    id: 'diwali',
    title: 'Diwali',
    summary: 'The festival of lights, celebrated by Hindus, Jains, Sikhs and some Buddhists.',
    category: 'festivals',
    imageUrl: 'https://i.postimg.cc/PqDJdGpw/diwali-celebration-sparkle-stockcake.jpg',
    imageHint: 'Diwali festival',
    region: 'Pan-India',
    tags: ['lights', 'hindu', 'celebration'],
    description: 'Diwali is one of the most popular festivals of Hinduism, it spiritually signifies the victory of light over darkness, good over evil, knowledge over ignorance, and hope over despair.'
  },
  {
    id: 'rajasthani-folk',
    title: 'Rajasthani Folk Music',
    summary: 'Vibrant and soulful music from the deserts of Rajasthan, featuring unique instruments.',
    category: 'music',
    imageUrl: 'https://i.postimg.cc/KvLgZg6z/rajasthan-folk-music.jpg',
    imageHint: 'Rajasthan music',
    latitude: 26.9124,
    longitude: 75.7873,
    region: 'Rajasthan',
    tags: ['folk', 'desert', 'traditional'],
    description: 'Rajasthani folk music is originated from Rajasthan, one of the northwestern states of India. It is a vibrant and diverse musical tradition that reflects the rich cultural heritage of the region.'
  },
  {
    id: 'ganga-aarti',
    title: 'Ganga Aarti',
    summary: 'A devotional ritual using fire as an offering, usually performed on the banks of the Ganges.',
    category: 'rituals',
    imageUrl: 'https://i.postimg.cc/bYxkfB4M/Ganga-Aarti-Varanasi-From-Boat-1000x565.jpg',
    imageHint: 'Ganga Aarti ritual',
    latitude: 25.3176,
    longitude: 82.9739,
    region: 'Varanasi',
    tags: ['hindu', 'river', 'devotion'],
    description: 'Ganga Aarti is a Hindu religious ritual of worship, a part of puja. In this ritual, light from wicks soaked in ghee (purified butter) or camphor is offered to one or more deities. Aarti is generally performed one to five times daily, and usually at the end of a puja or bhajan session.'
  }
];
