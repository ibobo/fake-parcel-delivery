export const cities = [
  "Milano",
  "Roma",
  "Firenze",
  "Torino",
  "Bologna",
  "Napoli",
  "Venezia",
  "Palermo",
  "Genova",
  "Verona"
];

export const streets = [
  "Via Roma",
  "Via Garibaldi",
  "Via Dante",
  "Corso Italia",
  "Via Venezia",
  "Via Milano",
  "Via Firenze",
  "Via Verdi",
  "Via Mazzini",
  "Corso Vittorio Emanuele"
];

export const generateRandomAddress = () => {
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 200) + 1;
  const city = cities[Math.floor(Math.random() * cities.length)];
  return `${street}, ${number} – ${city}`;
};