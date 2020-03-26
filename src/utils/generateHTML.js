const showdown = require('showdown');

function generateHTML(markdown) {
  let converter;
  if (typeof window !== 'undefined') converter = new showdown.Converter();
  const html = converter ? converter.makeHtml(markdown) : markdown;
  return html;
}

export default generateHTML;
