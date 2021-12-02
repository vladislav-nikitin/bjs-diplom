const { response } = require("express");

// Выход из личного кабинета
let logoutButton = new LogoutButton();
logoutButton.action = function () {
  ApiConnector.logout((err, data) => {
    if (err) {
      console.error("Ошибка выхода из личного кабинета");
    } else {
      console.log(data);
      location.reload();
    }
  });
};

//Получение информации о пользователе
ApiConnector.current((err, data) => {
  if (err) {
    console.error("Ошибка получения информации о пользователе");
  } else {
    console.log(data);
    ProfileWidget.showProfile(data);
  }
});

// Получение текущих курсов валюты
let ratesBoard = new RatesBoard();
function exchangeRate() {
  ApiConnector.getStocks((err, data) => {
    if (err) {
      console.error("Ошибка получения текущих курсов валюты");
    } else {
      ratesBoard.clearTable();
      ratesBoard.fillTable(data);
    }
  });
}
exchangeRate();
let timerId = setInterval(exchangeRate, 1000);

// Операции с деньгами
let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(
    data,
    (err, data) => {
      if (err) {
        console.error("Ошибка добавления денежных средств");
      } else {
        ProfileWidget.showProfile(data);
      }
    }
    // непонятно как работает setMessage ???
    //   FavoritesWidget.setMessage(isSuccess, message) {
    //     if (isSuccess) {
    //       "Денежные средства успешно добавлены";
    //     } else {
    //       "Ошибка добавления денежных средств";
    //     }

    // }
  );
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (err, data) => {
    if (err) {
      console.error("Ошибка конвертации денежных средств");
    } else {
      ProfileWidget.showProfile(data);
    }
  });
  // непонятно как работает setMessage ???
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (err, data) => {
    if (err) {
      console.error("Ошибка пополнения баланса");
    } else {
      ProfileWidget.showProfile(data);
    }
  });
  // непонятно как работает setMessage ???
};

// Работа с избранным
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((err, data) => {
  if (err) {
    console.error("Ошибка получения списка избранного");
  } else {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(data);
    moneyManager.updateUsersList(data);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (err, data) => {
    if (err) {
      console.error("Ошибка добавления пользователя в список избранных");
    } else {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(data);
      moneyManager.updateUsersList(data);
    }
    // setMessage ???
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (err, data) => {
    if (err) {
      console.error("Ошибка удаления пользователя из избранного");
    } else {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(data);
      moneyManager.updateUsersList(data);
    }
    // setMessage ???
  });
};
