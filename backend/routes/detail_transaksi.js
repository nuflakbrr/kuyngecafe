const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../auth");
const { Op, fn, col, literal } = require("sequelize");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const model = require("../models/index");
const detail_transaksi = model.detail_transaksi;

app.get("/getAllData", auth, async (req, res) => {
  await detail_transaksi
    .findAll()
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.get("/getById/:id", auth, async (req, res) => {
  await detail_transaksi
    .findByPk(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          status: "success",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "data tidak ditemukan",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.get("/getByIdTransaksi/:id_transaksi", auth, async (req, res) => {
  await detail_transaksi
    .findAll({
      where: { id_transaksi: req.params.id_transaksi },
      include: [
        {
          model: model.menu,
          as: "menu",
        },
      ],
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.post("/create", async (req, res) => {
  const data = {
    id_transaksi: req.body.id_transaksi,
    id_menu: req.body.id_menu,
    harga: req.body.harga,
    jumlah: req.body.jumlah,
  };

  await detail_transaksi
    .create(data)
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "detail transaksi berhasil ditambahkan",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.delete("/delete/:id_detail_transaksi", auth, async (req, res) => {
  const param = { id_detail_transaksi: req.params.id_detail_transaksi };

  detail_transaksi
    .destroy({ where: param })
    .then((result) => {
      if (result) {
        res.status(200).json({
          status: "success",
          message: "detail transaksi berhasil dihapus",
          data: param,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "data tidak ditemukan",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.patch("/edit/:id_detail_transaksi", auth, async (req, res) => {
  const param = { id_detail_transaksi: req.params.id_detail_transaksi };
  const data = {
    id_transaksi: req.body.id_transaksi,
    id_menu: req.body.id_menu,
    harga: req.body.harga,
    jumlah: req.body.jumlah,
  };

  detail_transaksi.findOne({ where: param }).then((result) => {
    if (result) {
      detail_transaksi
        .update(data, { where: param })
        .then((result) => {
          res.status(200).json({
            status: "success",
            message: "data berhasil diubah",
            data: {
              id_detail_transaksi: param.id_detail_transaksi,
              ...data,
            },
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: "error",
            message: error.message,
          });
        });
    } else {
      res.status(404).json({
        status: "error",
        message: "data tidak ditemukan",
      });
    }
  });
});

app.get("/getMenu", auth, async (req, res) => {
  await detail_transaksi
    .findAll({
      attributes: [
        'id_menu',
        [fn('SUM', col('detail_transaksi.jumlah')), 'jumlah']
      ],
      include: [
        {
          model: model.menu,
          as: 'menu'
        }
      ],
      group: ['id_menu'],
      order: [[literal('jumlah'), 'DESC']]
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.get("/getPendapatan/:tgl_transaksi", auth, async (req, res) => {
  const param = { tgl_transaksi: req.params.tgl_transaksi };
  await detail_transaksi
    .findAll({
      attributes: [
        [fn('SUM', col('detail_transaksi.harga')), 'pendapatan']
      ],
      include: [
        {
          model: model.transaksi,
          as: 'transaksi',
          where: {
            tgl_transaksi: {
              [Op.between]: [
                param.tgl_transaksi + " 00:00:00",
                param.tgl_transaksi + " 23:59:59",
              ],
            }
          },
        }
      ],
      group: ['detail_transaksi.id_transaksi']
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
        total_keseluruhan: result.reduce((a, b) => a + parseInt(b.dataValues.pendapatan), 0)
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

app.get("/getPendapatanBulan/:tgl_transaksi", auth, async (req, res) => {
  const param = { tgl_transaksi: req.params.tgl_transaksi };
  await detail_transaksi
    .findAll({
      attributes: [
        [fn('SUM', col('detail_transaksi.harga')), 'pendapatan']
      ],
      include: [
        {
          model: model.transaksi,
          as: 'transaksi',
          where: literal(`MONTH(tgl_transaksi) = ${param.tgl_transaksi}`)
        }
      ],
      group: ['detail_transaksi.id_transaksi']
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
        total_keseluruhan: result.reduce((a, b) => a + parseInt(b.dataValues.pendapatan), 0)
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

module.exports = app;