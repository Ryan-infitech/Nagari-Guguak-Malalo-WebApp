/**
 * Slug Utility Functions
 * Fungsi utility untuk manipulasi slug dan URL-friendly strings
 */

/**
 * Generate slug from text
 */
export const generateSlug = (
  text: string,
  options: {
    maxLength?: number;
    separator?: string;
    lowercase?: boolean;
    removeDiacritics?: boolean;
  } = {}
): string => {
  const {
    maxLength = 100,
    separator = "-",
    lowercase = true,
    removeDiacritics = true,
  } = options;

  if (!text || typeof text !== "string") {
    return "";
  }

  let slug = text.trim();

  // Convert to lowercase if specified
  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Remove diacritics (accents) if specified
  if (removeDiacritics) {
    slug = removeDiacriticsFromText(slug);
  }

  // Replace Indonesian characters
  slug = slug
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[ç]/g, "c")
    .replace(/[ýÿ]/g, "y");

  // Replace spaces with separator
  slug = slug.replace(/\s+/g, separator);

  // Remove special characters (keep only letters, numbers, and separator)
  const separatorRegex =
    separator === "-"
      ? "\\-"
      : separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const allowedCharsRegex = new RegExp(`[^a-z0-9${separatorRegex}]`, "g");
  slug = slug.replace(allowedCharsRegex, "");

  // Remove consecutive separators
  const consecutiveSeparatorRegex = new RegExp(`${separatorRegex}{2,}`, "g");
  slug = slug.replace(consecutiveSeparatorRegex, separator);

  // Remove separator from start and end
  const trimSeparatorRegex = new RegExp(
    `^${separatorRegex}+|${separatorRegex}+$`,
    "g"
  );
  slug = slug.replace(trimSeparatorRegex, "");

  // Truncate if too long
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);

    // Remove trailing separator if truncation created one
    slug = slug.replace(new RegExp(`${separatorRegex}+$`), "");
  }

  return slug;
};

/**
 * Remove diacritics from text
 */
const removeDiacriticsFromText = (text: string): string => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Generate unique slug with counter
 */
export const generateUniqueSlug = (
  text: string,
  existingSlugs: string[],
  options?: {
    maxLength?: number;
    separator?: string;
    lowercase?: boolean;
    removeDiacritics?: boolean;
  }
): string => {
  const baseSlug = generateSlug(text, options);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
};

/**
 * Validate slug format
 */
export const isValidSlug = (
  slug: string,
  options: {
    minLength?: number;
    maxLength?: number;
    separator?: string;
    allowNumbers?: boolean;
  } = {}
): boolean => {
  const {
    minLength = 1,
    maxLength = 100,
    separator = "-",
    allowNumbers = true,
  } = options;

  if (!slug || typeof slug !== "string") {
    return false;
  }

  // Check length
  if (slug.length < minLength || slug.length > maxLength) {
    return false;
  }

  // Check format
  const separatorRegex =
    separator === "-"
      ? "\\-"
      : separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = allowNumbers
    ? `^[a-z0-9${separatorRegex}]+$`
    : `^[a-z${separatorRegex}]+$`;

  const regex = new RegExp(pattern);

  if (!regex.test(slug)) {
    return false;
  }

  // Check for consecutive separators
  const consecutiveSeparatorRegex = new RegExp(`${separatorRegex}{2,}`);
  if (consecutiveSeparatorRegex.test(slug)) {
    return false;
  }

  // Check for separator at start or end
  const edgeSeparatorRegex = new RegExp(
    `^${separatorRegex}|${separatorRegex}$`
  );
  if (edgeSeparatorRegex.test(slug)) {
    return false;
  }

  return true;
};

/**
 * Convert slug back to readable text
 */
export const slugToText = (
  slug: string,
  options: {
    separator?: string;
    titleCase?: boolean;
    removeNumbers?: boolean;
  } = {}
): string => {
  const { separator = "-", titleCase = true, removeNumbers = false } = options;

  if (!slug || typeof slug !== "string") {
    return "";
  }

  let text = slug;

  // Remove numbers if specified
  if (removeNumbers) {
    text = text.replace(/\d+/g, "");
  }

  // Replace separator with spaces
  const separatorRegex =
    separator === "-"
      ? "\\-"
      : separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  text = text.replace(new RegExp(separatorRegex, "g"), " ");

  // Clean up extra spaces
  text = text.replace(/\s+/g, " ").trim();

  // Convert to title case if specified
  if (titleCase) {
    text = text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  return text;
};

/**
 * Generate slug from Indonesian text
 */
export const generateIndonesianSlug = (text: string): string => {
  // Indonesian character replacements
  const indonesianReplacements: Record<string, string> = {
    ā: "a",
    ē: "e",
    ī: "i",
    ō: "o",
    ū: "u",
    dan: "dan",
    atau: "atau",
    yang: "yang",
    di: "di",
    ke: "ke",
    dari: "dari",
    untuk: "untuk",
    dengan: "dengan",
  };

  let processedText = text.toLowerCase();

  // Apply Indonesian replacements
  Object.entries(indonesianReplacements).forEach(([from, to]) => {
    const regex = new RegExp(`\\b${from}\\b`, "g");
    processedText = processedText.replace(regex, to);
  });

  return generateSlug(processedText);
};

/**
 * Extract slug from URL
 */
export const extractSlugFromUrl = (url: string): string => {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname
      .split("/")
      .filter((segment) => segment.length > 0);

    // Return the last segment as slug
    return pathSegments[pathSegments.length - 1] || "";
  } catch (error) {
    // If URL is invalid, try to extract from path-like string
    const segments = url.split("/").filter((segment) => segment.length > 0);
    return segments[segments.length - 1] || "";
  }
};

