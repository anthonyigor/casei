import axios from "axios"
import getSession from "./getSession"


const getConvidadosByUser = async() => {
    const session = await getSession()
    const userId = (session?.user as CustomUser).id
    const convidados = await axios.get(`http://localhost:5000/users/${userId}/convidados`)
    return convidados.data
}

type CustomUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
};

export default getConvidadosByUser