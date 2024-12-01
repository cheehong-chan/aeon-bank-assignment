import Button from "@/components/Button";

type VerifyFormProps = {
  secureWord: string;
  onSubmit: () => void;
};

export default function VerifyForm({ secureWord, onSubmit }: VerifyFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mb-2">
        <h1 className="font-bold text-lg">Your Secure Word:</h1>
        <pre className="text-green-400">{secureWord}</pre>
      </div>
      <Button loading={false} disabled={false} type="submit" label="Next" />
    </form>
  );
}
