import Prompt from '@models/Prompt';
import { connect } from '@utils/db';

export const GET = async (_request: Request) => {
    try {
        await connect();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 }); 
    } catch (err) {
        console.log(err);
        return new Response('Erro ao retornar prompts', { status: 500 });
    }
}
