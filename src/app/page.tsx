import Navbar from "./components/Navbar";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Navbar />
      <div>Welcome to Aeon App</div>
    </div>
  );
}
