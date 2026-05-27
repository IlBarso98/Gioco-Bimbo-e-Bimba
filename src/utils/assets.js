const externalPattern = /^(https?:)?\/\//i;

export function resolveAssetPath(path) {
  if (!path) {
    return '';
  }

  if (externalPattern.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}

