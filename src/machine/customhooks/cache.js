// cache.js
const cache = {};

export const getFromCache = (key) => {
  return cache[key];
};

export const setToCache = (key, data) => {
  cache[key] = data;
};