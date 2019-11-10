import fs from 'fs';
import path from 'path';

const initialize = (filename, dirname, fn) => {
  const basename = path.basename(filename);

  fs.readdirSync(dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      fn(path.join(dirname, file), file.split('.')[0]);
    });
};

export default initialize;
