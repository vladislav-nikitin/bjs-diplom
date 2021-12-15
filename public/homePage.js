// Выход из личного кабинета
let logoutButton = new LogoutButton();
logoutButton.action = function () {
  ApiConnector.logout((response) => {
    if (response.success === true) {
      location.reload();
    }
  });
};

//Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  } else {
    alert(response.error);
  }
});

// Получение текущих курсов валюты
let ratesBoard = new RatesBoard();
function exchangeRate() {
  ApiConnector.getStocks((response) => {
    if (response.success === true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      alert(response.error);
    }
  });
}
exchangeRate();
let timerId = setInterval(exchangeRate, 1000);

// Операции с деньгами
let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Денежные средства успешно добавлены");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Конвертация прошла успешно");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Перевод валюты прошёл успешно");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

// Работа с избранным
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if (response.success === true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    favoritesWidget.setMessage(false, response.error);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        true,
        "Пользователь успешно добавлен в список избранных"
      );
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        true,
        "Пользователь успешно удалён из списка избранных"
      );
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};
