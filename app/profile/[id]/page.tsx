'use client';

import { useState, useEffect } from 'react';
import { useParams  } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = () => {
    const params = useParams();
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
      const fetchPrompts = async () => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        const data = await response.json();
        setPrompts(data);
      }

      const fetchUser = async () => {
        const response = await fetch(`/api/users/${params.id}`);
        const data = await response.json();
        setUserData(data);
      }
  
      if (params.id) {
        fetchPrompts();
        fetchUser();
      } 
    }, []);

    const title = `Perfil do Usuário ${userData?.username}`;
    const description = `Bem-vindo à página do usuário ${userData?.username}`;

    return (
        <Profile name={title} description={description} data={prompts}/>
    );
}

export default UserProfile;
