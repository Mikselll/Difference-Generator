import _ from 'lodash';

const stringify = (objectValue, depthNum) => {
  const iter = (data, depthCount) => (
    Object.entries(data).map(([key, value]) => (_.isObject(value)
      ? `${'    '.repeat(depthCount)}${key}: {\n${iter(value, depthCount + 1)}\n${'    '.repeat(depthCount)}}`
      : `${'    '.repeat(depthCount)}${key}: ${value}`)).join('\n')
  );
  return !_.isObject(objectValue) ? `${objectValue}` : `{\n${iter(objectValue, depthNum)}\n${'    '.repeat(depthNum - 1)}}`;
};

const stylish = (diffTree) => {
  const buildStylishTree = (data, depthCount) => {
    const tree = data.flatMap((object) => {
      if (object.type === 'nested') {
        return `${'    '.repeat(depthCount)}${object.name}: {\n${buildStylishTree(object.children, depthCount + 1)}\n${'    '.repeat(depthCount)}}`;
      }
      if (object.type === 'changed') {
        return [`${'    '.repeat(depthCount).slice(0, -2)}- ${object.name}: ${stringify(object.value1, depthCount + 1)}`,
          `${'    '.repeat(depthCount).slice(0, -2)}+ ${object.name}: ${stringify(object.value2, depthCount + 1)}`];
      }
      if (object.type === 'added') {
        return `${'    '.repeat(depthCount).slice(0, -2)}+ ${object.name}: ${stringify(object.value, depthCount + 1)}`;
      }
      if (object.type === 'removed') {
        return `${'    '.repeat(depthCount).slice(0, -2)}- ${object.name}: ${stringify(object.value, depthCount + 1)}`;
      }
      return `${'    '.repeat(depthCount)}${object.name}: ${stringify(object.value, depthCount)}`;
    }).join('\n');
    return tree;
  };
  return `{\n${buildStylishTree(diffTree, 1)}\n}`;
};

export default stylish;
