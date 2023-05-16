import PromptCard from "./PromptCard";

interface ProfileProps {
  name: string,
  description: string,
  data: Prompt[],
  handleEdit?: Function
  handleDelete?: Function
}

const Profile = ({ name, description, data, handleEdit, handleDelete }: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="my-head-text text-left">
        <span className="my-gradient-blue">{name}</span>
      </h1>
      <p className="my-description text-left">{description}</p>

      <div className="mt-10 my-prompt-layout">
        {data.map((prompt) => (
          <PromptCard key={prompt._id} data={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
