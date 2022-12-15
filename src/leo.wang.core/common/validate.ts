/**
 * Created by leo on 20/06/06.
 * @author leo.wang 17503046966@163.com;
 */

/**
 * 验证是否是手机号.
 * @param {String} phone_number ;
 */
function isMobile(phone_number: string | number): boolean {
  const fiter = /^[1][0-9]{10}$/;
  if (fiter.test(phone_number.toString())) {
    return true;
  } else {
    return false;
  }
}

/**
 * 验证是否是邮箱.
 * @param {String} email
 */
function isEmail(email: string): boolean {
  const fiter =
    /^([a-zA-Z0-9_.-])+[.]([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  // let fiter = /^([a-zA-Z0-9\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (fiter.test(email)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 验证字符串是否都是数字.
 * @param {String} number_str ;
 */
function isNumbner(number_str: string | number): boolean {
  const fiter = /^[0-9]*$/;
  if (fiter.test(number_str.toString())) {
    return true;
  } else {
    return false;
  }
}

/**
 * 验证是否是身份证号.
 * @param {String} id_card ;
 */
function isIdCard(id_card: string | number): boolean {
  const fiter = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
  if (fiter.test(id_card.toString())) {
    return true;
  } else {
    return false;
  }
}

export { isMobile, isEmail, isNumbner, isIdCard };
