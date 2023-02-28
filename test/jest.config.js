import {defaults} from 'jest-config';

const config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  };
  

export default config;