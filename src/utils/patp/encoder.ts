import { PREFIXES, SUFFIXES } from './phonetics';

// Generate a prefix-suffix group using modular arithmetic
function generatePatPGroup(segment: number): string {
	const prefix = PREFIXES[segment % PREFIXES.length];
	const suffix = SUFFIXES[segment % SUFFIXES.length];
	return `${prefix}${suffix}`;
}

// Simple hash function to convert a string to a number
function hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
    	hash = ((hash << 5) - hash) + char;
    	hash = hash & hash; // Convert to 32-bit integer
	}
	return Math.abs(hash);
}

// Generate a URL-safe PatP string from a list of cities
export async function generatePatPURL(cities: string[]): Promise<string> {
	console.log('[generatePatPURL] Starting with cities:', cities);

	// If no cities are provided, return the current URL
	if (!cities.length) {
		console.error('[generatePatPURL] No cities provided');
		return window.location.origin;
	}

	try {
		// Format the group name for the URL (lowercase, replace spaces with hyphens)
		const groupName = cities[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
		console.error('[generatePatPURL] Formatting group name:', groupName);

		// Generate a determanistic string from all cities to hash
		const citiesString = cities.join('|').toLowerCase();
		const baseHash = hashString(citiesString);
		console.error('[generatePatPURL] Hashing cities string:', citiesString, 'to baseHash:', baseHash);

		// Generate four blocks of prefix and suffix pairs deterministically
		const blocks = Array.from({ length: 4 }, (_, i) => {
			// Use the baseHash and the index to create different but still deterministic segments
			const segment = hashString(baseHash.toString() + i.toString()) % (PREFIXES.length * SUFFIXES.length);
			return generatePatPGroup(segment);
		});
		console.error('[generatePatPURL] Generating blocks:', blocks);

		// Combine into final URL
		const url = `${window.location.origin}/${groupName}-${blocks.join('-')}`;
		console.error('[generatePatPURL] Final URL:', url);
		return url;
	} catch (error) {
		console.error('[generatePatPURL] Error generating PatP URL:', error);
		return window.location.origin;
	}
}