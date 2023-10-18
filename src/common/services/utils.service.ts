import { UtilReturnType } from "../models/common.dto";

export const _getFullError = (e: any, logId: string) => {
  try {
    const strigified = JSON.stringify(e);
    return strigified;
  } catch (e) {
    const { message, error } = e;
    return `error in _getFullError , error=[${error}] , msg=[${message}] logId=[${logId}]`;
  }
};

export const _removeSpecialCharactersFromString = (str: string) => {
  const fixedString = str.replace(/[^a-zA-Z0-9]/g, "");
  return fixedString;
};

export const _convertObjectToJSONString = (logId: string, e: any) => {
  try {
    const strigified = JSON.stringify(e);
    return strigified;
  } catch (e) {
    const { message, error } = e;
    return `error in _convertObjectToJSONString , error=[${error}] , msg=[${message}]`;
  }
};

//returns true if obj is empty
export const _isNotPresent = (logId: string, obj: any): UtilReturnType<boolean> => {
  try {
    const isNil = obj === undefined || obj === null;
    const isEmptyArr = JSON.stringify(obj) === "[]";
    const isEmptyObj = JSON.stringify(obj) === "{}";
    const isZero = obj === 0;
    const isEmptyString = obj === "";
    const data = isNil || isEmptyArr || isEmptyObj || isZero || isEmptyString;
    return { hasError: false, data, msg: "" };
  } catch (e) {
    const { message } = e;
    return { hasError: true, data: true, msg: message };
  }
};

//returns true if obj is not-empty
export const _isPresent = (logId: string, obj: any): UtilReturnType<boolean> => {
  try {
    const isNotPresent = _isNotPresent(logId, obj);
    const data = !isNotPresent.data;
    return { hasError: false, data, msg: "" };
  } catch (e) {
    const { message } = e;
    return { hasError: true, data: false, msg: message };
  }
};

//remove keys that have values "null" or "undefined" in given objecy
export const _removeNilKeys = (logId: string, input: any): UtilReturnType<any> => {
  try {
    const isNotPresent = _isNotPresent(logId, input);
    if (isNotPresent.hasError || isNotPresent.data) {
      return { data: input, hasError: isNotPresent.hasError, msg: "" };
    }
    const valuesToRemove = [null, undefined];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = Object.fromEntries(Object.entries(input).filter(([key, value]) => !valuesToRemove.includes(value)));
    return { data, hasError: false, msg: "" };
  } catch (e) {
    const { message, error } = e;
    const finalMsg = `error in _removeNilKeys , message=[${message}] , error=[${error}]`;
    console.log(finalMsg);
    return { data: null, hasError: true, msg: finalMsg };
  }
};

export const _getRandomStr = (logId: string, listOfValsToExclude: string[]): UtilReturnType<string> => {
  try {
    let returnVal = "";
    while (true) {
      const random1 = Math.random().toString(36).replace("0.", "");
      const random2 = Math.random().toString(36).replace("0.", "");
      returnVal = `${random1}${random2}`;
      const valueIsUniq = listOfValsToExclude.indexOf(returnVal) === -1;
      if (valueIsUniq) {
        break;
      }
    }
    return { data: returnVal, hasError: false, msg: "" };
  } catch (e) {
    const random1 = Math.random().toString(36).replace("0.", "");
    return { data: random1, hasError: true, msg: `${JSON.stringify(e)}` };
  }
};

export const _purifyList = (logId: string, inputList: string[]): UtilReturnType<string[]> => {
  const methodName = `_purifyList`;
  try {
    const isNotPresent = _isNotPresent(logId, inputList);
    if (isNotPresent.hasError || isNotPresent.data) {
      return { hasError: isNotPresent.hasError, data: [], msg: "inputList hasError or isNoPresent" };
    }
    const finalIdList: string[] = [];
    for (const input of inputList) {
      if (_isPresent(logId, input).data && input != "null" && input != "undefined") {
        finalIdList.push(input);
      }
    }
    const isPresentFinalList = _isPresent(logId, finalIdList).data;
    return { hasError: false, data: isPresentFinalList ? finalIdList : [], msg: "" };
  } catch (e) {
    const { message, error } = e;
    const finalMsg = `error in ${methodName} , message=[${message}] , error=[${error}]`;
    console.log(finalMsg);
    return { hasError: true, data: [], msg: finalMsg };
  }
};

export const _toNDigitsPostDecimal = (
  logId: string,
  inputNum: string | number,
  n: number = 2,
): UtilReturnType<number> => {
  const methodName = `_toNDigitsPostDecimal`;
  try {
    const inputNumConv = +inputNum;
    if (isNaN(inputNumConv)) {
      throw new Error("inputNum is not a number");
    }
    const inputNumConvStr = inputNumConv.toFixed(n); // if n=2 & inputNum=5.455 , returns "5.46"
    const inputNumConvStrNum = parseFloat(inputNumConvStr);
    return { hasError: false, data: inputNumConvStrNum, msg: "" };
  } catch (e) {
    const { message, error } = e;
    const finalMsg = `error in ${methodName} , message=[${message}] , error=[${error}]`;
    console.log(finalMsg);
    return { hasError: true, data: -1, msg: finalMsg };
  }
};
//console.log(_toNDigitsPostDecimal("", "4", 2));

export const _isValidNumber = (logId: string, input: any): UtilReturnType<boolean> => {
  const methodName = `_isValidNumber`;
  try {
    if (_isNotPresent(logId, input).data) {
      return { hasError: false, data: false, msg: "type mis-match or null input" };
    }

    if (typeof input === "string" || typeof input === "number") {
      const inputNumConv = +input;
      return { hasError: false, data: true, msg: `inputNumConv=[${inputNumConv}]` };
    }
    return { hasError: false, data: false, msg: "type mis-match (non-string & no-numeric" };
  } catch (e) {
    const { message, error } = e;
    const finalMsg = `error in ${methodName} , message=[${message}] , error=[${error}]`;
    console.log(finalMsg);
    return { hasError: true, data: false, msg: finalMsg };
  }
};

export const _isInvalidNumber = (logId: string, input: any): UtilReturnType<boolean> => {
  const methodName = `_isInvalidNumber`;
  try {
    const res = _isValidNumber(logId, input);
    return { hasError: res.hasError, data: !res.data, msg: res.msg };
  } catch (e) {
    const { message, error } = e;
    const finalMsg = `error in ${methodName} , message=[${message}] , error=[${error}]`;
    console.log(finalMsg);
    return { hasError: true, data: true, msg: finalMsg };
  }
};
