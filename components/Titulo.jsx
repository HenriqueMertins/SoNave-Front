'use client'
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

import { useForm } from "react-hook-form"

import Link from "next/link"

export default function Titulo() {
  const { clienteNome, mudaId, mudaNome, register, handleSubmit, reset } = useContext(ClienteContext)

  function logout() {
    if (confirm("Confirma a saída do sistema? ")) {
      mudaId(null)
      mudaNome("")
      localStorage.removeItem("cliente_logado")
    }
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
        <div className="col input-group my-3"
          onSubmit={handleSubmit(props.filtra)}
          onReset={handleSubmit(props.mostra)}>
          <input type="text" className="form-control" placeholder="Nome ou Marca" {...register("pesq")} />
          <button className="btn btn-warning text-white" type="button">Pesquisar</button>
        </div>
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