import Prompt from '@models/Prompt';
import { connect } from '@utils/db';

export const GET = async (_request: Request, { params } : any) => {
    try {
        await connect();
        // Tenta encontrar os Prompts para o ID de usuário enviado.
        const prompts = await Prompt.find({ creator: params.id }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('Erro ao retornar prompts por usuário', { status: 500 });
    }
}
