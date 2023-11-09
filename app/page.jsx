'use client'

import ItemFilme from "@/components/ItemFilme"
import { useEffect, useState } from "react"
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'

export default function Home() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    async function getFilmes() {
      const response = await fetch("http://localhost:3004/filmes?destaque=true")
      const dados = await response.json()
      setFilmes(dados)
    }
    getFilmes()
  }, [])

  const listaFilmes = filmes.map(filme => (
    <ItemFilme key={filme.id}
      filme={filme}
    />
  ))
  async function filtraDados(data) {
    if (data.pesq.length == 0) {
      const response = await fetch("http://localhost:3004/filmes?destaque=true" )
      const dados = await response.json()

      if (dados.length == 0) {
        Swal.fire("Não há filmes com a palavra chave informada...")
        return
      }
  
      setFilmes(dados)
      return
      
    } else if (data.pesq.length < 2) {
      Swal.fire("Digite, no mínimo, 2 caracteres")
      return
    } 

    // busca todos os dados e aplica o filtro no vetor
    // -----------------------------------------------
    const pesquisa = data.pesq.toUpperCase()
    const response = await fetch("http://localhost:3004/filmes?nome_like=" + pesquisa )
    const dados = await response.json()
    // const novosDados = dados.filter(filme =>
    //   filme.nome.toUpperCase().includes(pesquisa) 
    // )

    if (dados.length == 0) {
      Swal.fire("Não há filmes com a palavra chave informada...")
      return
    }

    setFilmes(dados)

    // busca os dados da API já com o filtro
    // --------------------------------------
    // const response = await fetch("http://localhost:3004/filmes?titulo="+data.pesq)
    // const dados = await response.json()
    // setFilmes(dados)
  }


  return (
    <div className="container mt-3">
      <div className="col input-group my-3">
          <Pesquisa filtra={filtraDados} />
        </div>
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
        {listaFilmes}
      </div>
    </div>
  )
}
