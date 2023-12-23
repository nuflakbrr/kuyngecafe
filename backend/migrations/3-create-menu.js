"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu", {
      id_menu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nama_menu: {
        type: Sequelize.STRING,
      },
      jenis: {
        type: Sequelize.ENUM("makanan", "minuman"),
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      gambar: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("menu");
  },
};
