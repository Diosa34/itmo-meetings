export default function validate(data, birthDay)  {
        let errors = {};

        if (!data.username) {
            errors.username = 'Выберите псевдоним';
        }

        if (!data.surname) {
            errors.surname = 'Введите фамилию';
        } else if (!(/^[А-ЯA-Z][а-яa-z]+$/.test(data.surname))) {
            errors.surname = 'Фамилия должна состоять из букв'
        }

        if (!data.name) {
            errors.name = 'Введите имя';
        } else if (!(/^[А-ЯA-Z][а-яa-z]+$/.test(data.name))) {
            errors.name = 'Имя должно состоять из букв'
        }

        if (!(/^[А-ЯA-Z][а-яa-z]+$/.test(data.patronymic))) {
            errors.patronymic = 'Отчество должно состоять из букв'
        }

        if (!data.gender) {
            errors.gender = 'Укажите пол';
        }

        if (!data.birthDay) {
            errors.birthDay = 'Введите дату рождения';
        } else if (Math.floor(new Date().getTime() - birthDay.getTime()) / (1000 * 60 * 60 * 24 * 365) < 16) {
            errors.birthDay = 'Возраст меньше 16 лет'
        }

        if (!data.telephone) {
            errors.telephone = 'Введите телефон';
        } else if (!(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(data.telephone))) {
            errors.telephone = 'Некорректный мобильный телефон';
        }

        if (!data.email) {
            errors.email = 'Введите адрес электронной почты';
        } else if (!(/.+@.+\..+/i.test(data.email))) {
            errors.email = 'Некорректный адрес электронной почты\''
        }

        if (!data.login) {
            errors.login = 'Введите логин';
        } else if (!(/^\w+$/.test(data.login))) {
            errors.login = 'Логин должен состояить из букв и цифр или только букв';
        } else if (data.login.length < 3 || data.login.length > 20) {
            errors.login = 'Длина логина должна быть от 3 до 20 символов';
        }

        if (!data.password) {
            errors.password = 'Введите пароль';
        } else if (data.password.length < 8 || data.password.length > 30) {
            errors.password = 'Длина пароля должна быть от 8 до 30 символов';
        }

        if (!data.password2 || data.password2 !== data.password) {
            errors.password2 = 'Пароли не совпадают';
        }

        return errors;
}