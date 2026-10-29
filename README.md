# Jamaica Versions

Jogo de travessia da Iseo e do Dodosom, feito em cima do [Vai dá PT](https://vaidar-pt-eng.github.io/vaidar-pt/):
a dupla atravessa a orla com o sound system desviando do coxa, da ROTA e dos
ROCAM 244 (e do Tadeu, do Kaue e do Gabriel Vagalume). Junte 3 baseados e a DILJAMAICA entra
na frente segurando a polícia.

## Arquivos

- `index.html` — o jogo inteiro (HTML, CSS, canvas e sprites num arquivo só).
- `gabriel.png` — o Gabriel Vagalume recortado da foto, com fundo transparente.
  Enquanto o arquivo não existir, o jogo roda sem ele.

## Rodar

Abrir o `index.html` no navegador resolve. Para servir por HTTP:

```bash
python -m http.server 8131
```

## Como funciona

- **Obstáculos:** o coxa (policial a pé, mais devagar), a ROTA (viatura, segue
  o chão) e os ROCAM 244 (moto, mais rápida e muda de raia sozinha, a partir de
  150 m no normal e difícil). O Tadeu vem de Corsa verde, o Kaue de Logan e o
  Gabriel Vagalume agachadinho, dando pulinhos com a aura verde.
- **Itens:** bud vale 50 pontos, bud roxo devolve uma vida.
- **Baseados:** cada 3 chamam a DILJAMAICA por 9 segundos; enquanto ela estiver
  na frente, toda polícia que encostar é barrada e ainda vale 15 pontos.
- Atalhos de teste na URL: `?meta=300` encurta a travessia e `?escudo=1` já
  começa com a DILJAMAICA em campo.

## Ranking da galera

Cada um digita o nome na tela inicial (o celular lembra). No fim da partida o
placar vai pro ranking e a tela final mostra o top 3 e a sua posição; o botão
RANKING abre o top 10 de cada dificuldade, com um lugar por pessoa.

Os placares ficam numa planilha do Google: o código está em `ranking/Code.gs`,
colado no Apps Script da planilha e publicado como app da Web. O link do app
(termina em `/exec`) vai em `RANKING_URL`, no `index.html`. Com `RANKING_URL`
vazio, o jogo roda sem ranking. Pra apagar uma trapaça, é só apagar a linha na
aba `placares` da planilha.

## Publicar

Fica no GitHub Pages em
<https://iseoedodosom-jameicaversions-eng.github.io/iseoedodosom-jameicaversions/>,
servido do `index.html` na raiz do branch `main`:

```bash
git add -A && git commit -m "o que mudou" && git push
```
