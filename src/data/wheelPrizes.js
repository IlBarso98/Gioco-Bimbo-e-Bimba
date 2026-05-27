export const wheelPrizes = [
  { id: 'cena-romantica', label: 'Cena romantica', color: '#ffc1d6' },
  { id: 'film-copertina', label: 'Film e copertina', color: '#fde6a8' },
  { id: 'gelato', label: 'Gelato', color: '#c2e7ff' },
  { id: 'passeggiata', label: 'Passeggiata', color: '#d6c8ff' },
  { id: 'coccole-infinite', label: 'Coccole infinite', color: '#ffd9b3' },
  {
    id: 'merenda-con-bimbo-venerdi',
    label: 'Merenda con bimbo venerdì',
    color: '#ffc9f5',
  },
  { id: 'sorpresa', label: 'Sorpresa', color: '#baf2db' },
  { id: 'abbraccio-obbligatorio', label: 'Abbraccio obbligatorio', color: '#ffd3de' },
];

export const featuredPrizeId = 'merenda-con-bimbo-venerdi';

export const winningPrizeId = featuredPrizeId;

export const wheelLocations = [
  {
    id: 'cremeria-opera',
    name: 'Cremeria Opera',
    image: '/assets/wheel/Cremeria Opera.jpg',
    alt: 'Possibile meta premio: Cremeria Opera',
  },
  {
    id: 'pracchia',
    name: 'Pracchia',
    image: '/assets/wheel/Pracchia.jpg',
    alt: 'Possibile meta premio: Pracchia',
  },
];

export const winningPlaces = wheelLocations.map((place) => ({
  id: place.id,
  title: place.name,
  image: place.image,
  alt: place.alt,
}));
