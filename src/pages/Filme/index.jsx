import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import{Link} from 'react-router-dom'
import api from "../../services/api"
import "./index.css"
import { toast } from 'react-toastify'

function Filme(){
    const {id} = useParams()
    const [filme,setFilme] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "9d848bcea34525657f73bb675fb9b9df",
                    language: "pt-br"
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch((error)=>{
                console.error("Erro ao carregar filme:",error)
                setError(true)
                setLoading(false)
            })
        }
        loadFilme()

    },[id])

    function salvarFilme(){
        const minha_lista = localStorage.getItem("@meusfilmes")

        let filmes_salvos = JSON.parse(minha_lista) || []

        const is_salvo = filmes_salvos.some((filme_salvo) =>
            filme_salvo.id === filme.id
        )

        if(is_salvo){
            toast.warn("Esse filme já está na sua lista.")
            return
        }

        filmes_salvos.push(filme)
        localStorage.setItem("@meusfilmes", JSON.stringify(filmes_salvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="loading">
                <h2>Filme não encontrado</h2>
                <Link to="/" className='back-to-home'>Voltar à página inicial</Link>
            </div>
        )
    }

    return(
        <div className='filme-info'>
                        <h2>{filme.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} srcset="" />

                        <div className="info">
                            <div className="info-body">
                                <h3>Sinopse</h3>
                                <p className='sinopse'>{filme.overview}</p>
                            </div>
                            <div className="info-header">
                                <strong className="rating">Avaliação: {filme.vote_average}/10</strong>
                            </div>

                            <div className="actions">
                                <button className='botao' onClick={salvarFilme}>Salvar</button>
                                <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target='_blank' rel='exeternal'><button className='botao secondary'>Trailer</button></a>
                            </div>
                        </div>
        </div>
    )
}

export default Filme