// ==============================================================================
// SkyFlow - 200 International & Domestic Airlines Master Data
// ==============================================================================

const AIRLINES = [
  // 1-10: Thailand & Top Regional
  { code: 'TG', name: 'Thai Airways', country: 'Thailand', rating: 4.8 },
  { code: 'PG', name: 'Bangkok Airways', country: 'Thailand', rating: 4.7 },
  { code: 'FD', name: 'Thai AirAsia', country: 'Thailand', rating: 4.3 },
  { code: 'SL', name: 'Thai Lion Air', country: 'Thailand', rating: 4.1 },
  { code: 'VZ', name: 'Thai Vietjet Air', country: 'Thailand', rating: 4.2 },
  { code: 'DD', name: 'Nok Air', country: 'Thailand', rating: 4.0 },
  { code: 'WE', name: 'Thai Smile', country: 'Thailand', rating: 4.5 },
  { code: 'SQ', name: 'Singapore Airlines', country: 'Singapore', rating: 4.9 },
  { code: 'TR', name: 'Scoot', country: 'Singapore', rating: 4.2 },
  { code: 'CX', name: 'Cathay Pacific', country: 'Hong Kong', rating: 4.7 },

  // 11-30: East Asia (Japan, Korea, Taiwan, HK)
  { code: 'HX', name: 'Hong Kong Airlines', country: 'Hong Kong', rating: 4.3 },
  { code: 'UO', name: 'HK Express', country: 'Hong Kong', rating: 4.1 },
  { code: 'JL', name: 'Japan Airlines (JAL)', country: 'Japan', rating: 4.9 },
  { code: 'NH', name: 'All Nippon Airways (ANA)', country: 'Japan', rating: 4.9 },
  { code: 'MM', name: 'Peach Aviation', country: 'Japan', rating: 4.2 },
  { code: 'ZG', name: 'ZIPAIR Tokyo', country: 'Japan', rating: 4.4 },
  { code: 'NQ', name: 'AirJapan', country: 'Japan', rating: 4.3 },
  { code: 'GK', name: 'Jetstar Japan', country: 'Japan', rating: 4.1 },
  { code: 'BC', name: 'Skymark Airlines', country: 'Japan', rating: 4.3 },
  { code: '7J', name: 'StarFlyer', country: 'Japan', rating: 4.5 },
  { code: 'KE', name: 'Korean Air', country: 'South Korea', rating: 4.8 },
  { code: 'OZ', name: 'Asiana Airlines', country: 'South Korea', rating: 4.6 },
  { code: '7C', name: 'Jeju Air', country: 'South Korea', rating: 4.2 },
  { code: 'TW', name: 'Tway Air', country: 'South Korea', rating: 4.1 },
  { code: 'LJ', name: 'Jin Air', country: 'South Korea', rating: 4.2 },
  { code: 'BX', name: 'Air Busan', country: 'South Korea', rating: 4.2 },
  { code: 'RS', name: 'Air Seoul', country: 'South Korea', rating: 4.3 },
  { code: 'YP', name: 'Air Premia', country: 'South Korea', rating: 4.5 },
  { code: 'BR', name: 'EVA Air', country: 'Taiwan', rating: 4.8 },
  { code: 'CI', name: 'China Airlines', country: 'Taiwan', rating: 4.6 },

  // 31-50: Taiwan & Greater China
  { code: 'JX', name: 'STARLUX Airlines', country: 'Taiwan', rating: 4.9 },
  { code: 'IT', name: 'Tigerair Taiwan', country: 'Taiwan', rating: 4.2 },
  { code: 'AE', name: 'Mandarin Airlines', country: 'Taiwan', rating: 4.3 },
  { code: 'B7', name: 'Uni Air', country: 'Taiwan', rating: 4.2 },
  { code: 'CA', name: 'Air China', country: 'China', rating: 4.4 },
  { code: 'MU', name: 'China Eastern Airlines', country: 'China', rating: 4.3 },
  { code: 'CZ', name: 'China Southern Airlines', country: 'China', rating: 4.4 },
  { code: 'HU', name: 'Hainan Airlines', country: 'China', rating: 4.7 },
  { code: 'ZH', name: 'Shenzhen Airlines', country: 'China', rating: 4.3 },
  { code: 'MF', name: 'XiamenAir', country: 'China', rating: 4.5 },
  { code: '3U', name: 'Sichuan Airlines', country: 'China', rating: 4.4 },
  { code: 'SC', name: 'Shandong Airlines', country: 'China', rating: 4.2 },
  { code: '9C', name: 'Spring Airlines', country: 'China', rating: 4.0 },
  { code: 'HO', name: 'Juneyao Air', country: 'China', rating: 4.3 },
  { code: 'GJ', name: 'Loong Air', country: 'China', rating: 4.2 },
  { code: '8L', name: 'Lucky Air', country: 'China', rating: 4.1 },
  { code: 'JD', name: 'Beijing Capital Airlines', country: 'China', rating: 4.1 },
  { code: 'EU', name: 'Chengdu Airlines', country: 'China', rating: 4.1 },
  { code: 'GS', name: 'Tianjin Airlines', country: 'China', rating: 4.1 },
  { code: 'KN', name: 'China United Airlines', country: 'China', rating: 4.0 },

  // 51-70: Southeast Asia (ASEAN)
  { code: 'VN', name: 'Vietnam Airlines', country: 'Vietnam', rating: 4.6 },
  { code: 'VJ', name: 'VietJet Air', country: 'Vietnam', rating: 4.1 },
  { code: 'QH', name: 'Bamboo Airways', country: 'Vietnam', rating: 4.4 },
  { code: 'BL', name: 'Pacific Airlines', country: 'Vietnam', rating: 4.0 },
  { code: 'VU', name: 'Vietravel Airlines', country: 'Vietnam', rating: 4.1 },
  { code: 'MH', name: 'Malaysia Airlines', country: 'Malaysia', rating: 4.5 },
  { code: 'AK', name: 'AirAsia (Malaysia)', country: 'Malaysia', rating: 4.3 },
  { code: 'D7', name: 'AirAsia X', country: 'Malaysia', rating: 4.2 },
  { code: 'OD', name: 'Batik Air Malaysia', country: 'Malaysia', rating: 4.3 },
  { code: 'FY', name: 'Firefly', country: 'Malaysia', rating: 4.2 },
  { code: 'GA', name: 'Garuda Indonesia', country: 'Indonesia', rating: 4.7 },
  { code: 'JT', name: 'Lion Air', country: 'Indonesia', rating: 3.9 },
  { code: 'ID', name: 'Batik Air', country: 'Indonesia', rating: 4.2 },
  { code: 'QG', name: 'Citilink', country: 'Indonesia', rating: 4.1 },
  { code: 'IU', name: 'Super Air Jet', country: 'Indonesia', rating: 4.0 },
  { code: 'IW', name: 'Wings Air', country: 'Indonesia', rating: 3.9 },
  { code: 'PR', name: 'Philippine Airlines', country: 'Philippines', rating: 4.4 },
  { code: '5J', name: 'Cebu Pacific', country: 'Philippines', rating: 4.1 },
  { code: 'Z2', name: 'Philippines AirAsia', country: 'Philippines', rating: 4.1 },
  { code: '2P', name: 'PAL Express', country: 'Philippines', rating: 4.2 },

  // 71-90: South Asia, Indochina & Central Asia
  { code: 'AI', name: 'Air India', country: 'India', rating: 4.3 },
  { code: '6E', name: 'IndiGo', country: 'India', rating: 4.5 },
  { code: 'UK', name: 'Vistara', country: 'India', rating: 4.7 },
  { code: 'SG', name: 'SpiceJet', country: 'India', rating: 3.9 },
  { code: 'QP', name: 'Akasa Air', country: 'India', rating: 4.4 },
  { code: 'IX', name: 'Air India Express', country: 'India', rating: 4.1 },
  { code: 'UL', name: 'SriLankan Airlines', country: 'Sri Lanka', rating: 4.4 },
  { code: '8D', name: 'FitsAir', country: 'Sri Lanka', rating: 4.0 },
  { code: 'BG', name: 'Biman Bangladesh Airlines', country: 'Bangladesh', rating: 4.0 },
  { code: 'BS', name: 'US-Bangla Airlines', country: 'Bangladesh', rating: 4.1 },
  { code: 'RA', name: 'Nepal Airlines', country: 'Nepal', rating: 4.0 },
  { code: 'H9', name: 'Himalaya Airlines', country: 'Nepal', rating: 4.1 },
  { code: 'KB', name: 'Drukair', country: 'Bhutan', rating: 4.5 },
  { code: 'B3', name: 'Bhutan Airlines', country: 'Bhutan', rating: 4.4 },
  { code: '8M', name: 'Myanmar Airways International', country: 'Myanmar', rating: 4.2 },
  { code: 'UB', name: 'Myanmar National Airlines', country: 'Myanmar', rating: 4.0 },
  { code: 'QV', name: 'Lao Airlines', country: 'Laos', rating: 4.2 },
  { code: 'KR', name: 'Cambodia Airways', country: 'Cambodia', rating: 4.1 },
  { code: 'KT', name: 'AirAsia Cambodia', country: 'Cambodia', rating: 4.2 },
  { code: 'K6', name: 'Cambodia Angkor Air', country: 'Cambodia', rating: 4.1 },

  // 91-110: Middle East
  { code: 'EK', name: 'Emirates', country: 'UAE', rating: 4.9 },
  { code: 'QR', name: 'Qatar Airways', country: 'Qatar', rating: 4.9 },
  { code: 'EY', name: 'Etihad Airways', country: 'UAE', rating: 4.8 },
  { code: 'FZ', name: 'flydubai', country: 'UAE', rating: 4.3 },
  { code: 'G9', name: 'Air Arabia', country: 'UAE', rating: 4.2 },
  { code: 'GF', name: 'Gulf Air', country: 'Bahrain', rating: 4.4 },
  { code: 'SV', name: 'Saudia', country: 'Saudi Arabia', rating: 4.5 },
  { code: 'XY', name: 'Flynas', country: 'Saudi Arabia', rating: 4.2 },
  { code: 'F3', name: 'Flyadeal', country: 'Saudi Arabia', rating: 4.1 },
  { code: 'WY', name: 'Oman Air', country: 'Oman', rating: 4.7 },
  { code: 'OV', name: 'SalamAir', country: 'Oman', rating: 4.1 },
  { code: 'KU', name: 'Kuwait Airways', country: 'Kuwait', rating: 4.3 },
  { code: 'J9', name: 'Jazeera Airways', country: 'Kuwait', rating: 4.1 },
  { code: 'RJ', name: 'Royal Jordanian', country: 'Jordan', rating: 4.3 },
  { code: 'ME', name: 'Middle East Airlines (MEA)', country: 'Lebanon', rating: 4.3 },
  { code: 'TK', name: 'Turkish Airlines', country: 'Turkey', rating: 4.8 },
  { code: 'PC', name: 'Pegasus Airlines', country: 'Turkey', rating: 4.1 },
  { code: 'XQ', name: 'SunExpress', country: 'Turkey', rating: 4.2 },
  { code: 'VF', name: 'AJet', country: 'Turkey', rating: 4.0 },
  { code: 'KC', name: 'Air Astana', country: 'Kazakhstan', rating: 4.6 },

  // 111-135: Western & Northern Europe
  { code: 'BA', name: 'British Airways', country: 'United Kingdom', rating: 4.6 },
  { code: 'VS', name: 'Virgin Atlantic', country: 'United Kingdom', rating: 4.7 },
  { code: 'U2', name: 'easyJet', country: 'United Kingdom', rating: 4.2 },
  { code: 'LS', name: 'Jet2.com', country: 'United Kingdom', rating: 4.4 },
  { code: 'LH', name: 'Lufthansa', country: 'Germany', rating: 4.7 },
  { code: 'EW', name: 'Eurowings', country: 'Germany', rating: 4.1 },
  { code: 'DE', name: 'Condor', country: 'Germany', rating: 4.3 },
  { code: 'AF', name: 'Air France', country: 'France', rating: 4.7 },
  { code: 'TO', name: 'Transavia France', country: 'France', rating: 4.2 },
  { code: 'BF', name: 'French Bee', country: 'France', rating: 4.3 },
  { code: 'SS', name: 'Corsair', country: 'France', rating: 4.2 },
  { code: 'KL', name: 'KLM Royal Dutch Airlines', country: 'Netherlands', rating: 4.8 },
  { code: 'HV', name: 'Transavia', country: 'Netherlands', rating: 4.2 },
  { code: 'LX', name: 'Swiss International Air Lines', country: 'Switzerland', rating: 4.8 },
  { code: 'WK', name: 'Edelweiss Air', country: 'Switzerland', rating: 4.6 },
  { code: 'OS', name: 'Austrian Airlines', country: 'Austria', rating: 4.6 },
  { code: 'SN', name: 'Brussels Airlines', country: 'Belgium', rating: 4.4 },
  { code: 'TB', name: 'TUI fly Belgium', country: 'Belgium', rating: 4.1 },
  { code: 'SK', name: 'Scandinavian Airlines (SAS)', country: 'Sweden/Denmark/Norway', rating: 4.5 },
  { code: 'DY', name: 'Norwegian Air Shuttle', country: 'Norway', rating: 4.3 },
  { code: 'N0', name: 'Norse Atlantic Airways', country: 'Norway', rating: 4.3 },
  { code: 'WF', name: 'Widerøe', country: 'Norway', rating: 4.4 },
  { code: 'AY', name: 'Finnair', country: 'Finland', rating: 4.7 },
  { code: 'FI', name: 'Icelandair', country: 'Iceland', rating: 4.5 },
  { code: 'OG', name: 'PLAY', country: 'Iceland', rating: 4.1 },

  // 136-155: Southern & Eastern Europe
  { code: 'IB', name: 'Iberia', country: 'Spain', rating: 4.4 },
  { code: 'VY', name: 'Vueling', country: 'Spain', rating: 4.1 },
  { code: 'UX', name: 'Air Europa', country: 'Spain', rating: 4.3 },
  { code: 'V7', name: 'Volotea', country: 'Spain', rating: 4.2 },
  { code: 'TP', name: 'TAP Air Portugal', country: 'Portugal', rating: 4.4 },
  { code: 'S4', name: 'Azores Airlines', country: 'Portugal', rating: 4.2 },
  { code: 'AZ', name: 'ITA Airways', country: 'Italy', rating: 4.4 },
  { code: 'EN', name: 'Air Dolomiti', country: 'Italy', rating: 4.3 },
  { code: 'NO', name: 'Neos Air', country: 'Italy', rating: 4.2 },
  { code: 'LO', name: 'LOT Polish Airlines', country: 'Poland', rating: 4.4 },
  { code: 'E4', name: 'Enter Air', country: 'Poland', rating: 4.0 },
  { code: 'A3', name: 'Aegean Airlines', country: 'Greece', rating: 4.6 },
  { code: 'OA', name: 'Olympic Air', country: 'Greece', rating: 4.4 },
  { code: 'GQ', name: 'SKY express', country: 'Greece', rating: 4.2 },
  { code: 'RO', name: 'TAROM', country: 'Romania', rating: 4.1 },
  { code: 'FB', name: 'Bulgaria Air', country: 'Bulgaria', rating: 4.0 },
  { code: 'OU', name: 'Croatia Airlines', country: 'Croatia', rating: 4.2 },
  { code: 'JU', name: 'Air Serbia', country: 'Serbia', rating: 4.2 },
  { code: 'OK', name: 'Czech Airlines', country: 'Czech Republic', rating: 4.1 },
  { code: 'QS', name: 'Smartwings', country: 'Czech Republic', rating: 4.0 },

  // 156-175: Europe Budget & North America
  { code: 'FR', name: 'Ryanair', country: 'Ireland', rating: 4.0 },
  { code: 'EI', name: 'Aer Lingus', country: 'Ireland', rating: 4.5 },
  { code: 'W6', name: 'Wizz Air', country: 'Hungary', rating: 3.9 },
  { code: 'BT', name: 'airBaltic', country: 'Latvia', rating: 4.5 },
  { code: 'KM', name: 'KM Malta Airlines', country: 'Malta', rating: 4.2 },
  { code: 'UA', name: 'United Airlines', country: 'USA', rating: 4.5 },
  { code: 'DL', name: 'Delta Air Lines', country: 'USA', rating: 4.7 },
  { code: 'AA', name: 'American Airlines', country: 'USA', rating: 4.4 },
  { code: 'WN', name: 'Southwest Airlines', country: 'USA', rating: 4.5 },
  { code: 'AS', name: 'Alaska Airlines', country: 'USA', rating: 4.6 },
  { code: 'B6', name: 'JetBlue Airways', country: 'USA', rating: 4.4 },
  { code: 'NK', name: 'Spirit Airlines', country: 'USA', rating: 3.8 },
  { code: 'F9', name: 'Frontier Airlines', country: 'USA', rating: 3.8 },
  { code: 'HA', name: 'Hawaiian Airlines', country: 'USA', rating: 4.6 },
  { code: 'MX', name: 'Breeze Airways', country: 'USA', rating: 4.3 },
  { code: 'AC', name: 'Air Canada', country: 'Canada', rating: 4.5 },
  { code: 'WS', name: 'WestJet', country: 'Canada', rating: 4.4 },
  { code: 'TS', name: 'Air Transat', country: 'Canada', rating: 4.3 },
  { code: 'PD', name: 'Porter Airlines', country: 'Canada', rating: 4.5 },
  { code: 'AM', name: 'Aeromexico', country: 'Mexico', rating: 4.4 },

  // 176-190: Latin America & Oceania
  { code: 'Y4', name: 'Volaris', country: 'Mexico', rating: 4.1 },
  { code: 'VB', name: 'VivaAerobus', country: 'Mexico', rating: 4.0 },
  { code: 'CM', name: 'Copa Airlines', country: 'Panama', rating: 4.6 },
  { code: 'AV', name: 'Avianca', country: 'Colombia', rating: 4.2 },
  { code: 'LA', name: 'LATAM Airlines', country: 'Chile/Brazil', rating: 4.5 },
  { code: 'G3', name: 'Gol Transportes Aéreos', country: 'Brazil', rating: 4.2 },
  { code: 'AD', name: 'Azul Brazilian Airlines', country: 'Brazil', rating: 4.6 },
  { code: 'AR', name: 'Aerolineas Argentinas', country: 'Argentina', rating: 4.1 },
  { code: 'FO', name: 'Flybondi', country: 'Argentina', rating: 4.0 },
  { code: 'H2', name: 'SKY Airline', country: 'Chile', rating: 4.2 },
  { code: 'QF', name: 'Qantas', country: 'Australia', rating: 4.7 },
  { code: 'JQ', name: 'Jetstar Airways', country: 'Australia', rating: 4.2 },
  { code: 'VA', name: 'Virgin Australia', country: 'Australia', rating: 4.5 },
  { code: 'ZL', name: 'Rex Airlines', country: 'Australia', rating: 4.2 },
  { code: 'NZ', name: 'Air New Zealand', country: 'New Zealand', rating: 4.8 },

  // 191-200: Pacific & Africa
  { code: 'FJ', name: 'Fiji Airways', country: 'Fiji', rating: 4.5 },
  { code: 'PX', name: 'Air Niugini', country: 'Papua New Guinea', rating: 4.0 },
  { code: 'TN', name: 'Air Tahiti Nui', country: 'French Polynesia', rating: 4.6 },
  { code: 'SB', name: 'Aircalin', country: 'New Caledonia', rating: 4.3 },
  { code: 'ET', name: 'Ethiopian Airlines', country: 'Ethiopia', rating: 4.5 },
  { code: 'MS', name: 'EgyptAir', country: 'Egypt', rating: 4.2 },
  { code: 'SA', name: 'South African Airways', country: 'South Africa', rating: 4.2 },
  { code: 'KQ', name: 'Kenya Airways', country: 'Kenya', rating: 4.3 },
  { code: 'AT', name: 'Royal Air Maroc', country: 'Morocco', rating: 4.2 },
  { code: 'MK', name: 'Air Mauritius', country: 'Mauritius', rating: 4.5 }
];

