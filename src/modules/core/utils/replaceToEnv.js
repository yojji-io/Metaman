import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

const getEnvRegs = env => {
  return Object.entries(env).map(([key, value]) => ({
    regexp: new RegExp(`{{${key}}}`, 'g'),
    replace: value,
  }));
};

const updateString = (str, regs) => {
  for (const reg of regs) {
    str = str.replace(reg.regexp, reg.replace);
  }

  return str;
};

const updateStringsByPath = (obj, reqs) => {
  for (const f in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(f)) {
      const field = obj[f];
      if (typeof field === 'string') {
        obj[f] = updateString(field, reqs);
      }
      if (typeof field === 'object' && field !== null) {
        updateStringsByPath(obj[f], reqs);
      }
    }
  }
};

export const replaceToEnv = (obj, env) => {
  if (isEmpty(env)) {
    return obj;
  }
  const updatedObject = cloneDeep(obj);
  const reqs = getEnvRegs(env);
  updateStringsByPath(updatedObject, reqs);

  return updatedObject;
};
