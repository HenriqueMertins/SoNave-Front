'use client'

import ItemFilme from "@/components/ItemFilme"
import { useEffect, useState } from "react"

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

  return (
    <div className="container mt-3">
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
        {listaFilmes}
      </div>
    </div>
  )
}
