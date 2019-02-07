export default function createNestedSectors(data) {
  const firstLevel = {};
  const secondLevel = {};
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    if (!item.obsolete) {
      if (!item.parent) {
        firstLevel[item.id] = item;
        item.children = {};
        item.level = 0;
      } else if (item.parent && firstLevel[item.parent]) {
        firstLevel[item.parent].children[item.id] = item;
        secondLevel[item.id] = item;
        item.children = {};
        item.level = 1;
      } else if (item.parent && !firstLevel[item.parent]) {
        secondLevel[item.parent].children[item.id] = item;
        item.level = 2;
      }
    }
  }
  return firstLevel;
}
