import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isTeacher = false
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const {userId ,email, roles } = decoded.UserInfo

        isTeacher = roles.includes('Teacher')
        isAdmin = roles.includes('Admin')

        if (isTeacher) status = "Teacher"
        if (isAdmin) status = "Admin"

        return {userId , email, roles, status, isTeacher, isAdmin }
    }

    return {userId: '' , email: '', roles: [], isTeacher, isAdmin, status }
}
export default useAuth