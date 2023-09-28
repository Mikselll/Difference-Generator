import _ from 'lodash';

// 1. Переименовал переменные
// 2. Убрал ненужное условие value !== null
// 3. Убрал вложенную функцию buildPlainTree
// 4. Упростил получение данных через деструктуризацию
// 5. Объединил условия added и removed, чтобы избежать повторения кода

const getNameValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getPlainTree = (data, valuePath = '') => {
  const lines = data
    .filter((object) => object.type !== 'unchanged')
    .map((object) => {
      const {
        name, type, value1, value2, value, children,
      } = object;
      const path = `${valuePath}.${name}`;
      const propertyPath = path.slice(1);
      if (['added', 'removed'].includes(type)) {
        return `Property '${propertyPath}' ${type === 'removed' ? 'was removed' : `was added with value: ${getNameValue(value)}`}`;
      }
      if (type === 'changed') {
        return `Property '${propertyPath}' was updated. From ${getNameValue(value1)} to ${getNameValue(value2)}`;
      }
      return getPlainTree(children, path);
    });
  return lines.join('\n');
};

export default getPlainTree;
