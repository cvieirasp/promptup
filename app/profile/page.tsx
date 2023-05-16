'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [prompts, setPrompts] = useState<Prompt[]>([]);

    useEffect(() => {
        const fetchPrompts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPrompts(data);
        }
    
        if (session?.user.id) fetchPrompts();
      }, []);

    const handleEdit = (prompt: Prompt) => {
        router.push(`/update-prompt?id=${prompt._id}`)
    }

    const handleDelete = async (prompt: Prompt) => {
        const hasConfirmed = confirm('Deseja excluir o prompt?');

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${prompt._id}`, { method: 'DELETE' });
                const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);
                setPrompts(filteredPrompts);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Profile name="Meu Perfil" description="Bem-vindo à página personalizada do seu perfil" data={prompts}
            handleEdit={handleEdit} handleDelete={handleDelete} />
    );
}

export default MyProfile;
