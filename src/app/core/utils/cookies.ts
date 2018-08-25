export function getCookie(name) {
  const pattern: string = '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)';
  const matches = document.cookie.match(new RegExp(pattern));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
