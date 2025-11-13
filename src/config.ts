const photoModules = import.meta.glob('./assets/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}', { eager: true, as: 'url' }) as Record<string, string>;

const photos = Object.entries(photoModules)
  .map(([path, url]) => {
    const file = path.split('/').pop() || path;
    const title = decodeURIComponent(file.replace(/\.[^.]+$/, ''));
    return { url, title };
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'cs'));

export const config = {
  brideName: 'Aneta Marešová',
  groomName: 'David Holkup',
  weddingDate: '2026-04-11',
  weddingTime: '13:00',
  rsvpDeadline: '2026-02-01',
  landingBackground: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
  theme: {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    background: 'var(--bg)'
  },
  ceremony: {
    venueName: 'Kostel Nejsvětější Trojice',
    venueAddress: '49.4039189N, 15.3245008E',
    time: '13:00',
    parkingInfo: 'Parkování možné u hotelu. Doporučujeme přijet s předstihem.'
  },
  reception: {
    venueName: 'Hostinec u Zmátlů',
    venueAddress: 'Sázava 27, 393 01 Nový Rychnov-Pelhřimov',
    time: '15:30',
    parkingInfo: 'Kolem hostince je místo pro cca 12 aut.'
  },
  agenda: [
    { title: 'Obřad', time: '13:00', description: 'Svatební obřad v kostele' },
    { title: 'Gratulace a focení', time: '14:15', description: 'Společné fotografie s hosty' },
    { title: 'Příjezd na hostinu', time: '15:30', description: 'Přivítání na zámku' },
    { title: 'Večeře', time: '15:45', description: 'Slavnostní svatební hostina' },
    { title: 'První tanec', time: '16:30', description: 'Novomanželský tanec' },
    { title: 'Krájení dortu', time: '18:00', description: 'Rozkrojení novomanželského dortu' },
    { title: 'Oslava', time: '20:00', description: 'Tanec, hry a zábava až do rána' }
  ],
    hotels: [
        {
            name: 'Hotel Křemešník',
            address: 'Křemešník 4, 393 01 Nový Rychnov',
            phone: '+420 565 303 431',
            bookingUrl: "http://www.nakremesniku.cz",
            notes: 'Přímo v místě obřadu, 3 minuty autem z hostiny.'
        },
        {
            name: "Hotel Slávie Pelhřimov",
            address: "Masarykovo nám. 29, 393 01 Pelhřimov",
            phone: "+420 565 321 540",
            bookingUrl: "https://www.hotelslavie.eu",
            notes: "Rodinný hotel v centru Pelhřimova s restaurací a pizzerií, parkování."
        },
        {
            name: "Hotel FARMA***",
            address: "Služátky 25, 393 01 Pelhřimov",
            phone: "+420 565 327 127",
            bookingUrl: "https://www.hotel-farma.cz",
            notes: "Rodinný hotel na okraji města, větší areál, vhodné i pro rodiny."
        },
        {
            name: "Motel Velký Rybník",
            address: "Dehtáře, Onšovice 22, 393 01 Pelhřimov",
            phone: "+420 731 327 709",
            bookingUrl: "https://www.motelvelkyrybnik.cz",
            notes: "Levnější možnost ubytování v okolí Pelhřimova."
        }

    ],
  photos: photos, 
  giftsMessage: 'Svatebčané naši milí, dovolte nám prosbičku.\nRaději než věcné dary naplňte nám kasičku.\n\nMnohokrát vám děkujeme za každičký halíř,\nstokrát lepší než nést domů stodesátý talíř.',
  contactEmail: 'davidholkup@gmail.com',
}
