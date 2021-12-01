import { isMoment } from 'moment';

const isBuffer = (obj: any) => {
  return obj && obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

const keyIdentity = (key: string) => {
  return key;
};

// This is an alteration of flat's flattenObject function that includes has the ability to handle Moment objects.
// In this case, a removeDate key set to true in opts will make sure that Moment objects are not flattened like other objects.
export const flatten = (target: Object, opts: any = {}) => {
  const delimiter = opts.delimiter || '.',
    transformKey = opts.transformKey || keyIdentity,
    output: any = {};

  function step(object: any, prev?: any, currentDepth?: any) {
    currentDepth = currentDepth || 1;
    Object.keys(object).forEach(function(key) {
      const value = object[key],
        isarray = opts.safe && Array.isArray(value),
        type = Object.prototype.toString.call(value),
        isbuffer = isBuffer(value),
        isDate = opts.removeDate ? isMoment(value) : false,
        isobject = type === '[object Object]' || type === '[object Array]',
        newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key);

      if (
        !isarray &&
        !isbuffer &&
        isobject &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < opts.maxDepth) &&
        !isDate
      ) {
        return step(value, newKey, currentDepth + 1);
      }

      output[newKey] = value;
    });
  }

  step(target);

  return output;
};
