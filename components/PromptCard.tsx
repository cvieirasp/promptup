'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai'

interface PromptProps {
  data: Prompt,
  handleTagClick?: Function
  handleEdit?: React.MouseEventHandler<HTMLElement>
  handleDelete?: React.MouseEventHandler<HTMLElement>
}

const PromptCard = ({ data, handleTagClick, handleEdit, handleDelete }: PromptProps) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(data.prompt);
    navigator.clipboard.writeText(data.prompt);
    setTimeout(() => {
      setCopied('');
    }, 3000);
  }

  const handleViewProfile = () => {
    router.push(`/profile/${data.creator._id}`);
  }

  return (
    <div className="my-prompt-card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer" onClick={handleViewProfile}>
          <Image src={data.creator.image} alt='Image do Autor do Prompt' width={40} height={40} className='rounded-full object-contain' />
          
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {data.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {data.creator.email}
            </p>
          </div>
        </div>

        <div className="my-btn-copy" onClick={handleCopy}>
          {copied === data.prompt ? <AiOutlineCheck color='red' size={12} /> : <AiOutlineCopy color='red' size={12} />}
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm-text-gray-700">
        {data.prompt}
      </p>
      <p className="font-inter text-sm my-gradient-blue cursor-pointer" onClick={() => handleTagClick && handleTagClick(data.tag)}>
        {data.tag}
      </p>

      {session?.user.id === data.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className="font-inter text-sm my-gradient-green cursor-pointer" onClick={handleEdit}>
            Editar
          </p>
          <p className="font-inter text-sm my-gradient-orange cursor-pointer" onClick={handleDelete}>
            Excluir
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
