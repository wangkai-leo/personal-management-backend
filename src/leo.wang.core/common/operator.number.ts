function getUniqueID(): string {
  let str = "";
  str = Math.random().toString(36).substr(3);
  str += Date.now().toString(16).substr(4);
  return str;
}

export { getUniqueID };
