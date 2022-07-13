import stylish from './stylish.js';
import plain from './plain.js';

const formatSelection = (diffTree, format) => {
  if (format === 'plain') {
    return plain(diffTree);
  }
  if (format === 'stylish') {
    return stylish(diffTree);
  }
  return JSON.stringify(diffTree);
};

export default formatSelection;
