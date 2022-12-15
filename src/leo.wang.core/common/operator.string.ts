/**
 * Created by leo on 20/06/06.
 * @author leo.wang 17503046966@163.com;
 */
/**
 * 删除字符串左右两边空格
 * @param {String} s 字符串
 */
function trim(s: string) {
  return trimRight(trimLeft(s));
}

/**
 * 删除字符串左边空格
 * @param {String} s 字符串
 */
function trimLeft(s: string) {
  const whitespace = new String(" \t\n\r");
  let str = new String(s);
  if (whitespace.indexOf(str.charAt(0)) != -1) {
    let j = 0;
    const i = str.length;
    while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
      j++;
    }
    str = str.substring(j, i);
  }
  return str.toString();
}

/**
 * 删除字符串右边空格
 * @param {String} s 字符串
 */
function trimRight(s: string) {
  if (s == null) return "";
  const whitespace = new String(" \t\n\r");
  let str = new String(s);
  if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
    let i = str.length - 1;
    while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
      i--;
    }
    str = str.substring(0, i + 1);
  }
  return str.toString();
}

/**
 * 加密普通字符串
 * @param {String} str 普通字符串
 * @returns ;
 */
function encode(str: string) {
  // 对字符串进行编码
  const encode = encodeURI(str);
  // 对编码的字符串转化base64
  const base64 = btoa(encode);
  return base64;
}

/**
 * 解码base64字符为普通字符串
 * @param {base64字符串} base64 ;
 * @returns ;
 */
function decode(base64: string) {
  // 对base64转编码
  const decode = atob(base64);
  // 编码转字符串
  const str = decodeURI(decode);
  return str;
}

/**
 * @param len ;
 * @returns
 */
function randomString(len: number) {
  len = len || 32;
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const maxPos = chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * Make form data string by object
 * @param obj Parameter'll pasting to service's api
 * @returns a string like name="leo"&age=16
 */
function getFormDataParams(obj: { [x: string]: string }) {
  const data = [];
  for (const key in obj) {
    data.push(key + "=" + obj[key]);
  }
  return data.join("&");
}

export {
  trim, //去除左右空格
  trimLeft, //去除左边空格
  trimRight, //去除右边空格
  encode, //字符串转base64
  decode, //base64转字符串
  randomString, //随机字符串
  getFormDataParams,
};
