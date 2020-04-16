import qs from 'qs';

export function getQueryVariable(key: string) {
  const query = window.location.search.substring(1);
  return !key ? '' : qs.parse(query)[key];
}