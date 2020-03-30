const showdown = require('showdown');

function generateHTML(markdown) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdown);
  return html;
}

export default generateHTML;
