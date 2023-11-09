'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Estrelas from '@/components/Estrelas'
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

export default function Avaliar() {
  const params = useParams()
  const [filme, setFilme] = useState({})
  const { clienteId } = useContext(ClienteContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { estrelas: 3 }
  })

  useEffect(() => {
    async function getFilme() {
      const response = await fetch("http://localhost:3004/filmes/" + params.id)
      const dado = await response.json()
          //  console.log(dado)
      setFilme({
        id: dado.id,
        nome: dado.nome,
        carroceria: dado.carroceria,
        preco: dado.preco,
        km: dado.km,
        ano: dado.ano,
        cidade: dado.cidade,
        cambio: dado.cambio,
        capa: dado.capa,
        sinopse: dado.sinopse,
        soma: dado.soma,
        num: dado.num
      })
    }
    getFilme()
      //  console.log(filme)
  }, [])

  async function enviaComentario(data) {
    const avaliacao = {...data, cliente_id: clienteId, filme_id: filme.id, data: new Date()}

    const avalia = await fetch("http://localhost:3004/avaliacoes",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(avaliacao)
      },
    )

    const altera = {soma: Number(filme.soma) + Number(data.estrelas), num: Number(filme.num) + 1}
    const atualiza_estrelas = await fetch("http://localhost:3004/filmes/"+filme.id,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(altera)
      },
    )

    if (avalia.status == 201 && atualiza_estrelas.status == 200) {
      alert("Ok! Avaliação cadastrada com sucesso")
      reset()
    } else {
      alert("Erro no cadastro da avaliação...")
    }
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <img src={filme.capa} alt="Filme" width={300} className="mx-auto d-block mt-1" />
            <div className="card-body">
              <h5 className="card-title">
                {filme.titulo}
              </h5>
              <p className="card-text">
                {filme.genero} - {filme.duracao}
              </p>
              <p className="card-text small">
                Sobre a Nave Top: {filme.artista}
              </p>
              <p className="card-text small">
                {filme.sinopse}
              </p>
              <Estrelas soma={filme.soma} num={filme.num} />
              <span className="ms-2">{filme.num} avaliações</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <form className="card-body" onSubmit={handleSubmit(enviaComentario)}>
              <h3 className="card-title">Comentarios do Veículo</h3>
            
              
        
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}