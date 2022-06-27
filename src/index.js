import { resolve } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const makeArrayDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.has(obj1, key) && _.has(obj2, key) && (value1 !== value2)) {
      return {
        name: key, value1, value2, type: 'changed',
      };
    }
    if (!_.has(obj1, key)) {
      return { name: key, value: value2, type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { name: key, value: value1, type: 'removed' };
    }
    return { name: key, value: value1, type: 'unchanged' };
  });
  return result;
};

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(readFileSync(resolve(file1), 'utf-8'));
  const obj2 = JSON.parse(readFileSync(resolve(file2), 'utf-8'));

  const arrdiff = makeArrayDiff(obj1, obj2);
  const result = arrdiff.map((item) => {
    if (item.type === 'changed') {
      return `- ${item.name}: ${item.value1}\n+ ${item.name}: ${item.value2}`;
    }
    if (item.type === 'added') {
      return `+ ${item.name}: ${item.value}`;
    }
    if (item.type === 'removed') {
      return `- ${item.name}: ${item.value}`;
    }
    return `  ${item.name}: ${item.value}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
