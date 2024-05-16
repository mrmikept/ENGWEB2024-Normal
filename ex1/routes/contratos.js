var express = require("express");
var router = express.Router();
var Contrato = require("../controllers/contratos");

//GET /contratos: devolve uma lista com todos os registos;

//GET /contratos?entidade=EEEE: devolve a lista dos contratos correspondentes à entidade
//EEEE;

//GET /contratos?tipo=AAA: devolve a lista dos contratos com tipo de procedimento igual a AAA;
router.get("/", function (req, res, next) {
  if (req.query.entidade) {
    Contrato.findByEntidade(req.query.entidade)
      .then((data) => {
        res.jsonp(data);
      })
      .catch((erro) => res.jsonp(erro));
  } else if (req.query.tipo) {
    Contrato.findByProcedimento(req.query.tipo)
      .then((data) => {
        res.jsonp(data);
      })
      .catch((erro) => res.jsonp(erro));
  } else {
    Contrato.listAll()
      .then((data) => {
        res.jsonp(data);
      })
      .catch((erro) => res.jsonp(erro));
  }
});

//GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições;
router.get("/tipos", function (req, res, next) {
  Contrato.getTiposProcedimento()
    .then((data) => {
      res.jsonp(data);
    })
    .catch((erro) => res.jsonp(erro));
});

// GET /entidades/id -> Devolve a informação de uma entidade pelo seu NIPC
router.get("/entidades/:id", function (req, res, next) {
  Contrato.infoEntidade(req.params.id)
    .then((data) => {
      res.jsonp(data);
    })
    .catch((erro) => res.jsonp(erro));
});

//GET /contratos/entidades: devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições;
router.get("/entidades", function (req, res, next) {
  Contrato.getEntidades()
    .then((data) => {
      res.jsonp(data);
    })
    .catch((erro) => res.jsonp(erro));
});

//GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato);
router.get("/:id", function (req, res, next) {
  Contrato.findById(req.params.id)
    .then((data) => {
      res.jsonp(data);
    })
    .catch((erro) => res.jsonp(erro));
});

//POST /contratos: acrescenta um registo novo à BD;
router.post("/", function (req, res, next) {
  Contrato.insert(req.body)
    .then((data) => {
      console.log("Novo contrato: " + req.body);
      res.jsonp(data);
    })
    .catch((erro) => res.jsonp(erro));
});

//DELETE /contratos/:id: elimina da BD o registo com o identificador id;
router.delete("/:id", function (req, res, next) {
  Contrato.remove(req.params.id)
    .then((data) => {
      console.log("Contrato removido: " + data.id);
      res.jsonp(data);
    })
    .catch((erro) => res.jsonp(erro));
});

//PUT /contratos/:id: altera o registo com o identificador id.
router.put("/:id", function (req, res, next) {
  Contrato.update(req.params.id, req.body)
    .then((data) => {
      console.log("Contrato atualizado: " + data.id);
      res.jsonp(data);
    })
    .catch((erro) => res.jsonp(erro));
});

module.exports = router;
