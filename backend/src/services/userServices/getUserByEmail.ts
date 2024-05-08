import { User } from "../../entities/User"
import { userRepository } from "../../repositories/userRepository"

const getUserByEmail = async (email: string): Promise<User | null> => {

    try {
        const user = await userRepository.findOne({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }

}

export default getUserByEmail