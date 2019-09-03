const db = require('../config/db');
const Curso = require('./curso');
const CursoDisciplina = require('./cursoDisciplina');

const Disciplina = db.sequelize.define('Disciplina', {
    IdDisciplina: {
        autoIncrement: true,
        allowNull: false,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    Sigla: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    Nome: {
        type: db.Sequelize.STRING
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: db.Sequelize.DATE
    }
});

Disciplina.associate = (models) => {
    Disciplina.belongsToMany(models.Cursos, {
        through: {
            model: CursoDisciplina,
            unique: false
        },
        as: 'disciplinas',
        foreignKey: 'IdDisciplina'
    });
}


//Faz a associação de chave estrangeira na tabela de Disciplina
//Curso.hasMany(Disciplina, {as: 'Disciplinas'})

//Comentar sempre após criar a tabela através do model, para não criar tabela duplicada no banco
//para criar a tabela executar o comando node [nome do model] ex. node disciplina.js
//Disciplina.sync({ force: true });


module.exports = Disciplina;
