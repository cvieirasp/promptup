import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="my-title text-center">Descubra & Compartilhe</h1>
        <h2 className="my-subtitle my-gradient-red text-center">Prompts alimentados por IA</h2>
        <p className="my-description text-center">
            O Promptup é uma ferramenta de prompt de IA de código aberto para o mundo moderno descobrir, criar e compartilhar prompts criativos.
        </p>

        <Feed />
    </section>
  );
}

export default Home;
