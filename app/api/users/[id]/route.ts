import User from '@models/User';
import { connect } from '@utils/db';

export const GET = async (_request: Request, { params } : any) => {
    try {
        await connect();
        // Tenta encontrar os Prompts para o ID de usuário enviado.
        const user = await User.findById(params.id);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('Erro ao retornar prompts por usuário', { status: 500 });
    }
}
