"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detail_transaksi", {
      id_detail_transaksi: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        references: {
          model: "transaksi",
          key: "id_transaksi",
        },
      },
      id_menu: {
        type: Sequelize.INTEGER,
        references: {
          model: "menu",
          key: "id_menu",
        },
      },
      harga: {
        type: Sequelize.INTEGER,
      },
      jumlah: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("detail_transaksi");
  },
};
