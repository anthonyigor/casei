import axios from "axios"
import getSession from "./getSession"


const getConvidadosByUser = async() => {
    const session = await getSession()
    const userId = (session?.user as CustomUser).id
    const token = (session?.user as CustomUser).token
    const convidados = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return convidados.data
}

type CustomUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    token?: string;
};

export default getConvidadosByUser
