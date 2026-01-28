import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./index.css"
import { toast } from "react-toastify"

function Favoritos(){
    const [filmes, setFilmes] = useState([])
    useEffect(()=>{
        const minha_lista = localStorage.getItem("@meusfilmes")
        setFilmes(JSON.parse(minha_lista) || [])
    }, [])

    function excluirFilme(id){
        let filtro_filme = filmes.filter((filme)=>{
            return (filme.id != id)
        })

        setFilmes(filtro_filme)
        localStorage.setItem("@meusfilmes", JSON.stringify(filtro_filme))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className="meus-favoritos">
            <h2>Favoritos</h2>
            {filmes.length === 0 && <p className="loading">Nenhum filme salvo encontrado</p>}
            <ul>
                {filmes.map((filme) => {
                    return(
                        <li key={filme.id}>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <div>
                                <Link to={`/filme/${filme.id}`}><button className="botao">Detalhes</button></Link>
                                <button className="botao excluir" onClick={()=> excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos