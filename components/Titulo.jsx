'use client'
import { useContext, useState } from "react"
import { ClienteContext } from "@/contexts/cliente"
import  Pesquisa  from "@/components/Pesquisa"
import Swal from 'sweetalert2'

import { useForm } from "react-hook-form" 

import Link from "next/link"

export default function Titulo() {
  const { clienteNome, mudaId, mudaNome, handleSubmit } = useContext(ClienteContext)
  const [filmes, setFilmes] = useState([])

  function logout() {
    if (confirm("Confirma a saída do sistema? ")) {
      mudaId(null)
      mudaNome("")
      localStorage.removeItem("cliente_logado")
    }
  }

  async function filtraDados(data) {
    if (data.pesq.length < 2) {
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
    <nav className="navbar bg-danger">
      <div className="container-fluid">
        <div className="col" >
          <Link className="navbar-brand text-white" href="/">
            <img src="./carro.png" alt="Logo"
              width="40" height="48" className="float-start d-inline-block align-text-top" />
            <h3 className="float-start mt-2 ms-2" style={{ color: 'white', fontWeight: 'bold' }}>Só Nave Top</h3>
          </Link>
        </div>
        {/* <div className="col input-group my-3">
          <Pesquisa filtra={filtraDados} />
        </div> */}
        <div className="col">
          <h5 className="text-white text-end">
            {clienteNome ? clienteNome : "Identifique-se"}
            {
              clienteNome ?
                <i class="ms-2 fs-4 bi bi-person-fill-down" style={{ cursor: 'pointer' }} onClick={logout}></i> :
                <Link href="/login"><i class="ms-2 fs-4 bi bi-person-fill-up text-white"></i></Link>
            }
          </h5>
          
        </div>

      </div>
    </nav>
  )
}