import Presence from '#models/presence';
import type { HttpContext } from '@adonisjs/core/http'

export default class PresencesController {
    async all({ response }: HttpContext) {
        try {
            const presences = await Presence.query().preload("church");

            const grouped: Record<string, { total: number, list: Presence[] }> = {};

            let total = 0;
            presences.map(presence => {
                const city = presence.church.city
                if(!grouped[city]) {
                    grouped[city] = { total: 0, list: [] };
                }

                grouped[city].total += 1;
                total += 1;
                grouped[city].list.push(presence);
            })


            return response.status(200).json({presences: grouped, total});
        } catch (error) {
            console.log(error)
            return response.status(500).json(error);
        }
    }

    async index({ response, auth }: HttpContext) {
        try {
            const user_id = auth.user?.id;

            const presences = await Presence.findManyBy("church_id", user_id);

            return response.status(200).json({presences});
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async post({ request, response, auth }: HttpContext) {
        try {
            const name = request.input("name");
            const document = request.input("document");
            const user_id = auth.user?.id;

            const presence = await Presence.create({
                name, document, church_id: user_id
            });

            return response.status(201).json({presence});
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async update({ request, params, response, auth }: HttpContext) {
        try {
            const { presence_id } = params;
            const name = request.input("name");
            const document = request.input("document");
            const user_id = auth.user?.id;

            const presence = await Presence.query()
                .where("id", presence_id)
                .where("church_id", user_id ?? 0)
                .first();

            if(!presence) 
                return response.status(404).json({ message: "Register not found!" });

            presence.name = name;
            presence.document = document;

            const updatedPresence = await presence.save();
            return response.status(201).json({presence: updatedPresence});
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async delete({ response, params, auth }: HttpContext) {
        try {
            const { presence_id } = params;
            const user_id = auth.user?.id;

            const presence = await Presence.query()
                .where("id", presence_id)
                .where("church_id", user_id ?? 0)
                .first();

            if(!presence)
                return response.status(404).json({ message: "Register not found!" });

            await presence.delete();
            return response.status(200).json({ message: "Register deleted!", id: presence_id });
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}