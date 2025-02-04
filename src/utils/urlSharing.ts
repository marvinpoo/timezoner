import { Timezone } from '../types/timezone';
import { timezones } from '../data/timezones';
import { generatePatPURL } from './patp/encoder';
import { decodePatPURL } from './patp/decoder';

// Find a timezone by city name (case-insensitive, partial match)
export function findTimezoneByCity(cityString: string): Timezone | undefined {
  console.log('[findTimezoneByCity] Searching for city:', cityString);
  const normalizedSearch = cityString.toLowerCase().trim();
  const found = timezones.find(tz => {
    const cityName = tz.city.toLowerCase();
    return cityName === normalizedSearch || cityName.includes(normalizedSearch);
  });
  console.log('[findTimezoneByCity] Found timezone:', found);
  return found;
}

// Generate a shareable URL for a group
export async function generateShareableUrl(groupName: string, cities: string[]): Promise<string> {
  console.log('[generateShareableUrl] Input:', { groupName, cities });
  
  if (!groupName || cities.length === 0) {
    console.log('[generateShareableUrl] No group name or cities provided, returning origin');
    return window.location.origin;
  }

  try {
    // Format the group name for the URL (lowercase, replace spaces with hyphens)
    const formattedGroupName = groupName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = await generatePatPURL([formattedGroupName, ...cities]);
    console.log('[generateShareableUrl] Generated URL:', url);
    return url;
  } catch (error) {
    console.error('[generateShareableUrl] Error:', error);
    return window.location.origin;
  }
}

// Parse a shared URL to extract city names
export function parseSharedUrl(params: URLSearchParams): string[] {
  console.log('[parseSharedUrl] Starting with params:', params.toString());
  console.log('[parseSharedUrl] Current pathname:', window.location.pathname);
  
  const path = window.location.pathname;
  if (!path || path === '/') {
    console.log('[parseSharedUrl] No path or root path, returning empty array');
    return [];
  }

  // Remove leading slash and split by dashes
  const segments = path.substring(1).split('-');
  console.log('[parseSharedUrl] Path segments:', segments);
  
  if (segments.length < 5) {
    console.log('[parseSharedUrl] Insufficient segments, returning empty array');
    return [];
  }

  try {
    const cities = decodePatPURL(window.location.origin + path);
    console.log('[parseSharedUrl] Decoded cities:', cities);
    return cities;
  } catch (error) {
    console.error('[parseSharedUrl] Error decoding URL:', error);
    return [];
  }
}