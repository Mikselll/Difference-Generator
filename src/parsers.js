import { load } from 'js-yaml';

const parse = (data, extension) => {
  if (extension === 'yaml' || extension === 'yml') {
    return load(data);
  }
  if (extension === 'json') {
    return JSON.parse(data);
  }
  return `The ${extension} is not supported!`;
};

export default parse;
