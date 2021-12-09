// Выход из личного кабинета
let logoutButton = new LogoutButton();
logoutButton.action = function () {
  ApiConnector.logout((response) => {
    if ((response.success = "true")) {
      location.reload();
    }
  });
};

//Получение информации о пользователе
ApiConnector.current((response) => {
  if ((response.success = "true")) {
    ProfileWidget.showProfile(response);
  }
});

// Получение текущих курсов валюты
let ratesBoard = new RatesBoard();
function exchangeRate() {
  ApiConnector.getStocks((response) => {
    if ((response.success = "true")) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response);
    }
  });
}
exchangeRate();
let timerId = setInterval(exchangeRate, 1000);

// Операции с деньгами
let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    if ((response.success = "true")) {
      ProfileWidget.showProfile(response);
      moneyManager.setMessage(true, "Денежные средства успешно добавлены");
    } else {
      moneyManager.setMessage(false, "Ошибка при добавлении денежных средств");
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    if ((response.success = "true")) {
      ProfileWidget.showProfile(response);
      moneyManager.setMessage(true, "Конвертация прошла успешно");
    } else {
      moneyManager.setMessage(false, "Ошибка при выполнении конвертации");
    }
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    if ((response.success = "true")) {
      ProfileWidget.showProfile(response);
      moneyManager.setMessage(true, "Перевод валюты прошёл успешно");
    } else {
      moneyManager.setMessage(false, "Ошибка при выполнении перевода");
    }
  });
};

// Работа с избранным
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if ((response.success = "true")) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response);
    moneyManager.updateUsersList(response);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if ((response.success = "true")) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response);
      moneyManager.updateUsersList(response);
      moneyManager.setMessage(
        true,
        "Пользователь успешно добавлен в список избранных"
      );
    } else {
      moneyManager.setMessage(
        false,
        "Ошибка добавления пользователя в список избранных"
      );
    }
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if ((response.success = "true")) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response);
      moneyManager.updateUsersList(response);
      moneyManager.setMessage(
        true,
        "Пользователь успешно удалён из списка избранных"
      );
    } else {
      moneyManager.setMessage(
        false,
        "Ошибка удаления пользователя из списка избранных"
      );
    }
  });
};
