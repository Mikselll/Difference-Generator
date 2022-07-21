import _ from 'lodash';

const stringify = (objectValue, spaceCount) => {
  const iter = (data, spaceNum) => (
    Object.entries(data).map(([key, value]) => (_.isObject(value)
      ? `${' '.repeat(spaceNum)}${key}: {\n${iter(value, spaceNum + 4)}\n${' '.repeat(spaceNum)}}`
      : `${' '.repeat(spaceNum)}${key}: ${value}`)).join('\n')
  );
  return !_.isObject(objectValue) ? `${objectValue}` : `{\n${iter(objectValue, spaceCount)}\n${' '.repeat(spaceCount - 4)}}`;
};

const stylish = (diffTree) => {
  const buildStylishTree = (data, spaceNum) => {
    const tree = data.flatMap((object) => {
      if (object.type === 'nested') {
        return `${' '.repeat(spaceNum)}${object.name}: {\n${buildStylishTree(object.children, spaceNum + 4)}\n${' '.repeat(spaceNum)}}`;
      }
      if (object.type === 'changed') {
        return [`${' '.repeat(spaceNum - 2)}- ${object.name}: ${stringify(object.value1, spaceNum + 4)}`,
          `${' '.repeat(spaceNum - 2)}+ ${object.name}: ${stringify(object.value2, spaceNum + 4)}`];
      }
      if (object.type === 'added') {
        return `${' '.repeat(spaceNum - 2)}+ ${object.name}: ${stringify(object.value, spaceNum + 4)}`;
      }
      if (object.type === 'removed') {
        return `${' '.repeat(spaceNum - 2)}- ${object.name}: ${stringify(object.value, spaceNum + 4)}`;
      }
      return `${' '.repeat(spaceNum)}${object.name}: ${stringify(object.value, spaceNum)}`;
    }).join('\n');
    return tree;
  };
  return `{\n${buildStylishTree(diffTree, 4)}\n}`;
};

export default stylish;
