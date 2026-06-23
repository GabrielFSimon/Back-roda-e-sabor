function normalizeInput(body, aliases = {}) {
  const data = {};

  for (const [targetField, possibleKeys] of Object.entries(aliases)) {
    if (body[targetField] !== undefined) {
      data[targetField] = body[targetField];
      continue;
    }

    for (const key of possibleKeys) {
      if (body[key] !== undefined) {
        data[targetField] = body[key];
        break;
      }
    }
  }

  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && data[key] === undefined && !Object.values(aliases).flat().includes(key)) {
      data[key] = value;
    }
  }

  return data;
}

async function listAll(Model, where = {}) {
  return Model.findAll({ where, order: [['id', 'ASC']] });
}

async function findById(Model, id, where = {}) {
  return Model.findOne({ where: { id, ...where } });
}

async function createRecord(Model, body, aliases = {}) {
  const data = normalizeInput(body, aliases);
  return Model.create(data);
}

async function updateRecord(Model, id, body, aliases = {}, where = {}) {
  const registro = await findById(Model, id, where);
  if (!registro) return null;

  const data = normalizeInput(body, aliases);
  await registro.update(data);
  return registro;
}

async function removeRecord(Model, id, where = {}) {
  const registro = await findById(Model, id, where);
  if (!registro) return null;

  await registro.destroy();
  return registro;
}

function respondNotFound(res, mensagem = 'Registro não encontrado.') {
  return res.status(404).json({ mensagem });
}

export {
  normalizeInput,
  listAll,
  findById,
  createRecord,
  updateRecord,
  removeRecord,
  respondNotFound,
};
