export function* idMaker() {
  let index = 0;
  while (true) yield (index += 1);
}

export default idMaker;
