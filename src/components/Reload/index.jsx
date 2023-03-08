import { useEffect } from "react"
import { api } from "../../api"
import { useMembro } from "../../hooks/useMembro"

export const Reload = () => {
    const [membro, setMembro] = useMembro()

    useEffect(() => {
        api.post('/member/update/temporario', {id: membro.id})
        .then(response => window.top.location.reload())
    }, [])
    
    return (
        <div className='Reload-Component' >
            
        </div>
    )
}