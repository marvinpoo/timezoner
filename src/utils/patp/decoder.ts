import { PREFIXES, SUFFIXES } from './phonetics';

// Reverse map a prefix-suffix pair to its original integer segment
function decodePatPGroup(group: string): number {
  console.log('[decodePatPGroup] Decoding group:', group);
  
  if (!group || group.length !== 6) {
    console.error('[decodePatPGroup] Invalid group length:', {
      group,
      length: group?.length
    });
    throw new Error(`Invalid group length: ${group}`);
  }
  
  const prefix = group.substring(0, 3);
  const suffix = group.substring(3, 6);
  console.log('[decodePatPGroup] Split group:', { prefix, suffix });
  
  const prefixIndex = PREFIXES.indexOf(prefix);
  const suffixIndex = SUFFIXES.indexOf(suffix);
  console.log('[decodePatPGroup] Found indices:', { prefixIndex, suffixIndex });

  if (prefixIndex === -1 || suffixIndex === -1) {
    console.error('[decodePatPGroup] Invalid prefix or suffix:', {
      prefix,
      suffix,
      prefixFound: prefixIndex !== -1,
      suffixFound: suffixIndex !== -1
    });
    throw new Error(`Invalid prefix or suffix in group: ${group}`);
  }

  const result = prefixIndex * SUFFIXES.length + suffixIndex;
  console.log('[decodePatPGroup] Calculated result:', result);
  return result;
}

// Extracts the encoded blocks from a PatP-style URL
export function decodePatPURL(url: string): string[] {
  console.log('[decodePatPURL] Starting with URL:', url);
  
  try {
    const urlPath = url.split('/').pop();
    console.log('[decodePatPURL] Extracted path:', urlPath);
    
    if (!urlPath) {
      console.error('[decodePatPURL] No path segments found');
      throw new Error("Invalid URL format: No path segments");
    }

    const segments = urlPath.split('-');
    console.log('[decodePatPURL] Split segments:', segments);
    
    if (segments.length < 5) {
      console.error('[decodePatPURL] Insufficient segments:', segments.length);
      throw new Error("Invalid URL format: Insufficient segments");
    }

    // The last four segments should be the encoded blocks
    // Everything before that is part of the group name
    const encodedBlocks = segments.slice(-4);
    const groupNameParts = segments.slice(0, -4);
    const groupName = groupNameParts.join('-');

    console.log('[decodePatPURL] Extracted parts:', {
      groupName,
      encodedBlocks
    });

    if (encodedBlocks.length !== 4) {
      console.error('[decodePatPURL] Invalid number of blocks:', encodedBlocks.length);
      throw new Error(`Invalid encoded format: Expected 4 blocks, got ${encodedBlocks.length}`);
    }

    // Validate each block is a valid PatP group
    encodedBlocks.forEach((block, index) => {
      console.log(`[decodePatPURL] Validating block ${index}:`, block);
      if (!block || block.length !== 6) {
        console.error(`[decodePatPURL] Invalid block ${index}:`, block);
        throw new Error(`Invalid block ${index + 1}: ${block}`);
      }
    });

    // Convert prefix-suffix groups back to numeric segments
    const numericSegments = encodedBlocks.map(decodePatPGroup);
    console.log('[decodePatPURL] Decoded numeric segments:', numericSegments);

    /* // Reconstruct SHA-256 hash
    const reconstructedHash = numericSegments
      .map(seg => seg.toString(16).padStart(16, '0'))
      .join('');
    console.log('[decodePatPURL] Reconstructed hash:', reconstructedHash);

    // Return the group name as the first city
    console.log('[decodePatPURL] Returning group name:', [groupName]);
    return [groupName]; */

    // Format the group name (replace hyphens with spaces, capitalize first letter)
    const formattedGroupName = groupName
     .split('-')
     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
     .join(' ');

     console.log('[decodePatPURL] Formatted group name:', formattedGroupName);
    return [formattedGroupName];

  } catch (error) {
    console.error('[decodePatPURL] Error decoding URL:', {
      error,
      url,
      path: url.split('/').pop()
    });
    return [];
  }
}