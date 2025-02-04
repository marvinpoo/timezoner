import { getTimeZones, rawTimeZones } from '@vvo/tzdb';
import { Country } from '../types/timezone';

function generateTimezoneData(): Country[] {
  const timeZones = getTimeZones();
  const countries = new Map<string, Country>();

  timeZones.forEach(tz => {
    const mainCity = tz.mainCities[0] || tz.name.split('/').pop() || '';
    const countryCode = tz.countryCode;
    const countryName = tz.countryName;
    const region = tz.continentName;

    if (!countries.has(countryCode)) {
      countries.set(countryCode, {
        name: countryName,
        code: countryCode,
        regions: [],
        timezones: []
      });
    }

    const country = countries.get(countryCode)!;

    // Add timezone if not already present
    const timezoneExists = country.timezones.some(t => t.value === tz.name);
    if (!timezoneExists) {
      country.timezones.push({
        name: `GMT${tz.currentTimeFormat}`,
        offset: tz.currentTimeFormat,
        value: tz.name
      });
    }

    // Find or create region
    let region_obj = country.regions.find(r => r.name === region);
    if (!region_obj) {
      region_obj = {
        name: region,
        cities: []
      };
      country.regions.push(region_obj);
    }

    // Add all cities from the timezone
    tz.mainCities.forEach(city => {
      if (!region_obj!.cities.some(c => c.name === city)) {
        region_obj!.cities.push({
          name: city,
          timezone: tz.name,
          coordinates: [tz.latitude, tz.longitude]
        });
      }
    });
  });

  return Array.from(countries.values());
}

export const timezoneData = generateTimezoneData();