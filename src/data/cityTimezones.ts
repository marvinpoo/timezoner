// Comprehensive list of major cities with their timezone information
const cityTimezones: Record<string, Array<{ name: string; region: string; timezone: string }>> = {
  US: [
    { name: 'New York', region: 'Eastern', timezone: 'America/New_York' },
    { name: 'Los Angeles', region: 'Pacific', timezone: 'America/Los_Angeles' },
    { name: 'Chicago', region: 'Central', timezone: 'America/Chicago' },
    { name: 'Houston', region: 'Central', timezone: 'America/Chicago' },
    { name: 'Phoenix', region: 'Mountain', timezone: 'America/Phoenix' },
    { name: 'Philadelphia', region: 'Eastern', timezone: 'America/New_York' },
    { name: 'San Francisco', region: 'Pacific', timezone: 'America/Los_Angeles' },
    { name: 'Denver', region: 'Mountain', timezone: 'America/Denver' },
    { name: 'Miami', region: 'Eastern', timezone: 'America/New_York' },
    { name: 'Seattle', region: 'Pacific', timezone: 'America/Los_Angeles' },
    { name: 'Boston', region: 'Eastern', timezone: 'America/New_York' },
    { name: 'Las Vegas', region: 'Pacific', timezone: 'America/Los_Angeles' },
    { name: 'Atlanta', region: 'Eastern', timezone: 'America/New_York' },
    { name: 'Honolulu', region: 'Hawaii', timezone: 'Pacific/Honolulu' },
    { name: 'Anchorage', region: 'Alaska', timezone: 'America/Anchorage' },
  ],
  GB: [
    { name: 'London', region: 'England', timezone: 'Europe/London' },
    { name: 'Manchester', region: 'England', timezone: 'Europe/London' },
    { name: 'Birmingham', region: 'England', timezone: 'Europe/London' },
    { name: 'Edinburgh', region: 'Scotland', timezone: 'Europe/London' },
    { name: 'Glasgow', region: 'Scotland', timezone: 'Europe/London' },
    { name: 'Liverpool', region: 'England', timezone: 'Europe/London' },
    { name: 'Leeds', region: 'England', timezone: 'Europe/London' },
    { name: 'Cardiff', region: 'Wales', timezone: 'Europe/London' },
    { name: 'Belfast', region: 'Northern Ireland', timezone: 'Europe/London' },
  ],
  DE: [
    { name: 'Berlin', region: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Hamburg', region: 'Hamburg', timezone: 'Europe/Berlin' },
    { name: 'Munich', region: 'Bavaria', timezone: 'Europe/Berlin' },
    { name: 'Frankfurt', region: 'Hesse', timezone: 'Europe/Berlin' },
    { name: 'Cologne', region: 'North Rhine-Westphalia', timezone: 'Europe/Berlin' },
    { name: 'Stuttgart', region: 'Baden-Württemberg', timezone: 'Europe/Berlin' },
    { name: 'Dresden', region: 'Saxony', timezone: 'Europe/Berlin' },
    { name: 'Leipzig', region: 'Saxony', timezone: 'Europe/Berlin' },
    { name: 'Düsseldorf', region: 'North Rhine-Westphalia', timezone: 'Europe/Berlin' },
  ],
  FR: [
    { name: 'Paris', region: 'Île-de-France', timezone: 'Europe/Paris' },
    { name: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', timezone: 'Europe/Paris' },
    { name: 'Lyon', region: 'Auvergne-Rhône-Alpes', timezone: 'Europe/Paris' },
    { name: 'Toulouse', region: 'Occitanie', timezone: 'Europe/Paris' },
    { name: 'Nice', region: 'Provence-Alpes-Côte d\'Azur', timezone: 'Europe/Paris' },
  ],
  ES: [
    { name: 'Madrid', region: 'Community of Madrid', timezone: 'Europe/Madrid' },
    { name: 'Barcelona', region: 'Catalonia', timezone: 'Europe/Madrid' },
    { name: 'Valencia', region: 'Valencian Community', timezone: 'Europe/Madrid' },
    { name: 'Seville', region: 'Andalusia', timezone: 'Europe/Madrid' },
  ],
  IT: [
    { name: 'Rome', region: 'Lazio', timezone: 'Europe/Rome' },
    { name: 'Milan', region: 'Lombardy', timezone: 'Europe/Rome' },
    { name: 'Naples', region: 'Campania', timezone: 'Europe/Rome' },
    { name: 'Turin', region: 'Piedmont', timezone: 'Europe/Rome' },
    { name: 'Florence', region: 'Tuscany', timezone: 'Europe/Rome' },
  ],
  JP: [
    { name: 'Tokyo', region: 'Kantō', timezone: 'Asia/Tokyo' },
    { name: 'Osaka', region: 'Kansai', timezone: 'Asia/Tokyo' },
    { name: 'Yokohama', region: 'Kantō', timezone: 'Asia/Tokyo' },
    { name: 'Nagoya', region: 'Chūbu', timezone: 'Asia/Tokyo' },
    { name: 'Sapporo', region: 'Hokkaido', timezone: 'Asia/Tokyo' },
    { name: 'Fukuoka', region: 'Kyushu', timezone: 'Asia/Tokyo' },
    { name: 'Kobe', region: 'Kansai', timezone: 'Asia/Tokyo' },
  ],
  CN: [
    { name: 'Beijing', region: 'Beijing', timezone: 'Asia/Shanghai' },
    { name: 'Shanghai', region: 'Shanghai', timezone: 'Asia/Shanghai' },
    { name: 'Guangzhou', region: 'Guangdong', timezone: 'Asia/Shanghai' },
    { name: 'Shenzhen', region: 'Guangdong', timezone: 'Asia/Shanghai' },
    { name: 'Chengdu', region: 'Sichuan', timezone: 'Asia/Shanghai' },
  ],
  AU: [
    { name: 'Sydney', region: 'New South Wales', timezone: 'Australia/Sydney' },
    { name: 'Melbourne', region: 'Victoria', timezone: 'Australia/Melbourne' },
    { name: 'Brisbane', region: 'Queensland', timezone: 'Australia/Brisbane' },
    { name: 'Perth', region: 'Western Australia', timezone: 'Australia/Perth' },
    { name: 'Adelaide', region: 'South Australia', timezone: 'Australia/Adelaide' },
    { name: 'Gold Coast', region: 'Queensland', timezone: 'Australia/Brisbane' },
    { name: 'Canberra', region: 'Australian Capital Territory', timezone: 'Australia/Sydney' },
  ],
  BR: [
    { name: 'São Paulo', region: 'São Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Rio de Janeiro', region: 'Rio de Janeiro', timezone: 'America/Sao_Paulo' },
    { name: 'Brasília', region: 'Federal District', timezone: 'America/Sao_Paulo' },
    { name: 'Salvador', region: 'Bahia', timezone: 'America/Bahia' },
  ],
  RU: [
    { name: 'Moscow', region: 'Moscow', timezone: 'Europe/Moscow' },
    { name: 'Saint Petersburg', region: 'Northwestern', timezone: 'Europe/Moscow' },
    { name: 'Novosibirsk', region: 'Siberian', timezone: 'Asia/Novosibirsk' },
    { name: 'Yekaterinburg', region: 'Ural', timezone: 'Asia/Yekaterinburg' },
    { name: 'Vladivostok', region: 'Far Eastern', timezone: 'Asia/Vladivostok' },
  ],
  IN: [
    { name: 'New Delhi', region: 'Delhi', timezone: 'Asia/Kolkata' },
    { name: 'Mumbai', region: 'Maharashtra', timezone: 'Asia/Kolkata' },
    { name: 'Bangalore', region: 'Karnataka', timezone: 'Asia/Kolkata' },
    { name: 'Chennai', region: 'Tamil Nadu', timezone: 'Asia/Kolkata' },
    { name: 'Kolkata', region: 'West Bengal', timezone: 'Asia/Kolkata' },
  ],
  SG: [
    { name: 'Singapore', region: 'Singapore', timezone: 'Asia/Singapore' },
  ],
  AE: [
    { name: 'Dubai', region: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Abu Dhabi', region: 'Abu Dhabi', timezone: 'Asia/Dubai' },
  ],
  ZA: [
    { name: 'Johannesburg', region: 'Gauteng', timezone: 'Africa/Johannesburg' },
    { name: 'Cape Town', region: 'Western Cape', timezone: 'Africa/Johannesburg' },
    { name: 'Durban', region: 'KwaZulu-Natal', timezone: 'Africa/Johannesburg' },
  ],
};

export default cityTimezones;