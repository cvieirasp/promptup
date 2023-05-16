import Prompt from '@models/Prompt';
import { connect } from '@utils/db';

export const POST = async (request: Request) => {
    const { userId, prompt, tag } = await request.json();
    try {
        await connect();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (err) {
        console.log(err);
        return new Response('Erro ao criar prompt', { status: 500 });
    }
}
