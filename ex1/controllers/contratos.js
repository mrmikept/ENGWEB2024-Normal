var Contratos = require("../models/contratos");

module.exports.listAll = () => {
  return Contratos.find().sort({ _id: 1 }).exec();
};

module.exports.findById = (id) => {
  return Contratos.findOne({ _id: id }).exec();
};

module.exports.findByEntidade = (entidade) => {
  return Contratos.find({ NIPC_entidade_comunicante: entidade }).exec();
};

module.exports.findByProcedimento = (tipo) => {
  return Contratos.find({ tipoprocedimento: tipo }).exec();
};

module.exports.getEntidades = () => {
  return Contratos.aggregate([
    {
      $group: {
        _id: "$entidade_comunicante",
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        Entidade: "$_id",
      },
    },
  ])
    .then((data) => {
      let list = [];
      data.forEach((element) => {
        list.push(element.Entidade);
      });
      return list;
    })
    .catch((erro) => {
      res.jsonp(erro);
    });
};

module.exports.getTiposProcedimento = () => {
  return Contratos.aggregate([
    {
      $group: {
        _id: "$tipoprocedimento",
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        TipoProcedimento: "$_id",
      },
    },
  ])
    .then((data) => {
      let list = [];
      data.forEach((element) => {
        list.push(element.TipoProcedimento);
      });
      return list;
    })
    .catch((erro) => {
      res.jsonp(erro);
    });
};

module.exports.infoEntidade = (nipcEntidade) => {
  return Contratos.aggregate([
    {
      $match: {
        NIPC_entidade_comunicante: nipcEntidade, // Substitua pelo NIPC desejado
      },
    },
    {
      $addFields: {
        precoContratualNum: {
          $toDouble: {
            $replaceAll: {
              input: "$precoContratual",
              find: ",",
              replacement: ".",
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$NIPC_entidade_comunicante",
        entidade_comunicante: { $first: "$entidade_comunicante" },
        totalAmount: { $sum: "$precoContratualNum" },
      },
    },
    {
      $project: {
        _id: 0,
        NIPC_entidade_comunicante: "$_id",
        entidade_comunicante: 1,
        totalAmount: 1,
      },
    },
  ]);
};

module.exports.insert = (contrato) => {
  const newContrato = new Contratos(contrato);
  return newContrato.save();
};

module.exports.remove = (id) => {
  return Contratos.findByIdAndDelete(id).exec();
};

module.exports.update = (id, contrato) => {
  return Contratos.findByIdAndUpdate(id, contrato, { new: true }).exec();
};
