export function filterNullProperties(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => filterNullProperties(item));
  }

  const filteredObj = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      filteredObj[key] = filterNullProperties(obj[key]);
    }
  }
  return filteredObj;
}
