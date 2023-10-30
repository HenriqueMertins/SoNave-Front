import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"
import Estrelas from "./Estrelas"
import Link from "next/link"

export default function ItemFilme(props) {

  const { clienteId } = useContext(ClienteContext)

  return (
    <div className="col">
      <div className="card">
        <img src={props.filme.capa} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.filme.nome}</h5>
          <p className="card-text">
            {props.filme.preco} - {props.filme.km}
          </p>
          <p className="small">
            {props.filme.sinopse}
          </p>
        </div>
        {clienteId &&
          <div>
            <Estrelas soma={props.filme.soma} num={props.filme.num} />
            <div className="float-end">
              <i class="bi bi-chat-dots text-primary fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              <Link href={"/avaliar/"+props.filme.id}>
                <i class="bi bi-patch-plus text-danger fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
            </div>
          </div>
        }
      </div>
    </div >
  )
}