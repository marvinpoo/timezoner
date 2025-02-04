import { PREFIXES, SUFFIXES } from './phonetics';

// Generate a prefix-suffix group using modular arithmetic
function generatePatPGroup(segment: number): string {
  const prefix = PREFIXES[segment % PREFIXES.length];
  const suffix = SUFFIXES[segment % SUFFIXES.length];
  return `${prefix}${suffix}`;
}

// Generate a URL-safe PatP string from a list of cities
export async function generatePatPURL(cities: string[]): Promise<string> {
  console.log('[generatePatPURL] Starting with cities:', cities);
  
  if (!cities.length) {
    console.error('[generatePatPURL] No cities provided');
    return window.location.origin;
  }

  try {
    // Format the group name for the URL (lowercase, replace spaces with hyphens)
    const groupName = cities[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
    console.log('[generatePatPURL] Formatted group name:', groupName);

    // Generate four blocks of prefix-suffix pairs
    const blocks = Array.from({ length: 4 }, (_, i) => {
      const segment = Math.floor(Math.random() * (PREFIXES.length * SUFFIXES.length));
      return generatePatPGroup(segment);
    });
    console.log('[generatePatPURL] Generated blocks:', blocks);

    // Combine into final URL
    const url = `${window.location.origin}/${groupName}-${blocks.join('-')}`;
    console.log('[generatePatPURL] Final URL:', url);
    return url;
  } catch (error) {
    console.error('[generatePatPURL] Error generating URL:', error);
    return window.location.origin;
  }
}