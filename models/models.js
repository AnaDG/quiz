var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
						{dialect: "sqlite", storage: "quiz.sqlite"}
					);

// Importar la definici�n de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//exportar definici�n de tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync crea e inicializa tabla de preguntas en BD.
sequelize.sync().success(function() {
	//success() ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0){ // la tabla se inicializa s�lo si est� vac�a
			Quiz.create({pregunta: 'Capital de Italia', 
						 respuesta: 'Roma'})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});