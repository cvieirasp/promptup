'use client';

import React, { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

interface PromptProps {
  data: Prompt[],
  handleTagClick: Function
}

const PromptCardList = ({ data, handleTagClick }: PromptProps) => {
  return (
    <div className="mt-16 my-prompt-layout">
      {data.map((prompt) => (
        <PromptCard key={prompt._id} data={prompt} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<string | number | NodeJS.Timeout | undefined>();
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPrompts(data);
      setFilteredPrompts(data);
    }

    fetchPrompts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPrompts = prompts.filter((v) => {
          return (
            v.prompt.match(e.target.value) ||
            v.tag.match(e.target.value) ||
            v.creator.username.match(e.target.value)
          )
        })
        setFilteredPrompts(filteredPrompts);
      }, 500)
    );
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const filteredPrompts = prompts.filter((v) => {
      return v.tag.match(tagName);
    });

    setFilteredPrompts(filteredPrompts);
  }

  return (
    <section className="my-feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Procure por uma tag ou usuário" required className="my-input-search peer"
          value={searchText} onChange={handleSearchChange} />
      </form>

      <PromptCardList data={filteredPrompts} handleTagClick={handleTagClick} />
    </section>
  );
}

export default Feed;
