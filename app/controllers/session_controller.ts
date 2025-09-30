import User from '#models/user';
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
    async post({ request, response }: HttpContext) {
        try {
            const user = await User.findBy("username", request.input("username"));

            if (!user)
                return response.status(404).json({ message: "User not found!" });

            const passwordVerified = await hash.verify(user.password, request.input("password"));

            if (!passwordVerified)
                return response.status(401).json({ message: 'Invalid credentials' })

            const token = await User.accessTokens.create(user);

            return response.status(200).json({
                type: 'bearer',
                value: token.value!.release(),
                user
            });
        } catch (error) {
            return response.status(500).json({ error });
        }
    }
}