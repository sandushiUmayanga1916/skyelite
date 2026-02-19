// Browser-side localStorage helpers

const KEY = 'skyelite_last_search';

/**
 * Save the last search parameters
 * @param {Object} data
 */
export function saveLastSearch(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...data, savedAt: Date.now() }));
  } catch (e) {
    // localStorage may be unavailable in private mode
    console.warn('Could not save search:', e);
  }
}

/**
 * Load the last saved search parameters
 * @returns {Object|null}
 */
export function loadLastSearch() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/**
 * Clear last search
 */
export function clearLastSearch() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) { /* noop */ }
}
