export const buildEventPath = (prefix, rawPath) => {
  const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  return `${prefix}${normalized}`;
};
