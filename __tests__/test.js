import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const firsJsonFile = getFixturePath('file1.json');
const secondJsonFile = getFixturePath('file2.json');
const firstYamlfile = getFixturePath('file1.yaml');
const secondYamlfile = getFixturePath('file2.yml');

test('json', () => {
  const result = readFile('result.txt');
  expect(genDiff(firsJsonFile, secondJsonFile)).toEqual(result);
});

test('yaml', () => {
  const result = readFile('result.txt');
  expect(genDiff(firstYamlfile, secondYamlfile)).toEqual(result);
});
