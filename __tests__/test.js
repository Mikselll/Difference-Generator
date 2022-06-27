import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const firsFile = getFixturePath('file1.json');
const secondFile = getFixturePath('file2.json');

test('gendiff', () => {
  const result = readFile('result.txt');
  expect(genDiff(firsFile, secondFile)).toEqual(result);
});
