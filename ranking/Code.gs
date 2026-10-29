// Ranking dos jogos: Jamaica Versions e Vai dá PT.
//
// Cole este arquivo no Apps Script de uma planilha do Google (Extensões > Apps Script)
// e publique como app da Web. Cada jogo manda seus placares pra cá e lê o top 10 daqui.
// Cada jogo tem a sua aba ("placares" pro Jamaica, "placares vai da pt" pro Vai dá PT):
// pra apagar uma trapaça, é só apagar a linha.

// id da planilha (o trecho entre /d/ e /edit no link dela); só é usado quando o
// projeto não está preso à planilha pelo menu Extensões
const PLANILHA = "148l_ppWTGH8GH2izXzPZdLH4I2pO2ZOPoWa-vYt-7So";
// cada jogo manda a sua chave em todo pedido; sem a chave certa não dá pra ler nem
// gravar o ranking daquele jogo. As chaves de verdade ficam só no Apps Script e cada
// uma no index.html do seu jogo: aqui no GitHub vão só os marcadores.
const JOGOS = {
  CHAVE_DO_JAMAICA: { aba: "placares",           fim: "chegou no baile" },
  CHAVE_DO_VAIDAPT: { aba: "placares vai da pt", fim: "chegou na saída" },
};
const DIFS = ["facil", "normal", "dificil"];
const MAX_PONTOS = 20000;   // bem acima do que dá pra fazer jogando de verdade
const MAX_METROS = 5000;

function aba_(jogo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(PLANILHA);
  let sh = ss.getSheetByName(jogo.aba);
  if (!sh) {
    sh = ss.insertSheet(jogo.aba);
    sh.appendRow(["data", "nome", "pontos", "metros", "dificuldade", jogo.fim]);
    sh.setFrozenRows(1);
  }
  return sh;
}

// top N de uma dificuldade, com um lugar por pessoa (vale o melhor placar de cada nome)
function top_(jogo, dif, n) {
  const linhas = aba_(jogo).getDataRange().getValues().slice(1);
  const melhor = {};
  for (const [data, nome, pontos, metros, d, venceu] of linhas) {
    if (d !== dif || !nome) continue;
    const chave = String(nome).toUpperCase();
    const p = Number(pontos) || 0;
    if (!melhor[chave] || p > melhor[chave].pontos) {
      melhor[chave] = { nome: String(nome), pontos: p, metros: Number(metros) || 0, venceu: venceu === true };
    }
  }
  return Object.values(melhor).sort((a, b) => b.pontos - a.pontos).slice(0, n);
}

function resposta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// GET ?chave=...&dif=normal  ->  { ok, dif, top }
function doGet(e) {
  const jogo = JOGOS[e.parameter.chave];
  if (!jogo) return resposta_({ ok: false, erro: "chave" });
  const dif = DIFS.indexOf(e.parameter.dif) >= 0 ? e.parameter.dif : "normal";
  return resposta_({ ok: true, dif: dif, top: top_(jogo, dif, 10) });
}

// POST {"chave","nome","pontos","metros","dif","venceu"}  ->  { ok, dif, top }
function doPost(e) {
  let p;
  try { p = JSON.parse(e.postData.contents); } catch (err) { return resposta_({ ok: false, erro: "json" }); }

  const jogo = JOGOS[p.chave];
  if (!jogo) return resposta_({ ok: false, erro: "chave" });
  // nome curto, sem caractere estranho e sem virar fórmula na planilha (=, +, -, @ no começo)
  const nome = String(p.nome || "").replace(/[\u0000-\u001f<>]/g, "").trim()
    .replace(/^[=+\-@]+/, "").slice(0, 16).toUpperCase();
  const pontos = Math.floor(Number(p.pontos));
  const metros = Math.floor(Number(p.metros));
  const dif = DIFS.indexOf(p.dif) >= 0 ? p.dif : null;
  if (!nome || !dif || !(pontos >= 0 && pontos <= MAX_PONTOS) || !(metros >= 0 && metros <= MAX_METROS)) {
    return resposta_({ ok: false, erro: "dados" });
  }

  const trava = LockService.getScriptLock();
  trava.waitLock(5000);
  try {
    aba_(jogo).appendRow([new Date(), nome, pontos, metros, dif, p.venceu === true]);
  } finally {
    trava.releaseLock();
  }
  return resposta_({ ok: true, dif: dif, top: top_(jogo, dif, 10) });
}
