// ✅ src/data/locationData.js
// Complete list of GCC countries with their cities/areas

export const GCC_COUNTRIES = [
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    cities: [
      { name: "Abu Dhabi", areas: ["Al Reem Island", "Corniche", "Al Khalidiya", "Masdar City", "Yas Island"] },
      { name: "Dubai", areas: ["Downtown", "Marina", "Jumeirah", "Deira", "Business Bay", "Palm Jumeirah"] },
      { name: "Sharjah", areas: ["Al Nahda", "Al Majaz", "Al Qasimia", "Muwailih", "Al Khan"] },
      { name: "Ajman", areas: ["Al Nuaimiya", "Al Rashidiya", "Al Bustan", "Al Rawda"] },
      { name: "Ras Al Khaimah", areas: ["Al Nakheel", "Al Mamourah", "Dafan Al Nakheel", "Al Qusaidat"] },
      { name: "Fujairah", areas: ["Al Faseel", "Dibba", "Al Gurfah", "Sakamkam"] },
      { name: "Umm Al Quwain", areas: ["Old Town", "Al Raas", "Al Salamah", "Falaj Al Mualla"] }
    ]
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    cities: [
      { name: "Riyadh", areas: ["Al Olaya", "Al Malaz", "Diplomatic Quarter", "Al Muruj", "Granada"] },
      { name: "Jeddah", areas: ["Al Hamra", "Al Rawdah", "Obhur", "Al Zahra", "Al Andalus"] },
      { name: "Dammam", areas: ["Al Faisaliyah", "Al Shati", "Al Nakheel", "Al Mazruiyah"] },
      { name: "Makkah", areas: ["Al Aziziyah", "Al Hindawiyah", "Ajyad", "Al Shawqiyah"] },
      { name: "Medina", areas: ["Al Haram", "Quba", "Al Aqiq", "Al Madinah Road"] },
      { name: "Khobar", areas: ["Al Corniche", "Al Aqrabiyah", "Al Thuqbah", "Al Hizam"] },
      { name: "Taif", areas: ["Al Shifa", "Al Hada", "Al Salamah", "Al Qim"] }
    ]
  },
  {
    code: "BH",
    name: "Bahrain",
    flag: "🇧🇭",
    cities: [
      { name: "Manama", areas: ["Diplomatic Area", "Adliya", "Juffair", "Seef", "Hoora"] },
      { name: "Muharraq", areas: ["Arad", "Hidd", "Busaiteen", "Samaheej"] },
      { name: "Riffa", areas: ["East Riffa", "West Riffa", "Riffa Views", "Hamala"] },
      { name: "Isa Town", areas: ["Block 1", "Block 2", "Block 3", "Block 4"] },
      { name: "Sitra", areas: ["East Sitra", "West Sitra", "Markh", "Wadyan"] }
    ]
  },
  {
    code: "QA",
    name: "Qatar",
    flag: "🇶🇦",
    cities: [
      { name: "Doha", areas: ["West Bay", "The Pearl", "Lusail", "Al Sadd", "Al Dafna", "Msheireb"] },
      { name: "Al Wakrah", areas: ["Al Wukair", "Al Kharrara", "Mesaieed", "Al Wakrah Port"] },
      { name: "Al Rayyan", areas: ["Al Gharafa", "Al Aziziya", "Education City", "Al Waab"] },
      { name: "Al Khor", areas: ["Al Khor Mall Area", "Al Khor Coastal", "Al Thakhira"] },
      { name: "Lusail City", areas: ["Marina District", "Energy City", "Katara Hills", "Fox Hills"] }
    ]
  },
  {
    code: "OM",
    name: "Oman",
    flag: "🇴🇲",
    cities: [
      { name: "Muscat", areas: ["Qurum", "Al Khuwair", "Ruwi", "Seeb", "Al Hail", "Madinat Sultan Qaboos"] },
      { name: "Salalah", areas: ["Al Hafah", "Al Dahariz", "Al Husn", "Awqad"] },
      { name: "Sohar", areas: ["Sohar Port", "Wadi Al Jizi", "Falaj Al Qabail", "Majees"] },
      { name: "Nizwa", areas: ["Nizwa Souq", "Birkat Al Mawz", "Al Jabal Al Akhdar", "Bahla"] },
      { name: "Sur", areas: ["Ras Al Hadd", "Al Ayjah", "Bilad Sur", "Tiwi"] }
    ]
  },
  {
    code: "KW",
    name: "Kuwait",
    flag: "🇰🇼",
    cities: [
      { name: "Kuwait City", areas: ["Salmiya", "Hawally", "Fintas", "Mangaf", "Fahaheel"] },
      { name: "Al Ahmadi", areas: ["Mahboula", "Abu Halifa", "Sabah Al Ahmad City", "Al Wafra"] },
      { name: "Farwaniya", areas: ["Jleeb Al-Shuyoukh", "Khaitan", "Ardiya", "Rabiya"] },
      { name: "Jahra", areas: ["Sulaibiya", "Qasr", "Abdali", "Naeem"] },
      { name: "Mubarak Al-Kabeer", areas: ["Sabah Al Salem", "Messila", "Adan", "Qurain"] }
    ]
  }
];

// Helper function to get country by code
export const getCountryByCode = (code) => {
  return GCC_COUNTRIES.find(country => country.code === code);
};

// Helper function to get all cities for a country
export const getCitiesByCountry = (countryCode) => {
  const country = getCountryByCode(countryCode);
  return country ? country.cities : [];
};

// Helper function to get areas by city name
export const getAreasByCity = (countryCode, cityName) => {
  const cities = getCitiesByCountry(countryCode);
  const city = cities.find(c => c.name === cityName);
  return city ? city.areas : [];
};