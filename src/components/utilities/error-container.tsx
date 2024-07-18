export interface ErrorContainerProps {
  children: React.ReactNode;
}

export default function ErrorContainer({ children }: ErrorContainerProps) {
  return (
    <div className="flex items-center justify-center h-[calc(50vh-4rem)] text-red-500">
      <div className="text-center">
        <h2>Something went wrong!</h2>
        {children}
      </div>
    </div>
  );
}
