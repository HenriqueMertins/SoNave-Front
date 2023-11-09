import { useForm } from "react-hook-form"

export default function Pesquisa(props) {

  const { register, handleSubmit, reset } = useForm()

  async function limpa() {
    reset({
      pesq: ""
    })
    await handleSubmit(props.mostra)
  }

  return (
    <form className="row row-cols-lg-auto g-3 align-items-center"
      onSubmit={handleSubmit(props.filtra)}>

        <div className="col input-group my-3">
          <input type="text" className="form-control" placeholder="Nome ou Marca" {...register("pesq")}  />
          <button className="btn btn-warning text-white" type="submit">Pesquisar</button>
        </div>


    </form>
  )
}