// Modern commercial aircraft models
const AIRCRAFT_TYPES = [
  'Airbus A350-900',
  'Boeing 787-9 Dreamliner',
  'Airbus A321neo',
  'Boeing 777-300ER',
  'Airbus A320neo',
  'Boeing 737 MAX 8',
  'Airbus A330-900neo',
  'Boeing 787-10 Dreamliner',
  'Airbus A380-800'
];

// Popular destinations with realistic flight times and base pricing
const POPULAR_DESTINATIONS = [
  { code: 'NRT', nameTH: 'โตเกียว (นาริตะ)', nameEN: 'Tokyo', region: 'japan', duration: 375, basePrice: 8900 },
  { code: 'HND', nameTH: 'โตเกียว (ฮาเนดะ)', nameEN: 'Tokyo', region: 'japan', duration: 370, basePrice: 9400 },
  { code: 'KIX', nameTH: 'โอซาก้า', nameEN: 'Osaka', region: 'japan', duration: 345, basePrice: 8500 },
  { code: 'CTS', nameTH: 'ซัปโปโร', nameEN: 'Sapporo', region: 'japan', duration: 410, basePrice: 10500 },
  { code: 'FUK', nameTH: 'ฟุกุโอกะ', nameEN: 'Fukuoka', region: 'japan', duration: 320, basePrice: 7900 },
  { code: 'ICN', nameTH: 'โซล (อินชอน)', nameEN: 'Seoul', region: 'korea', duration: 335, basePrice: 7500 },
  { code: 'PUS', nameTH: 'ปูซาน', nameEN: 'Busan', region: 'korea', duration: 325, basePrice: 7200 },
  { code: 'SIN', nameTH: 'สิงคโปร์', nameEN: 'Singapore', region: 'asia', duration: 145, basePrice: 3200 },
  { code: 'HKG', nameTH: 'ฮ่องกง', nameEN: 'Hong Kong', region: 'asia', duration: 170, basePrice: 4200 },
  { code: 'TPE', nameTH: 'ไทเป', nameEN: 'Taipei', region: 'asia', duration: 225, basePrice: 5100 },
  { code: 'KUL', nameTH: 'กัวลาลัมเปอร์', nameEN: 'Kuala Lumpur', region: 'asia', duration: 130, basePrice: 2800 },
  { code: 'DPS', nameTH: 'บาหลี', nameEN: 'Bali', region: 'asia', duration: 260, basePrice: 4800 },
  { code: 'HAN', nameTH: 'ฮานอย', nameEN: 'Hanoi', region: 'asia', duration: 110, basePrice: 2600 },
  { code: 'SGN', nameTH: 'โฮจิมินห์', nameEN: 'Ho Chi Minh', region: 'asia', duration: 95, basePrice: 2400 },
  { code: 'DXB', nameTH: 'ดูไบ', nameEN: 'Dubai', region: 'mideast', duration: 400, basePrice: 11200 },
  { code: 'LHR', nameTH: 'ลอนดอน (ฮีทโธรว์)', nameEN: 'London', region: 'europe', duration: 740, basePrice: 19800 },
  { code: 'CDG', nameTH: 'ปารีส (ชาร์ล เดอ โกล)', nameEN: 'Paris', region: 'europe', duration: 730, basePrice: 19500 },
  { code: 'FRA', nameTH: 'แฟรงก์เฟิร์ต', nameEN: 'Frankfurt', region: 'europe', duration: 715, basePrice: 19200 },
  { code: 'ZRH', nameTH: 'ซูริก', nameEN: 'Zurich', region: 'europe', duration: 725, basePrice: 20500 },
  { code: 'SYD', nameTH: 'ซิดนีย์', nameEN: 'Sydney', region: 'oceania', duration: 550, basePrice: 16500 },
  { code: 'MEL', nameTH: 'เมลเบิร์น', nameEN: 'Melbourne', region: 'oceania', duration: 540, basePrice: 16200 },
  { code: 'CNX', nameTH: 'เชียงใหม่', nameEN: 'Chiang Mai', region: 'domestic', duration: 75, basePrice: 1450 },
  { code: 'HKT', nameTH: 'ภูเก็ต', nameEN: 'Phuket', region: 'domestic', duration: 85, basePrice: 1650 },
  { code: 'KBV', nameTH: 'กระบี่', nameEN: 'Krabi', region: 'domestic', duration: 80, basePrice: 1550 },
  { code: 'USM', nameTH: 'เกาะสมุย', nameEN: 'Samui', region: 'domestic', duration: 65, basePrice: 2950 },
  { code: 'CEI', nameTH: 'เชียงราย', nameEN: 'Chiang Rai', region: 'domestic', duration: 85, basePrice: 1590 },
  { code: 'HDY', nameTH: 'หาดใหญ่', nameEN: 'Hat Yai', region: 'domestic', duration: 90, basePrice: 1690 },
];

