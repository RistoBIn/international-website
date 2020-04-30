const lodash = require('lodash');

export const partition = (array, size) => {
  return lodash.partition([array], n => n % size);
};

export const chunk = (array, size) => {
  return lodash.chunk(array, size);
};

export default partition;
