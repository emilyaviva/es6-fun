function readfile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

module.exports = readfile;
