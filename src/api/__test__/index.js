export const getType = inst => {
  return {}.toString.call(inst).slice(8, -1);
};

export const isDict = inst => {
  return getType(inst) === "Object";
};
