import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import makeTree from './makeTree.js';
import stylish from './stylish.js';

const readFile = (file) => (readFileSync(resolve(file), 'utf-8'));

const genDiff = (file1, file2, format = 'stylish') => {
  const obj1 = parse(readFile(file1), extname(file1).slice(1));
  const obj2 = parse(readFile(file2), extname(file2).slice(1));

  const tree = makeTree(obj1, obj2);
  
  return stylish(tree);
};

export default genDiff;
