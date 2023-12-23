"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaksi", {
      id_transaksi: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tgl_transaksi: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id_user",
        },
      },
      id_meja: {
        type: Sequelize.INTEGER,
        references: {
          model: "meja",
          key: "id_meja",
        },
      },
      nama_pelanggan: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("belum_bayar", "lunas"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transaksi");
  },
};
