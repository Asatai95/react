const emailValidation = (email: string): string => {
  if (!email) return 'メールアドレスを入力してください';
  var wPat  = "[\u3041-\u3093]";
  wPat += "|[\u30A1-\u30F6]";
  wPat += "|[\u4E00-\u9FFF]";
  wPat = "^(" + wPat +")+$";
  if (email.match(wPat)) {
    return '正しい形式でメールアドレスを入力してください';
  }
  const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regex.test(email)) return '正しい形式でメールアドレスを入力してください';

  return '';
};

const passwordValidation = (password: string): string => {

  if (!password) return 'パスワードを入力してください';
  var reg_pass = true;
  for (var i = 0; i < password.length; i++){
    if (password[i].match(/^[^\x20-\x7e]*$/)) reg_pass = false;
  }
  if (reg_pass === false) return "パスワードは全角を使用できません";
  if (password.length <= 8 && password.length >= 16 ) return 'パスワードは8文字以上16文字以下で入力してください';
  var reg = new RegExp(/[!"#$%&'()*+\-.,:;<=>?@[\\\]^_`{|}~]/g);
  if (!/[A-Z]/.test(password) || !reg.test(password)) return "大文字と記号を一文字以上を使用してください"
  var wPat  = "[\u3041-\u3093]";
  wPat += "|[\u30A1-\u30F6]";
  wPat += "|[\u4E00-\u9FFF]";
  wPat = "^(" + wPat +")+$";
  if (password.match(wPat)) {
    return "パスワードに日本語は使用できません";
  }
  return '';
};

const passwordcheckValidation = (password_check: string): string => {
  if (!password_check) return 'パスワードを入力してください';
  var reg_pass = true;
  for (var i = 0; i < password_check.length; i++){
    if (password_check.match(/^[^\x20-\x7e]*$/)) reg_pass = false;
  }
  if (reg_pass === false) return "パスワードは全角を使用できません";
  if (password_check.length <= 8 && password_check.length >= 16 ) return 'パスワードは8文字以上16文字以下で入力してください';
  var reg = new RegExp(/[!"#$%&'()*+\-.,:;<=>?@[\\\]^_`{|}~]/g);
  if (!/[A-Z]/.test(password_check) || !reg.test(password_check)) return "大文字と記号を一文字以上を使用してください";
  var wPat  = "[\u3041-\u3093]";
  wPat += "|[\u30A1-\u30F6]";
  wPat += "|[\u4E00-\u9FFF]";
  wPat = "^(" + wPat +")+$";
  if (password_check.match(wPat)) {
    return "パスワードに日本語は使用できません";
  }
  return '';
};

const usernameValidation = (name: string): string => {
  if (!name) return "ユーザー名を入力してください";
  var reg = new RegExp(/[!"#$%&'()*+\-.,:;<=>?@[\\\]^_`{|}~]/g);
  if (reg.test(name)) return "ユーザー名は記号を使用できません"
  var flag;
  var regexp = new RegExp(/^[ｦ-ﾟ]*$/);
  for (var i = 0; i < name.length; i++){
    if (regexp.test(name[i])) flag = false;
  }
  if (flag === false) return "半角カタカナを使用できません";
  return ""
}

const messageValidation = (message: string): string => {
  var flag;
  var reg = new RegExp(/^[ｦ-ﾟ]*$/);
  for (var i = 0; i < message.length; i++){
    if (reg.test(message[i])) flag = false;
  }
  if (flag === false) return "半角カタカナを使用できません";
  if (message.length > 200) return "200文字以内で入力してください";
  return ""
}

const titleValidation = (title: string): string => {
  var flag;
  var reg = new RegExp(/^[ｦ-ﾟ]*$/);
  for (var i = 0; i < title.length; i++){
    if (reg.test(title[i])) flag = false;
  }
  if (flag === false) return "半角カタカナを使用できません";
  if (title.length > 40) return "40文字以内で入力してください";
  return ""
}

const formValidation = (info: string): string => {
  var flag;
  var reg = new RegExp(/^[ｦ-ﾟ]*$/);
  for (var i = 0; i < info.length; i++){
    if (reg.test(info[i])) flag = false;
  }
  if (flag === false) return "半角カタカナを使用できません";
  if (info.length > 40) return "40文字以内で入力してください";
  return ""
}

class Validation {
  static formValidate = (type: string, value: string) => {
    switch (type) {
        case 'email':
            return emailValidation(value);
        case 'password':
            return passwordValidation(value);
        case "name":
        case "username":
            return usernameValidation(value);
        case "password_check":
            return passwordcheckValidation(value);
        case "message":
            return messageValidation(value);
        case "title":
            return titleValidation(value);
        default:
            return formValidation(value);
    }
  };
}

export default Validation;