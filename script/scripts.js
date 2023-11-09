// MOEDA DOLAR 

import selecionaCotacao from "./imprimiCotacao.js";
const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1,
      borderColor: 'rgb(0, 222, 163)'
    }]
  }
});

function geraHorario() {
  let data = new Date()
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getMilliseconds()
  return horario
}

function adicionaDados(grafico, legenda, valor) {
  grafico.data.labels.push(legenda)
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(valor)
  })
  grafico.update()
}

let workerDolar = new Worker('./script/workers/workerDolar.js')
workerDolar.postMessage('usd')

workerDolar.addEventListener('message', event => {
  let tempo = geraHorario()
  let valor = event.data.ask
  selecionaCotacao("dolar", valor)
  adicionaDados(graficoParaDolar, tempo, valor)
})

// MOEDA IENE 

const graficoIene = document.getElementById('graficoIene')

const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1,
      borderColor: 'rgb(94, 116, 199)'
    }]
  }
})

let workerIene = new Worker('./script/workers/workerIene.js')
workerIene.postMessage('iene')

workerIene.addEventListener('message', event => {
  let tempo = geraHorario()
  let valor = event.data.ask
  adicionaDados(graficoParaIene, tempo, valor)
  selecionaCotacao('iene', valor)
})

// MOEDA BITCOIN

const graficoBitcoin = document.getElementById('graficoBitcoin')
const graficoParaBitcoin = new Chart(graficoBitcoin, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Bitcoin',
      data: [],
      borderWidth: 1,
      borderColor: 'rgb(248, 213, 57)'
    }]
  }
})

let workerBitcoin = new Worker('./script/workers/workerBitcoin.js')
workerBitcoin.postMessage('bitcoin')

workerBitcoin.addEventListener('message', event => {
  let tempo = geraHorario()
  let valor = event.data.ask
  adicionaDados(graficoParaBitcoin, tempo, valor)
  selecionaCotacao('bitcoin', valor)
})