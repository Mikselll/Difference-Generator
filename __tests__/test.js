import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const firsJsonFile = getFixturePath('file1.json');
const secondJsonFile = getFixturePath('file2.json');
const firstYamlfile = getFixturePath('file1.yaml');
const secondYamlfile = getFixturePath('file2.yml');

test('plain', () => {
  const result = readFile('resultPlain.txt');
  expect(genDiff(firstYamlfile, secondYamlfile, 'plain')).toEqual(result);
  expect(genDiff(firsJsonFile, secondJsonFile, 'plain')).toEqual(result);
});

test('json', () => {
  const result = readFile('resultJson.txt');
  expect(genDiff(firsJsonFile, secondJsonFile, 'json')).toEqual(result);
  expect(genDiff(firstYamlfile, secondYamlfile, 'json')).toEqual(result);
});

test('stylish', () => {
  const result = readFile('resultStylish.txt');
  expect(genDiff(firstYamlfile, secondYamlfile)).toEqual(result);
  expect(genDiff(firsJsonFile, secondJsonFile)).toEqual(result);
});
