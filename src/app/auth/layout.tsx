function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen mx-auto">
      <div className="border border-gray-500 rounded-md px-10 py-5 min-w-">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
