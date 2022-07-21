import { load } from 'js-yaml';

const parse = (data, type) => {
  if (type === 'yaml' || type === 'yml') {
    return load(data);
  }
  if (type === 'json') {
    return JSON.parse(data);
  }
  throw new Error(`The ${type} is not supported!`);
};

export default parse;
