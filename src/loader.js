const loadFile = filePath =>
  fetch(filePath, {
    mode: 'no-cors',
    referrer: "no-referrer",
  })
  .then(response => response.text());

/**
 * Lightweight loader for SVGs
 * @param containerId
 * @param options
 * @returns {{}}
 */
async function loader(containerEl, { filePath, classes = [] }) {
  const svgFileText = await loadFile(filePath);

  if (svgFileText.length === 0) {
    throw Error('SVGEngine | File could not be loaded');
  }
  const parser = new DOMParser();
  const svgFileXML = parser.parseFromString(svgFileText, "image/svg+xml");

  const svgEl = document.importNode(svgFileXML.documentElement, true)

  if (classes) {
    classes.forEach(className => svgEl.classList.add(className))
  }

  containerEl.appendChild(svgEl);

  return svgEl;
}

export default loader;
