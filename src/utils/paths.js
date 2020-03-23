export const cleanPath = path => {
  if (!path) return path;
  if (path.includes('../')) {
    return path.replace('../', '/');
  }
  return path;
};

export default cleanPath;
