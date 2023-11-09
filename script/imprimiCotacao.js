const lista = document.querySelectorAll('[data-lista]')

function selecionaCotacao(nome, valor) {
  lista.forEach((listaSelecionada) => {
    if(listaSelecionada.id == nome) {
      imprimeCotacao(listaSelecionada, nome, valor)
    }
  })
}

function imprimeCotacao(lista, nome, valor) {
  lista.innerHTML = ''
  const plurais = {
    dolar: "dolares",
    iene: "ienes",
    bitcoin: "bitcoins"
  }

  for(let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10) {
    const listaItem = document.createElement('li')
    listaItem.innerHTML = `${multiplicador} ${multiplicador === 1 ? nome : plurais[nome]}: R$${(valor * multiplicador).toFixed(2)}`
    lista.appendChild(listaItem)
  }
}

export default selecionaCotacao