import { Comments, Films, FilmType } from '../types/general';

export const filmMock: FilmType = {
  name: 'Snatch',
  posterImage: 'https://10.react.htmlacademy.pro/static/film/poster/Snatch.jpg',
  previewImage:
    'https://10.react.htmlacademy.pro/static/film/preview/snatch.jpg',
  backgroundImage:
    'https://10.react.htmlacademy.pro/static/film/background/Snatch.jpg',
  backgroundColor: '#FDFDFC',
  description:
    'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
  rating: 0.2,
  scoresCount: 716577,
  director: 'Guy Ritchie',
  starring: ['Jason Statham', 'Brad Pitt', 'Benicio Del Toro'],
  runTime: 104,
  genre: 'Comedy',
  released: 2000,
  id: 1,
  isFavorite: false,
  videoLink: 'https://10.react.htmlacademy.pro/static/film/video/bike.mp4',
  previewVideoLink:
    'https://10.react.htmlacademy.pro/static/film/video/dog.mp4',
};

export const similarFilmsMock: Films = [
  {
    name: 'Snatch',
    posterImage:
      'https://10.react.htmlacademy.pro/static/film/poster/Snatch.jpg',
    previewImage:
      'https://10.react.htmlacademy.pro/static/film/preview/snatch.jpg',
    backgroundImage:
      'https://10.react.htmlacademy.pro/static/film/background/Snatch.jpg',
    backgroundColor: '#FDFDFC',
    description:
      'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
    rating: 0.2,
    scoresCount: 716577,
    director: 'Guy Ritchie',
    starring: ['Jason Statham', 'Brad Pitt', 'Benicio Del Toro'],
    runTime: 104,
    genre: 'Comedy',
    released: 2000,
    id: 1,
    isFavorite: false,
    videoLink: 'https://10.react.htmlacademy.pro/static/film/video/bike.mp4',
    previewVideoLink:
      'https://10.react.htmlacademy.pro/static/film/video/dog.mp4',
  },
  {
    name: 'Macbeth',
    posterImage:
      'https://10.react.htmlacademy.pro/static/film/poster/Macbeth.jpg',
    previewImage:
      'https://10.react.htmlacademy.pro/static/film/preview/macbeth.jpg',
    backgroundImage:
      'https://10.react.htmlacademy.pro/static/film/background/Macbeth.jpg',
    backgroundColor: '#F1E9CE',
    description:
      'Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.',
    rating: 3.3,
    scoresCount: 48798,
    director: 'Justin Kurzel',
    starring: ['Michael Fassbender', 'Marion Cotillard', 'Jack Madigan'],
    runTime: 113,
    genre: 'Drama',
    released: 2015,
    id: 2,
    isFavorite: false,
    videoLink: 'https://10.react.htmlacademy.pro/static/film/video/bike.mp4',
    previewVideoLink:
      'https://10.react.htmlacademy.pro/static/film/video/traffic.mp4',
  },
  {
    name: 'Once Upon a Time in America',
    posterImage:
      'https://10.react.htmlacademy.pro/static/film/poster/Once_Upon_a_Time_in_America.jpg',
    previewImage:
      'https://10.react.htmlacademy.pro/static/film/preview/Once_Upon_a_Time_in_America.jpg',
    backgroundImage:
      'https://10.react.htmlacademy.pro/static/film/background/ones_upon_a_time_in_america.jpg',
    backgroundColor: '#CBAC79',
    description:
      'A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.',
    rating: 9.9,
    scoresCount: 276395,
    director: 'Sergio Leone',
    starring: ['Robert De Niro', 'James Woods', 'Elizabeth McGovern'],
    runTime: 229,
    genre: 'Crime',
    released: 1984,
    id: 3,
    isFavorite: false,
    videoLink: 'https://10.react.htmlacademy.pro/static/film/video/bubbles.mp4',
    previewVideoLink:
      'https://10.react.htmlacademy.pro/static/film/video/dog.mp4',
  },
  {
    name: 'War of the Worlds',
    posterImage:
      'https://10.react.htmlacademy.pro/static/film/poster/War_of_the_Worlds.jpg',
    previewImage:
      'https://10.react.htmlacademy.pro/static/film/preview/war-of-the-worlds.jpg',
    backgroundImage:
      'https://10.react.htmlacademy.pro/static/film/background/War_of_the_Worlds.jpg',
    backgroundColor: '#9B7E61',
    description:
      'As Earth is invaded by alien tripod fighting machines, one family fights for survival.',
    rating: 9.3,
    scoresCount: 386834,
    director: 'Steven Spielberg',
    starring: ['Tom Cruise', 'Dakota Fanning', 'Tim Robbins'],
    runTime: 116,
    genre: 'Adventure',
    released: 2005,
    id: 4,
    isFavorite: false,
    videoLink: 'https://10.react.htmlacademy.pro/static/film/video/bubbles.mp4',
    previewVideoLink:
      'https://10.react.htmlacademy.pro/static/film/video/traffic.mp4',
  },
];

export const commentsMock: Comments = [
  {
    id: 1,
    user: {
      id: 14,
      name: 'Corey',
    },
    rating: 5.2,
    comment:
      'This movie is perfect in all its categories: credits, sound track, production, casting, writing, photography, editing, acting, and direction.\nI was amazed with the freedom of the use of the camera. This movie will change the way movies are made. Slow-mo, stills, black and white, and color were all used to brilliant effect.',
    date: '2024-12-23T09:25:27.623Z',
  },
  {
    id: 2,
    user: {
      id: 10,
      name: 'Max',
    },
    rating: 2.8,
    comment:
      'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    date: '2024-12-22T09:25:27.623Z',
  },
  {
    id: 3,
    user: {
      id: 10,
      name: 'Max',
    },
    rating: 2.8,
    comment:
      'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    date: '2024-12-22T09:25:27.623Z',
  },
  {
    id: 4,
    user: {
      id: 10,
      name: 'Max',
    },
    rating: 2.8,
    comment:
      'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    date: '2024-12-22T09:25:27.623Z',
  },
  {
    id: 5,
    user: {
      id: 10,
      name: 'Max',
    },
    rating: 2.8,
    comment:
      'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    date: '2024-12-22T09:25:27.623Z',
  },
];
