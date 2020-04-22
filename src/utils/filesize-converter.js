const filesize = require('filesize');

const filesizeConverter = filesizeInBytes => {
  return filesize(filesizeInBytes, { round: 0 });
};

export default filesizeConverter;
