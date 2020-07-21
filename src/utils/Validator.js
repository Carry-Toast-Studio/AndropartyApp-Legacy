import {validate} from 'validate.js'
import {translate} from '../translations/i18-helper';


class Validator {

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

    // Manually check format: uppercase, lowercase and numbers must be present
    if (!errors && !RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[2-9])/).test(password))
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
    return (errors && errors.password) ? errors.password[0] : true
  }

}

export default Validator;