/**
 * Generate breadcrumb from slug
 */
export const generateBreadcrumbFromSlug = (
  slug: string,
  basePath: string = ""
): Array<{ label: string; path: string }> => {
  if (!slug) {
    return [];
  }

  const segments = slug.split("-");
  const breadcrumbs: Array<{ label: string; path: string }> = [];

  let currentPath = basePath;

  segments.forEach((segment, index) => {
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    currentPath += (index === 0 ? "" : "-") + segment;

    breadcrumbs.push({
      label,
      path: currentPath,
    });
  });

  return breadcrumbs;
};

/**
 * Suggest similar slugs
 */
export const suggestSimilarSlugs = (
  targetSlug: string,
  existingSlugs: string[],
  maxSuggestions: number = 5
): string[] => {
  if (!targetSlug || !Array.isArray(existingSlugs)) {
    return [];
  }

  const suggestions: Array<{ slug: string; similarity: number }> = [];

  existingSlugs.forEach((slug) => {
    const similarity = calculateSimilarity(targetSlug, slug);
    if (similarity > 0.3) {
      // Minimum similarity threshold
      suggestions.push({ slug, similarity });
    }
  });

  // Sort by similarity and return top suggestions
  return suggestions
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxSuggestions)
    .map((item) => item.slug);
};

/**
 * Calculate similarity between two strings
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) {
    return 1.0;
  }

  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

/**
 * Calculate edit distance between two strings
 */
const getEditDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

/**
 * Optimize slug for SEO
 */
export const optimizeSlugForSEO = (
  text: string,
  keywords: string[] = []
): string => {
  let slug = generateSlug(text);

  // Add important keywords if not present
  keywords.forEach((keyword) => {
    const keywordSlug = generateSlug(keyword);
    if (!slug.includes(keywordSlug)) {
      slug = `${keywordSlug}-${slug}`;
    }
  });

  // Ensure slug is not too long for SEO
  if (slug.length > 60) {
    slug = slug.substring(0, 57) + "...";
    slug = slug.replace(/-\.\.\.$/, "");
  }

  return slug;
};

/**
 * Check if slug is SEO-friendly
 */
export const isSEOFriendlySlug = (
  slug: string
): {
  friendly: boolean;
  issues: string[];
  suggestions: string[];
} => {
  const issues: string[] = [];
  const suggestions: string[] = [];

  if (!slug) {
    issues.push("Slug kosong");
    return { friendly: false, issues, suggestions };
  }

  // Check length
  if (slug.length < 3) {
    issues.push("Slug terlalu pendek (minimal 3 karakter)");
    suggestions.push("Tambahkan kata kunci yang relevan");
  }

  if (slug.length > 60) {
    issues.push("Slug terlalu panjang (maksimal 60 karakter)");
    suggestions.push("Singkat slug dengan kata kunci utama");
  }

  // Check for numbers at the beginning
  if (/^\d/.test(slug)) {
    issues.push("Slug dimulai dengan angka");
    suggestions.push("Mulai slug dengan huruf");
  }

  // Check for too many hyphens
  const hyphenCount = (slug.match(/-/g) || []).length;
  if (hyphenCount > 5) {
    issues.push("Terlalu banyak tanda hubung");
    suggestions.push("Gunakan kata yang lebih ringkas");
  }

  // Check for stop words
  const stopWords = [
    "dan",
    "atau",
    "yang",
    "di",
    "ke",
    "dari",
    "untuk",
    "dengan",
    "pada",
  ];
  const hasStopWords = stopWords.some((word) => slug.includes(word));
  if (hasStopWords) {
    issues.push("Mengandung kata penghubung");
    suggestions.push("Hapus kata penghubung untuk slug yang lebih fokus");
  }

  return {
    friendly: issues.length === 0,
    issues,
    suggestions,
  };
};
