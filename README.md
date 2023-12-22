# Описание возможностей приложения

В шапку приложения встроена навигационная панель, позволяющая перейти на главную страницу, на страницу каналов и на страницу профиля текущего пользователя.

## Главная страница приложения

### Список мероприятий
На главной странице представлены все мероприятия, которые будут в будущем и которые принадлежат открытым каналам или каналам, в которых текущий пользователь является участником.

Мероприятия на главной странице могут быть отображены в двух режимах: в режиме сетки и в режиме списка.

### Переход на страницу мероприятия
По ссылке "подробнее" осуществляется переход на страницу с подробной информацией о данном мероприятии.

### Создание нового мероприятия
На главной странице приложения можно создать новое мероприятие. По нажатию на кнопку "создать мероприятие" в модальном окне появится форма создания мероприятия, в которой можно указать, от чьего имени будет создано мероприятие: от имени пользователя или от имени одного из каналов, владельцем которых он является.

## Страница мероприятия

### Информация о мероприятии
На странице мероприятия представлена подробная информация о мероприятии: дата проведения, место встречи, цена, длительность и ограничения для участия.

### Как принять участие и отказаться от участия в мероприятии
По нажатию на кнопку "Отправить заявку" пользователь становится участником мероприятия, если на меропритяии остались места. 

Если пользователь уже является участником мероприятия, по нажатию на кнопку "Покинуть меропритяие" пользователь перестаёт быть участником мероприятия.

### Оставить отзыв
Если мероприятие уже прошло, доступна кнопка обратной связи. 

По нажатию на кнопку "Оставить отзыв" появится форма в модальном окне, где пользователь сможет выставить рейтинг мероприятию.

Если пользователь уже создал отзыв о данном мероприятии ранее, то вместо кнопки "Оставить отзыв" доступна кнопка "Изменить мой отзыв". В появившейся форме пользователь может изменить выставленный ранее рейтинг по нажатию на кнопки "Изменить отзыв" или "Удалить отзыв".

## Каналы
Каналы нужны, чтобы люди могли объединяться и создавать мероприятия от имени сообщества.

### Мои каналы
Во вкладке "мои каналы" представлены все каналы, в которых пользователь является участником, владельцем или подал заявку на вступление.

### Все каналы
Во вкладке "все каналы" представлены все доступные каналы.

По ссылке "перейти в канал" осуществляется переход на страницу с подробной информацией о канале и членстве пользователя в этом канале.

### Создание нового канала
На странице "каналы" можно создать новый канал. По нажатию на кнопку "создать канал" в модальном окне появится форма создания канала, в которой можно указать название, описание канала и будет ли он публичным, то есть нужно ли подтверждение при вступлении в даннный канал.

## Страница канала
На странице канала представлены все мероприятия данного канала, которые будут в будущем.

### Создание нового мероприятия
На странице канала можно создать новое мероприятие. По нажатию на кнопку "создать мероприятие" в модальном окне появится форма создания мероприятия, в которой можно указать, от чьего имени будет создано мероприятие: от имени пользователя или от имени одного из каналов, владельцем которых он является.

### Информация о моём членстве в канале
По нажатию на стрелочку справа появляется панель с информацией о моей роли в канале.

### Возможности посетителя канала
Если пользователь не является владельцем канала и не подавал заявку на вступление, то назовём его посетителем.

По нажатию на кнопку "Вступить в канал" пользователь станет участником канала, если канал публичный и станет подписчиком, если канал закрытый.

Посетитель не может создавать мероприятия от имени канала, но может принимать участие в мероприятиях канала.

### Возможности подписчика канала
Если пользователь подал заявку на вступление, но его заявка ещё не принята, он является подписчиком.

Теперь, когда пользователь является подписчиком, на странице "каналы" во вкладке "мои каналы" будут отображаться мероприятия данного канала.

Подписчик не может создавать мероприятия от имени канала, но может принимать участие в мероприятиях канала.

### Возможности участника канала
Если пользователь подал заявку на вступление, и его заявка принята, он является участником канала.

Участник канала может создавать события от имени канала.

### Возможности владельца канала
По нажатию на кнопку "Заявки на вступление", появляется модальное окно, где владелец отмечает заявки на вступление в канал подписчиков, которые он собирается принять.

Владелец канала может удалить канал.

## Профиль пользователя

На странице профия представлена вся информация о польозвателе. 

Редактирование профиля доступно по нажатию на поле, которое пользователь хочет отредактировать.

Доступны функции выйти или удалить профиль.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
