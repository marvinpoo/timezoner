import { timezoneData } from './timezoneData';
import { Timezone } from '../types/timezone';

// Create a flattened list of all timezones with their associated locations
export const timezones: Timezone[] = timezoneData.flatMap(country => 
  country.regions.flatMap(region => 
    region.cities.map(city => ({
      name: country.timezones.find(tz => tz.value === city.timezone)?.name || city.timezone,
      country: country.name,
      city: city.name,
      region: region.name,
      offset: country.timezones.find(tz => tz.value === city.timezone)?.offset || '+00:00',
      value: city.timezone
    }))
  )
).sort((a, b) => {
  // Parse the offset for proper sorting
  const getOffsetMinutes = (offset: string) => {
    const [sign, hours, minutes] = offset.match(/([+-])(\d{2}):(\d{2})/)?.slice(1) || ['+', '00', '00'];
    return (sign === '+' ? 1 : -1) * (parseInt(hours) * 60 + parseInt(minutes));
  };

  const offsetA = getOffsetMinutes(a.offset);
  const offsetB = getOffsetMinutes(b.offset);

  if (offsetA !== offsetB) return offsetA - offsetB;
  if (a.country !== b.country) return a.country.localeCompare(b.country);
  return a.city.localeCompare(b.city);
});