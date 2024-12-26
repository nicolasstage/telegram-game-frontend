function parseQueryParams(queryString: string) {
  const params = new Map();

  // Remove the leading '?' if present
  const cleanQueryString = queryString.startsWith('?') ? queryString.slice(1) : queryString;

  // Split the string into key-value pairs
  const pairs = cleanQueryString.split('&');

  for (const pair of pairs) {
      // Split each pair into key and value
      const [key, value] = pair.split('=').map(decodeURIComponent);
      // Only add if key is not undefined
      if (key) {
          params.set(key, value || '');
      }
  }

  return params;
}

export { parseQueryParams }