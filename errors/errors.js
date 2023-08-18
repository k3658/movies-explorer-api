const statusCodes = {
  ERROR_BAD_REQUEST: 400,
  ERR0R_UNAUTHORIZED: 401,
  ERROR_FORBIDDEN: 403,
  ERROR_NOT_FOUND: 404,
  ERROR_CONFLICT: 409,
  ERROR_DEFAULT: 500,
};

const errorMessages = {
  MESSAGE_ERROR_BAD_REQUEST: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
  MESSAGE_ERROR_UNAUTHORIZED: 'Передан неверный логин или пароль.',
  MESSAGE_ERROR_FORBIDDEN: 'Вы не можете удалить чужую карточку.',
  MESSAGE_ERROR_NOT_FOUND: 'Карточка или пользователь не найден или был запрошен несуществующий роут.',
  MESSAGE_ERROR_CONFLICT: 'Пользователь с указанным email уже существует.',
  MESSAGE_ERROR_DEFAULT: 'На сервере произошла ошибка.',
};

module.exports = {
  statusCodes,
  errorMessages,
};
