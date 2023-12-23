"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("meja", {
      id_meja: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nomor_meja: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("kosong", "terisi"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("meja");
  },
};
