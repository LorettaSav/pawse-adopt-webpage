import { useContext, useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export default function RequireAuth({children}) {
    const auth = useContext(AuthContext);
    const location = useLocation()

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            auth.logout()
        } else {
            auth.login()
        }
        setLoading(false)
    },[])

    if (!auth.user && !loading ) {
        return <Navigate to='/login' state={{from: location}} replace />    
    } else if (loading) {
        return <div>Loading..</div>
    }


    return (

        <div>
            {children}
        </div>

    )
}
