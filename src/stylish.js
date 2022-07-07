import _ from 'lodash';
const stylish = (diffTree) => {

  const stringify = (value, spaceCount) => {
    const iter = (data, space) => (
      Object.entries(data).map(([key, value]) => (_.isObject(value)
        ? `${' '.repeat(space)}${key}: {\n${iter(value, space + 4)}\n${' '.repeat(space)}}`
        : `${' '.repeat(space)}${key}: ${value}`)).join('\n')
    );
    return !_.isObject(value) ? `${value}` : `{\n${iter(value, spaceCount)}\n${' '.repeat(spaceCount - 4)}}`;
  };
  
  const buildTree = (data, space) => {
    const tree = data.map((object) => {
      if (object.type === 'nested') {
        return `${' '.repeat(space)}${object.name}: {\n${buildTree(object.children, space + 4)}\n${' '.repeat(space)}}`;
      }
      if (object.type === 'changed') {
        return `${' '.repeat(space - 2)}- ${object.name}: ${stringify(object.value1, space + 4)}\n${' '.repeat(space - 2)}+ ${object.name}: ${stringify(object.value2, space + 4)}`;
      }
      if (object.type === 'added') {
        return `${' '.repeat(space - 2)}+ ${object.name}: ${stringify(object.value, space + 4)}`;
      }
      if (object.type === 'removed') {
        return `${' '.repeat(space - 2)}- ${object.name}: ${stringify(object.value, space + 4)}`;
      }
      return `${' '.repeat(space)}${object.name}: ${stringify(object.value, space)}`;
    }).join('\n');
    return tree;
  };
  return `{\n${buildTree(diffTree, 4)}\n}`
};

export default stylish;