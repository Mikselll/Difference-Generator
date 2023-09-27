import _ from 'lodash';

// Упростил функцию stringify:
// 1. Переделал систему отступов
// 2. Вынес вложенную функцию iter и разделил ответственности
// 3. Убрал тернарный оператор, тк он ухудшал читаемость
// 4. Переименовал переменные

const space = ' ';
const indent = (count) => space.repeat(count);

const generateLines = (data, indentCount) => {
  const dataEntries = Object.entries(data);
  const lines = dataEntries.map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${indent(indentCount)}${key}: ${value}`;
    }
    return `${indent(indentCount)}${key}: {\n${generateLines(value, indentCount + 4)}\n${indent(indentCount)}}`;
  });
  return lines.join('\n');
};

const stringify = (objectValue, indentCount) => {
  if (!_.isObject(objectValue)) {
    return `${objectValue}`;
  }
  return `{\n${generateLines(objectValue, indentCount)}\n${indent(indentCount - 4)}}`;
};

// Упростил функцию stylish:
// 1. Функция buildStylishTree была вынесена, чтобы разделить ответственность
// 2. Упростил получение значений с помощью деструктуризации
// 3. Условные конструкции if заменил на switch
// 4. Переименовал переменные

const buildStylishTree = (diffTree, indentCount = 4) => {
  const lines = diffTree.flatMap((object) => {
    const {
      name, type, value1, value2, value, children,
    } = object;
    switch (type) {
      case 'nested':
        return `${indent(indentCount)}${name}: {\n${buildStylishTree(children, indentCount + 4)}\n${indent(indentCount)}}`;
      case 'changed': {
        const oldValue = stringify(value1, indentCount + 4);
        const newValue = stringify(value2, indentCount + 4);
        return [
          `${indent(indentCount - 2)}- ${name}: ${oldValue}`,
          `${indent(indentCount - 2)}+ ${name}: ${newValue}`,
        ];
      }
      case 'added': {
        const addedValue = stringify(value, indentCount + 4);
        return `${indent(indentCount - 2)}+ ${name}: ${addedValue}`;
      }
      case 'removed': {
        const removedValue = stringify(value, indentCount + 4);
        return `${indent(indentCount - 2)}- ${name}: ${removedValue}`;
      }
      default: {
        const defaultValue = stringify(value, indentCount);
        return `${indent(indentCount)}${name}: ${defaultValue}`;
      }
    }
  });

  return lines.join('\n');
};

const getStylishTree = (diffTree) => {
  const stylishTree = buildStylishTree(diffTree);
  return `{\n${stylishTree}\n}`;
};

export default getStylishTree;
