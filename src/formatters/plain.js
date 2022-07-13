import _ from 'lodash';

const plain = (diffTree) => {
  const nameOfValue = (value) => {
    if (_.isObject(value) && value !== null) {
      return `${'[complex value]'}`;
    }
    if (_.isString(value)) {
      return `'${value}'`;
    }
    return value;
  };

  const buildPlainTree = (data, valuePath = '') => {
    const tree = data
      .filter((object) => object.type !== 'unchanged')
      .map((object) => {
        const path = `${valuePath}.${object.name}`;
        if (object.type === 'added') {
          return `Property '${path.slice(1)}' was added with value: ${nameOfValue(object.value)}`;
        }
        if (object.type === 'removed') {
          return `Property '${path.slice(1)}' was removed`;
        }
        if (object.type === 'changed') {
          return `Property '${path.slice(1)}' was updated. From ${nameOfValue(object.value1)} to ${nameOfValue(object.value2)}`;
        }
        return buildPlainTree(object.children, path);
      }).join('\n');
    return tree;
  };
  return buildPlainTree(diffTree);
};

export default plain;
