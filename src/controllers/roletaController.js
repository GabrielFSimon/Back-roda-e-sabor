import { Op } from 'sequelize';
import { sequelize, PremioRoleta, PremioUsuario, TransacaoPonto } from '../models/index.js';
import { limparUsuario } from '../utils/auth.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const premioAliases = {
  descontoPercentual: ['desconto_percentual'],
  probabilidadeVitoria: ['probabilidade_vitoria'],
};

const cupomAliases = {
  usuarioId: ['usuario_id'],
  premioId: ['premio_id'],
  descontoPercentual: ['desconto_percentual'],
  resgatadoEm: ['resgatado_em'],
  expiraEm: ['expira_em'],
};

function premioToResponse(premio) {
  return {
    id: premio.id,
    label: premio.nome,
    nome: premio.nome,
    descricao: premio.descricao,
    desconto_percentual: premio.descontoPercentual,
    probabilidade_vitoria: premio.probabilidadeVitoria,
    color: premio.cor,
    cor: premio.cor,
  };
}

function escolherPremio(premios) {
  const pesos = premios.map((premio) => Number(premio.probabilidadeVitoria || 0));
  const total = pesos.reduce((soma, peso) => soma + peso, 0);
  if (total <= 0) return null;

  let sorte = Math.random() * total;
  for (const premio of premios) {
    sorte -= Number(premio.probabilidadeVitoria || 0);
    if (sorte <= 0) return premio;
  }

  return null;
}

async function premios(req, res, next) {
  try {
    const lista = await listAll(PremioRoleta, { ativo: true });
    res.json(lista.map(premioToResponse));
  } catch (error) {
    next(error);
  }
}

async function premiosAdmin(req, res, next) {
  try {
    const lista = await listAll(PremioRoleta);
    res.json(lista.map(premioToResponse));
  } catch (error) {
    next(error);
  }
}

async function buscarPremio(req, res, next) {
  try {
    const premio = await findById(PremioRoleta, req.params.id);
    if (!premio) return respondNotFound(res, 'Prêmio não encontrado.');
    res.json(premioToResponse(premio));
  } catch (error) {
    next(error);
  }
}

async function criarPremio(req, res, next) {
  try {
    const premio = await createRecord(PremioRoleta, req.body, premioAliases);
    res.status(201).json(premioToResponse(premio));
  } catch (error) {
    next(error);
  }
}

async function atualizarPremio(req, res, next) {
  try {
    const premio = await updateRecord(PremioRoleta, req.params.id, req.body, premioAliases);
    if (!premio) return respondNotFound(res, 'Prêmio não encontrado.');
    res.json(premioToResponse(premio));
  } catch (error) {
    next(error);
  }
}

async function removerPremio(req, res, next) {
  try {
    const premio = await removeRecord(PremioRoleta, req.params.id);
    if (!premio) return respondNotFound(res, 'Prêmio não encontrado.');
    res.json(premioToResponse(premio));
  } catch (error) {
    next(error);
  }
}

async function cupons(req, res, next) {
  try {
    const lista = await listAll(PremioUsuario, { usuarioId: req.usuario.id });
    res.json(lista);
  } catch (error) {
    next(error);
  }
}

async function cuponsAdmin(req, res, next) {
  try {
    res.json(await listAll(PremioUsuario));
  } catch (error) {
    next(error);
  }
}

async function buscarCupom(req, res, next) {
  try {
    const cupom = await findById(PremioUsuario, req.params.id);
    if (!cupom) return respondNotFound(res, 'Cupom não encontrado.');
    res.json(cupom);
  } catch (error) {
    next(error);
  }
}

async function criarCupom(req, res, next) {
  try {
    const cupom = await createRecord(PremioUsuario, req.body, cupomAliases);
    res.status(201).json(cupom);
  } catch (error) {
    next(error);
  }
}

async function atualizarCupom(req, res, next) {
  try {
    const cupom = await updateRecord(PremioUsuario, req.params.id, req.body, cupomAliases);
    if (!cupom) return respondNotFound(res, 'Cupom não encontrado.');
    res.json(cupom);
  } catch (error) {
    next(error);
  }
}

async function removerCupom(req, res, next) {
  try {
    const cupom = await removeRecord(PremioUsuario, req.params.id);
    if (!cupom) return respondNotFound(res, 'Cupom não encontrado.');
    res.json(cupom);
  } catch (error) {
    next(error);
  }
}

async function girar(req, res, next) {
  try {
    const usuario = req.usuario;
    const pontosDisponiveis = Number(usuario.pontos || 0);

    if (pontosDisponiveis < 100) {
      return res.status(400).json({ mensagem: 'Você precisa de 100 pontos para girar a roleta.' });
    }

    const premioSelecionado = escolherPremio(await listAll(PremioRoleta, { ativo: true }));

    const resultado = await sequelize.transaction(async (transaction) => {
      await usuario.decrement('pontos', { by: 100, transaction });

      await TransacaoPonto.create({
        usuarioId: usuario.id,
        pedidoId: null,
        valor: 100,
        tipo: 'debito',
        descricao: 'Giro na roleta.',
      }, { transaction });

      let cupom = null;

      if (premioSelecionado && Number(premioSelecionado.descontoPercentual || 0) > 0) {
        const expiraEm = new Date();
        expiraEm.setDate(expiraEm.getDate() + 30);

        cupom = await PremioUsuario.create({
          usuarioId: usuario.id,
          premioId: premioSelecionado.id,
          codigo: `RODA-${Date.now().toString(36).toUpperCase()}`,
          descontoPercentual: premioSelecionado.descontoPercentual,
          resgatado: false,
          expiraEm,
        }, { transaction });
      }

      return {
        premio: premioSelecionado,
        cupom,
        usuario: await usuario.reload({ transaction }),
      };
    });

    const premio = resultado.premio ? premioToResponse(resultado.premio) : null;
    const ganhouPremio = Boolean(resultado.premio);

    res.json({
      success: true,
      prizeLabel: premio ? premio.label : null,
      premio,
      couponCode: resultado.cupom ? resultado.cupom.codigo : null,
      cupom: resultado.cupom,
      message: ganhouPremio
        ? (resultado.cupom
          ? `Você ganhou ${premio.label}! Cupom ${resultado.cupom.codigo} criado.`
          : `Você ganhou ${premio.label}!`)
        : 'Não foi dessa vez. Continue comprando para acumular pontos e tentar novamente!',
      usuario: limparUsuario(resultado.usuario),
    });
  } catch (error) {
    next(error);
  }
}

export {
  premios,
  premiosAdmin,
  buscarPremio,
  criarPremio,
  atualizarPremio,
  removerPremio,
  cupons,
  cuponsAdmin,
  buscarCupom,
  criarCupom,
  atualizarCupom,
  removerCupom,
  girar,
};
