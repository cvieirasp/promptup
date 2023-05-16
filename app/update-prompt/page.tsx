'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

interface PromptUpdate {
    prompt: string,
    tag: string
};

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<PromptUpdate>({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId)
            return alert('ID do Prompt não encontrado');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form type="Atualizar" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt}></Form>
    );
}

export default EditPrompt;
