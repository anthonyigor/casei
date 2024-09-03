import axios from "axios"
import getSession from "./getSession"


const getConvidadosByUser = async() => {
    const session = await getSession()
    const convidados = await axios.post('http://localhost:5000/users/convidados', {
        email: session?.user?.email
    })
   return convidados.data
}

export default getConvidadosByUser