/**
 * Generate 200 distinct, realistic flights across all 200 airlines.
 * Supports specific route or distributed master catalog across top destinations.
 */
function generate200Flights(from = 'BKK', to = 'SIN', date = '') {
  const baseDate = date || new Date().toISOString().split('T')[0];
  const isAllRoutes = !to || to.toUpperCase() === 'ALL';

  return AIRLINES.map((air, index) => {
    const dest = isAllRoutes
      ? POPULAR_DESTINATIONS[index % POPULAR_DESTINATIONS.length]
      : (POPULAR_DESTINATIONS.find(d => d.code === to.toUpperCase()) || {
          code: to.toUpperCase(),
          nameTH: to.toUpperCase(),
          nameEN: to.toUpperCase(),
          region: 'international',
          duration: 160,
          basePrice: 3800
        });

    // Distribute departure times across 24 hours (every 7 minutes)
    const totalMinutes = (index * 7 + 360) % 1440; // Starts from 06:00
    const depH = Math.floor(totalMinutes / 60);
    const depM = totalMinutes % 60;
    const depTime = String(depH).padStart(2, '0') + ':' + String(depM).padStart(2, '0');

    // Duration with slight variance
    const duration = Math.max(60, dest.duration + ((index * 3) % 25) - 10);
    const arrTotalMinutes = (totalMinutes + duration) % 1440;
    const arrH = Math.floor(arrTotalMinutes / 60);
    const arrM = arrTotalMinutes % 60;
    const arrTime = String(arrH).padStart(2, '0') + ':' + String(arrM).padStart(2, '0');

    // Stops: 75% direct flights, 25% 1-stop connecting
    const stops = index % 4 === 0 && index > 10 ? 1 : 0;

    // Flight number
    const flightNum = 100 + ((index * 23 + 17) % 890);
    const flightCode = air.code + ' ' + flightNum;

    // Price: realistic pricing with market variance
    const stopMultiplier = stops === 0 ? 1.0 : 0.85;
    const variance = ((index * 47) % 800) - 300;
    const calcPrice = Math.max(990, Math.round((dest.basePrice * stopMultiplier + variance) / 10) * 10);

    // Aircraft model
    const aircraft = AIRCRAFT_TYPES[index % AIRCRAFT_TYPES.length];

    return {
      id: index + 1,
      airline: air.name,
      airlineCode: air.code,
      country: air.country,
      rating: air.rating,
      code: flightCode,
      from: from.toUpperCase(),
      to: dest.code,
      destName: dest.nameTH,
      destEn: dest.nameEN,
      region: dest.region,
      route: from.toUpperCase() + ' ➔ ' + dest.code,
      dep: depTime,
      arr: arrTime,
      duration,
      stops,
      price: calcPrice,
      aircraft,
      date: baseDate
    };
  });
}

module.exports = {
  AIRLINES,
  POPULAR_DESTINATIONS,
  generate200Flights
};
