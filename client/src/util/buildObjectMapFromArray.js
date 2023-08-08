export default function buildObjectMapFromArray(arr) {
  return arr.reduce((obj, itemWithIdField) => {
    obj[itemWithIdField._id] = itemWithIdField;
    return obj;
  }, {});
}
