import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return { name: key, value: value2, type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { name: key, value: value1, type: 'removed' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { name: key, type: 'nested', children: makeTree(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        name: key, value1, value2, type: 'changed',
      };
    }
    return { name: key, value: value1, type: 'unchanged' };
  });
  return result;
};

export default makeTree;
