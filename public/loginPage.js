"use strict";

let userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (err, data) => {
    if (err) {
      userForm.setLoginErrorMessage(
        "Пользователь с таким логином и паролем не найден"
      );
    } else {
      console.log(data);
      alert(JSON.stringify(data));
      location.reload();
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (err, data) => {
    if (err) {
      userForm.setRegisterErrorMessage("Ошибка! Попробуйте снова");
    } else {
      console.log(data);
      alert(JSON.stringify(data));
      location.reload();
    }
  });
};
