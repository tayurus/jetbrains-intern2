'use strict';
//подключаемые модули
const cors = require('cors');
var express = require('express'), //собственно, сервер
    app = express(), // объект типа "сервер"
    bodyParser = require('body-parser'), //модуль, который парсит post-запрос
    path = require('path');
app.use(cors());
app.options('*', cors());
// данные
const data = require('./data.json');

app.use(bodyParser.urlencoded({extended: false}));

//установка пути, где находятся файлы
app.use(express.static(__dirname));

app.get('/data', function (req, res) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

//слушаем порт
app.listen(8000, () => console.log('Backend is running on port 8000'));
