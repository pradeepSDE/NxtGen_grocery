import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
export const PrivateRoutes = () => {
  const  isAuthenticated = useSelector(state => state.auth.isAuthenticated)
return (
    isAuthenticated? (<Outlet/>) : (<Navigate to='/'/>)

  )
}

export const ProtectedRoute = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return !isAuthenticated ? <Outlet/> : <Navigate to='/'/>
}