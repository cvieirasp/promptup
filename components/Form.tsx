import Link from "next/link";

interface FormProps {
  type: string,
  post: any,
  setPost: any,
  submitting: boolean,
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}

const Form = ({ type, post, setPost, submitting, handleSubmit } : FormProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="my-head-text text-left">
        <span className="my-gradient-blue">{type} Prompt</span>
      </h1>
      <p className="my-description text-left max-w-md">
        Crie e compartilhe prompts incríveis com o mundo, e deixe que sua imaginação corra solta com qualquer plataforma baseada em IA.
      </p>

      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 my-glassmorphism" onSubmit={handleSubmit}>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Seu Prompt de IA</span>
          <textarea className="my-form-textarea" placeholder="Insira o seu prompt aqui..." required value={post.prompt} onChange={
            (e) => setPost({
              ...post, prompt: e.target.value
            })
          }></textarea>
        </label>
        
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `} <span className="font-normal">(#development #idea #project)</span>
          </span>
          <input className="my-form-input" placeholder="#tag" required value={post.tag} onChange={
            (e) => setPost({
              ...post, tag: e.target.value
            })
          } />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancelar
          </Link>
          <button type="submit" disabled={submitting} className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? 'Criando...' : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
