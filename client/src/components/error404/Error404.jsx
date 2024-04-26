import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Error404(){
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=> navigate('/'), 3000)
    },[])

    return <div>
        <img src="https://blog.sinapsis.agency/wp-content/uploads/2021/04/DEFINICIONES.-ERROR-404.png" alt="error404" />
    </div>
}

export default Error404