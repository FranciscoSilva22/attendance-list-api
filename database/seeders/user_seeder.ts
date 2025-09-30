import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

interface UserData {
  name: string,
  username: string,
  city: string,
  password: string,
  is_admin?: boolean,
}

const users: UserData[] = [
  {
    name: "Administrador",
    username: "adm_sg",
    city: "Cosmópolis",
    password: "administrador_santagertrudes",
    is_admin: true,
  },
  {
    name: "Paróquia Nossa Senhora das Dores",
    username: "pnsd",
    city: "Arthur Nogueira",
    password: "senhoradasdores"
  },
  {
    name: "Paróquia Santa Rita de Cássia",
    username: "psrc",
    city: "Arthur Nogueira",
    password: "santarita"
  },
  {
    name: "Paróquia Nossa Senhora Aparecida",
    username: "pnsac",
    city: "Conchal",
    password: "aparecidaconchal"
  },
  {
    name: "Paróquia Sagrado Coração de Jesus",
    username: "pscjc",
    city: "Conchal",
    password: "sagradoconchal"
  },
  {
    name: "Paróquia São José Operário",
    username: "psjo",
    city: "Conchal",
    password: "joseoperario"
  },
  {
    name: "Paróquia Nossa Senhora Aparecida",
    username: "pnsco",
    city: "Cosmópolis",
    password: "aparecidacosmopolis"
  },
  {
    name: "Paróquia Santa Gertrudes",
    username: "psg",
    city: "Cosmópolis",
    password: "santagertrudes"
  },
  {
    name: "Paróquia São Benedito",
    username: "psb",
    city: "Cosmópolis",
    password: "saobenedito"
  },
  {
    name: "Paróquia São Pedro",
    username: "psp",
    city: "Engenheiro Coelho",
    password: "saopedro"
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const user of users) {
      try {
        const u = await User.findBy('username', user.username);

        if (!u) {
          await User.create({
            fullName: user.name,
            username: user.username,
            password: user.password,
            city: user.city,
            is_admin: user.is_admin
          });
        }
      } catch (error) {
        console.log('Erro no seeder:', error);
      }
    }
  }
}