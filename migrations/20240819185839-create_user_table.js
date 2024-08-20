'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      email: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      password_hash: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('Users');
  },
};
