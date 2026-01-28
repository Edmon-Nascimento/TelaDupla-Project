import { useEffect, useState } from "react"
import{Link, useLocation, useNavigate} from 'react-router-dom'
import api from "../../services/api"
import "./index.css"

function Home(){
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        const params = new URLSearchParams(location.search)
        const p = parseInt(params.get('page') || '1', 10) || 1
        if(p !== page) setPage(p)
    },[location.search])

    useEffect(()=>{
        async function loadFilmes() {
            setLoading(true)
            try{
                const response = await api.get("movie/now_playing",{
                    params:{
                        api_key: "9d848bcea34525657f73bb675fb9b9df",
                        language: "pt-BR",
                        page: page,
                    }
                })
                setFilmes(response.data.results.slice(0,12))
                setTotalPages(response.data.total_pages || 1)
            }catch(err){
                setFilmes([])
                setTotalPages(1)
            }finally{
                setLoading(false)
            }
        }
        loadFilmes()
    },[page])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <main className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <div className="filme" key={filme.id}>
                            <Link to={`/filme/${filme.id}`} className="poster">
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            </Link>
                            <div className="title-wrap">
                                <h2>{filme.title}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="pagination">
                <button
                    className="btn-pagina"
                    disabled={page === 1}
                    onClick={() => {
                        const params = new URLSearchParams(location.search)
                        params.set('page', String(Math.max(1, page - 1)))
                        navigate(`${location.pathname}?${params.toString()}`)
                    }}
                >Anterior</button>

                <span className="page-info">Página {page} de {totalPages}</span>

                <button
                    className="btn-pagina"
                    disabled={page >= totalPages}
                    onClick={() => {
                        const params = new URLSearchParams(location.search)
                        params.set('page', String(Math.min(totalPages, page + 1)))
                        navigate(`${location.pathname}?${params.toString()}`)
                    }}
                >Próxima</button>
            </div>
        </main>
    )
}

export default Home