import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { useCategories } from '../../hooks/useCategories';
import { useContents } from '../../hooks/useContents';
import { useMembro } from '../../hooks/useMembro';
import { Content } from '../Content';
import { Video } from '../Video';
import './style.scss';

export const AcessoRestrito = ({  }) => {

    const Conteudos = () => {

        useEffect(() => {

            if(currentCategory) {
                api.post('/get_content', {assinatura: member.assinatura, categoria: currentCategory})
                .then(response => setContents(response.data.filter(content => !content.video)))
                .catch(error => console.error(error))
                .finally(() => setCurrentCategory(false))
            }

        }, [currentCategory])

        return (
            <div className="contents-container">
                <div className="categories-container">
                    <h2>Categorias</h2>
                    {categories.map(category => <p onClick={() => setCurrentCategory(category.nome)} key={category.id}>{category.nome}</p>)}
                </div>
                <hr />
                <div className="posts-container">
                    {contents.map(content => <Content key={content.id} content={content} />)}
                </div>
            </div>
        )
    }

    const Videos = () => {

        return (
            <div className="videos-container">
                {videos.map(video => <Video key={video.id} video={video} />)}
            </div>
        )
    }

    const location = useLocation()
    const navigate = useNavigate()
    const [member, setMember] = useMembro()
    const [categories, setCategories] = useCategories()
    const [contents, setContents] = useContents()

    const [currentCategory, setCurrentCategory] = useState('Diretrizes')
    const [videos, setVideos] = useState([])

    useEffect(() => {
        api.post('/get_content/videos', {assinatura: member.assinatura})
        .then(response => setVideos(response.data))
        .catch(error => console.error(error))
        
    }, [])

    return (
        <div className={`restrito-container`}>
            <div className="menu-container">
                <h1 onClick={() => navigate('/perfil/conteudos')}>Conteúdos</h1>
                <hr />
                <h1 onClick={() => navigate('/perfil/conteudos/videos')}>Vídeos</h1>
            </div>
            <Routes>
                <Route index element={<Conteudos />} />
                <Route path='/videos' element={<Videos />} />
            </Routes>
        </div>
    )
}