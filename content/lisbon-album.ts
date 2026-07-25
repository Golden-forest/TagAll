export type AlbumPhoto = {
  src: string
  alt: string
  caption?: string
  time?: string
  location?: string
  tags?: string[]
}

export type PhotoGridVariant = 'dense' | 'spacious' | 'feature'

export type Chapter = {
  id: number              // 0-6
  label: string           // 'Prologue' | 'Day 1' | 'Epilogue' etc.
  date: string            // '2026.08.13'
  title: string           // 'A slow morning in Alfama.'
  body: string            // 1-2 paragraphs of narrative prose
  photos: AlbumPhoto[]
  gridVariant: PhotoGridVariant
}

export type LisbonAlbumData = {
  tagline: string
  heroPhotos: AlbumPhoto[]   // 4 photos for intro Ken Burns
  closingQuote: string       // shown in epilogue chapter
  authorName: string         // shown in epilogue sign-off
  chapters: Chapter[]
}

export const lisbonAlbum: LisbonAlbumData = {
  tagline: 'A TRAVELOGUE · 08.2026',
  heroPhotos: [
    {
      src: '/demo-assets/lisbon-hero-01.webp',
      alt: 'Tagus river at golden hour with Lisbon skyline silhouetted against orange sky',
    },
    {
      src: '/demo-assets/lisbon-hero-02.webp',
      alt: 'Pena Palace in Sintra with vibrant red and yellow façades against deep blue sky',
    },
    {
      src: '/demo-assets/lisbon-hero-03.webp',
      alt: 'Cascais coastline with dramatic waves crashing on dark rocks at sunset',
    },
    {
      src: '/demo-assets/lisbon-hero-04.webp',
      alt: 'Close-up of traditional blue and white Portuguese tile façade in Alfama',
    },
  ],
  closingQuote:
    'We came for the pastéis de nata. We left with five days of slow mornings, long dinners, and the feeling that the Atlantic had been waiting.',
  authorName: 'Mara & Daniel',
  chapters: [
    {
      id: 0,
      label: 'Prologue',
      date: '2026.08.12',
      title: 'Lisbon, before we knew it.',
      body: 'An evening flight from Berlin. The window seat, the orange-lit clouds over Galicia, then the long descent toward the Tagus. We did not yet know which tram we would take, which pastelaria would become "ours," or which fado we would hear through an open window in Alfama at midnight.',
      photos: [
        {
          src: '/demo-assets/lisbon-prologue-01.webp',
          alt: 'Aerial view of Lisbon at sunset with the Tagus river winding through the city',
          caption: 'Descent into Lisbon',
          time: '19:42',
          location: 'Approaching Humberto Delgado Airport',
          tags: ['aerial', 'sunset', 'arrival'],
        },
        {
          src: '/demo-assets/lisbon-prologue-02.webp',
          alt: 'Window seat view of an airplane wing above orange clouds at dusk',
          caption: 'Somewhere over Galicia',
          time: '17:18',
          location: 'Above the Atlantic',
          tags: ['flight', 'window'],
        },
        {
          src: '/demo-assets/lisbon-prologue-03.webp',
          alt: 'Lisbon old town skyline at night with city lights glowing against the hills',
          caption: 'First night, from our balcony',
          time: '22:30',
          location: 'Alfama, Lisbon',
          tags: ['skyline', 'night'],
        },
      ],
      gridVariant: 'feature',
    },
    {
      id: 1,
      label: 'Day 1',
      date: '2026.08.13',
      title: 'A slow morning in Alfama.',
      body: 'Our first full day. We had no plan beyond coffee. Alfama does not reward plans — it rewards getting lost. Every staircase led somewhere smaller and quieter: a tiled courtyard, a café with three tables, an old woman shaking a rug from a second-floor window. We did not check the time until almost noon.',
      photos: [
        {
          src: '/demo-assets/lisbon-day1-01.webp',
          alt: 'Narrow cobblestone alley in Alfama with hanging laundry and tiled walls',
          caption: 'The first alley',
          time: '08:14',
          location: 'Beco do Carvalho, Alfama',
        },
        {
          src: '/demo-assets/lisbon-day1-02.webp',
          alt: 'Yellow Tram 28 climbing a steep cobblestone street in Alfama',
          caption: 'Tram 28, gone before we could board',
          time: '09:02',
          location: 'Largo das Portas do Sol',
        },
        {
          src: '/demo-assets/lisbon-day1-03.webp',
          alt: 'Close-up of weathered blue and white azulejo tiles on a façade',
          caption: 'The tiles are everywhere',
          time: '09:46',
          location: 'Rua de São Miguel',
        },
        {
          src: '/demo-assets/lisbon-day1-04.webp',
          alt: 'Tiny Portuguese café with marble table and bica coffee in a glass cup',
          caption: 'Our first bica',
          time: '10:15',
          location: 'Pastelaria São Miguel',
        },
        {
          src: '/demo-assets/lisbon-day1-05.webp',
          alt: 'Steep stone staircase between pastel-colored buildings in Alfama',
          caption: 'Stairs to nowhere in particular',
          time: '10:58',
          location: 'Largo de Santo Estêvão',
        },
        {
          src: '/demo-assets/lisbon-day1-06.webp',
          alt: 'A cat watching the street from a sunlit windowsill in Alfama',
          caption: 'The cat knew',
          time: '11:32',
          location: 'Travessa do Outeirinho',
        },
      ],
      gridVariant: 'dense',
    },
    {
      id: 2,
      label: 'Day 2',
      date: '2026.08.14',
      title: 'Cais do Sodré, after sunset.',
      body: 'We avoided the riverside all day — too obvious, too many tourists. After dinner we walked down anyway and the night was already soft, pink-lit, loud in a different language. The Pink Street does not photograph the way it feels. The market at Time Out was closing, but a guitarist in the corner kept playing.',
      photos: [
        {
          src: '/demo-assets/lisbon-day2-01.webp',
          alt: 'The Pink Street (Rua Nova do Carvalho) glowing pink at night with crowds',
          caption: 'The Pink Street',
          time: '21:18',
          location: 'Rua Nova do Carvalho',
        },
        {
          src: '/demo-assets/lisbon-day2-02.webp',
          alt: 'Time Out Market interior with food stalls and warm lighting',
          caption: 'Time Out, last orders',
          time: '21:55',
          location: 'Mercado da Ribeira',
        },
        {
          src: '/demo-assets/lisbon-day2-03.webp',
          alt: 'Tagus riverside promenade at night with reflections on wet pavement',
          caption: 'Riverside walk home',
          time: '23:02',
          location: 'Cais do Sodré',
        },
        {
          src: '/demo-assets/lisbon-day2-04.webp',
          alt: 'Neon sign above a small bar in Cais do Sodré',
          caption: 'Neon, somewhere',
          time: '23:24',
          location: 'Rua Paul',
        },
        {
          src: '/demo-assets/lisbon-day2-05.webp',
          alt: 'Grilled sardines on a metal plate in a traditional tasca',
          caption: 'The sardines',
          time: '20:18',
          location: 'Tasca da Esquina',
        },
        {
          src: '/demo-assets/lisbon-day2-06.webp',
          alt: 'Street musician playing guitar under a yellow street lamp',
          caption: 'He played for tips and for the night',
          time: '22:46',
          location: 'Largo de São Paulo',
        },
        {
          src: '/demo-assets/lisbon-day2-07.webp',
          alt: 'Reflection of neon signs in a puddle on pink-painted pavement',
          caption: 'Pink reflection',
          time: '23:08',
          location: 'Rua Nova do Carvalho',
        },
      ],
      gridVariant: 'dense',
    },
    {
      id: 3,
      label: 'Day 3',
      date: '2026.08.15',
      title: 'Sintra, in the clouds.',
      body: 'We took the 40-minute train to Sintra expecting postcard colors. We got fog instead. The Pena Palace emerged out of the mist like something invented rather than built, and the gardens at Quinta da Regaleira felt like a place where someone had once tried very hard to keep a secret. We did not see the sun all day. It did not matter.',
      photos: [
        {
          src: '/demo-assets/lisbon-day3-01.webp',
          alt: 'Pena Palace in Sintra emerging from thick morning fog',
          caption: 'Pena, half-imagined',
          time: '10:24',
          location: 'Parque e Palácio Nacional da Pena',
        },
        {
          src: '/demo-assets/lisbon-day3-02.webp',
          alt: 'Misty forest path covered in moss in the Sintra hills',
          caption: 'The path down',
          time: '11:38',
          location: 'Quinta da Regaleira',
        },
        {
          src: '/demo-assets/lisbon-day3-03.webp',
          alt: 'Stone ramparts of the Moorish Castle disappearing into cloud',
          caption: 'Castelo dos Mouros, in the clouds',
          time: '13:12',
          location: 'Castelo dos Mouros',
        },
        {
          src: '/demo-assets/lisbon-day3-04.webp',
          alt: 'Initiation Well spiral staircase descending into the earth at Quinta da Regaleira',
          caption: 'The Initiation Well',
          time: '12:04',
          location: 'Quinta da Regaleira',
        },
        {
          src: '/demo-assets/lisbon-day3-05.webp',
          alt: 'Moss-covered stone grotto with dripping water in Sintra gardens',
          caption: 'Where the secret was kept',
          time: '12:48',
          location: 'Quinta da Regaleira',
        },
        {
          src: '/demo-assets/lisbon-day3-06.webp',
          alt: 'Tower of the Moorish Castle silhouetted against pale misty sky',
          caption: 'The watchtower',
          time: '13:34',
          location: 'Castelo dos Mouros',
        },
      ],
      gridVariant: 'spacious',
    },
    {
      id: 4,
      label: 'Day 4',
      date: '2026.08.16',
      title: 'Cascais, where the river ends.',
      body: 'The train to Cascais follows the coast for half an hour. We got off at the last stop and walked toward the ocean. The wind was stronger than we expected. Boca do Inferno was louder than its photographs. We stayed on the rocks until the sun went down, then ate grilled fish in a place where no one spoke English and somehow it did not matter.',
      photos: [
        {
          src: '/demo-assets/lisbon-day4-01.webp',
          alt: 'Cascais coastline with white houses and the Atlantic Ocean',
          caption: 'Where the river meets the sea',
          time: '14:18',
          location: 'Cascais Bay',
        },
        {
          src: '/demo-assets/lisbon-day4-02.webp',
          alt: 'Boca do Inferno (Hell\'s Mouth) with dramatic waves crashing into a sea cave',
          caption: 'Boca do Inferno',
          time: '16:02',
          location: 'Boca do Inferno',
        },
        {
          src: '/demo-assets/lisbon-day4-03.webp',
          alt: 'Guincho Beach at sunset with windblown sand and silhouetted surfers',
          caption: 'Guincho, last light',
          time: '19:38',
          location: 'Praia do Guincho',
        },
        {
          src: '/demo-assets/lisbon-day4-04.webp',
          alt: 'Santa Marta Lighthouse in Cascais at dusk',
          caption: 'Santa Marta',
          time: '20:14',
          location: 'Farol Museu de Santa Marta',
        },
        {
          src: '/demo-assets/lisbon-day4-05.webp',
          alt: 'Cascais marina at dusk with masts reflected in still water',
          caption: 'Marina, after dinner',
          time: '21:46',
          location: 'Marina de Cascais',
        },
      ],
      gridVariant: 'spacious',
    },
    {
      id: 5,
      label: 'Day 5',
      date: '2026.08.17',
      title: 'The long way home.',
      body: 'Our last morning. We went back to the pastelaria we had found on Day 1 and ordered the same thing. We bought postcards we did not need and ceramics we did not have room for. The tram to the airport left on time. We did not say much.',
      photos: [
        {
          src: '/demo-assets/lisbon-day5-01.webp',
          alt: 'Souvenir shop window with traditional Portuguese ceramics and sardine tins',
          caption: 'Last-minute everything',
          time: '09:48',
          location: 'Rua Augusta',
        },
        {
          src: '/demo-assets/lisbon-day5-02.webp',
          alt: 'Pastel de nata on a small ceramic plate with espresso',
          caption: 'One last pastel de nata',
          time: '10:24',
          location: 'Manteigaria, Chiado',
        },
        {
          src: '/demo-assets/lisbon-day5-03.webp',
          alt: 'View from inside a Lisbon tram showing the city through the window',
          caption: 'Tram window, going west',
          time: '12:18',
          location: 'Tram 15, toward Algés',
        },
        {
          src: '/demo-assets/lisbon-day5-04.webp',
          alt: 'Luggage handle on a sunlit marble floor of a Lisbon airport terminal',
          caption: 'Time to go',
          time: '14:32',
          location: 'Humberto Delgado Airport',
        },
      ],
      gridVariant: 'spacious',
    },
    {
      id: 6,
      label: 'Epilogue',
      date: '',
      title: 'What we brought back.',
      body: 'A bag of ceramics. A notebook of menus. A handful of tram tickets we kept meaning to throw away. Lisbon, it turns out, is a city that does not need a thesis.',
      photos: [
        {
          src: '/demo-assets/lisbon-epilogue-01.webp',
          alt: 'Flat lay of postcards, train tickets, and travel ephemera on a wooden table',
          caption: 'The paper trail',
        },
        {
          src: '/demo-assets/lisbon-epilogue-02.webp',
          alt: 'Portuguese ceramic tiles and a sardine tin arranged on linen',
          caption: 'What survived the luggage',
        },
        {
          src: '/demo-assets/lisbon-epilogue-03.webp',
          alt: 'Open notebook with handwritten Portuguese recipes and coffee stains',
          caption: 'The notebook',
        },
      ],
      gridVariant: 'feature',
    },
  ],
}
