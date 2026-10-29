# Jamaica Versions

Jogo de travessia da Iseo e do Dodosom, feito em cima do [Vai dá PT](https://vaidar-pt-eng.github.io/vaidar-pt/):
a dupla atravessa a orla com o sound system desviando de policial, viatura e
moto da polícia (e do Gabriel Vagalume). Junte 3 baseados e a DILJAMAICA entra
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

- **Obstáculos:** policial (vem a pé, mais devagar), viatura (segue o chão) e
  moto da polícia (mais rápida e muda de raia sozinha, a partir de 150 m no
  normal e difícil). O Gabriel Vagalume vem agachadinho, dando pulinhos.
- **Itens:** bud vale 50 pontos, bud roxo devolve uma vida.
- **Baseados:** cada 3 chamam a DILJAMAICA por 9 segundos; enquanto ela estiver
  na frente, toda polícia que encostar é barrada e ainda vale 15 pontos.
- Atalhos de teste na URL: `?meta=300` encurta a travessia e `?escudo=1` já
  começa com a DILJAMAICA em campo.

## Publicar

Fica no GitHub Pages em
<https://iseoedodosom-jameicaversions-eng.github.io/iseoedodosom-jameicaversions/>,
servido do `index.html` na raiz do branch `main`:

```bash
git add -A && git commit -m "o que mudou" && git push
```
