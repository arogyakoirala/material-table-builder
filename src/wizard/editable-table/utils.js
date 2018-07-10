export const generateColumns = (rows) => {
  const keys = Object.keys(rows[0]);
  const columnArray = [];

  keys.forEach((item) => {
    if (item !== 'id') {
      const newObj = { key: item, name: item, editable: true };
      columnArray.push(newObj);
    }
  });
  // Object.keys[rows[0]];

  return columnArray;
};

export const generateRows = (rows) => {
  const keys = Object.keys(rows[0]);

  const newObj = {};
  keys.forEach((item) => {
    if (item !== 'id') {
      newObj[item] = item;
    }
  });

  return [{ ...newObj }, ...rows];
};
