import Prompt from '@models/Prompt';
import { connect } from '@utils/db';

export const GET = async (_request: Request, { params } : any) => {
    try {
        await connect();
        // Tenta encontrar o Prompt para o ID enviado.
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) 
            return new Response('Prompt não encontrado', { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (err) {
        console.log(err);
        return new Response('Erro ao retornar prompt', { status: 500 });
    }
}

export const PATCH = async (request: Request, { params } : any) => {
    const { prompt, tag } = await request.json();
    try {
        await connect();
        // Tenta encontrar o Prompt para o ID enviado.
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response('Prompt não encontrado', { status: 404 });
        }
        // Atualiza prompt com os novos dados.
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response('Prompt atualizado com sucesso', { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('Erro ao atualizar prompt', { status: 500 });
    }
};

export const DELETE = async (_request: Request, { params } : any) => {
    try {
        await connect();
        // Tenta encontrar o Prompt para o ID enviado e o remove.
        await Prompt.findByIdAndRemove(params.id);
        return new Response('Prompt excluído com sucesso', { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response('Erro ao excluir prompt', { status: 500 });
    }
};
