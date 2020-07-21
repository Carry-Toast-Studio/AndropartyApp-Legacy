import {validate} from 'validate.js'
import {translate} from '../translations/i18-helper';


class Validator {

  static emojiRegExp = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/

  static validateMail = (mail) => {

    const errors = validate({mail}, {
      mail: {
        type: {
          type: "string",
          message: `^${translate("errors.emailWrong")}`
        },
        presence: {
          allowEmpty: false,
          message: `^${translate("errors.emailEmpty")}`
        },
        email: {
          message: `^${translate("errors.emailWrong")}`
        }
      }
    })

    // Return the first of all errors found or true if all is ok
    return (errors && errors.mail) ? errors.mail[0] : true
  }

  static validatePassword = (password) => {

    let errors = validate({password}, {
      password: {
        type: {
          type: "string",
          message: `^${translate("errors.passwordFormat")}`
        },
        presence: {
          allowEmpty: false,
          message: `^${translate("errors.passwordEmpty")}`
        },
        length: {
          minimum: 8,
          maximum: 80,
          notValid: `^${translate("errors.passwordWrong")}`
        }
      }
    })

    // Manually check format: uppercase, lowercase and numbers must be present. Reject emojis.
    if (!errors && (!RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[2-9])/).test(password) || this.emojiRegExp.test(password)))
      errors = {password: translate("errors.passwordFormat")}

    // Return the first of all errors found or true if all is ok
    return (errors && errors.password) ? errors.password[0] : true
  }

  static validateEquals = (str1, str2) => {

    const errors = validate({str1, str2}, {
      str1: {
        equality: {
          attribute: 'str2',
          message: `^${translate('errors.passwordsRepeat')}`
        }
      }
    })

    // Return the first of all errors found or true if all is ok
    return (errors && errors.str1) ? errors.str1[0] : true
  }

}

export default Validator;
