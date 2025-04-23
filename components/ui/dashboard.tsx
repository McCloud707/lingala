type DashboardProps = {
  title: string;
};

export default function Dashboard({ title }: DashboardProps) {
  return (
    <div className="grid pl-12 pt-2 grid-cols-1 grid-rows-[1fr_9fr] w-full">
      <div className="w-full grid grid-cols-2 grid-rows-1">
        <h2 className="text-2xl font-medium">{title}</h2>
      </div>

      <div className="grid grid-cols-1 grids-rows-2">
        <h2>Recommended</h2>
        <h2>Library</h2>
      </div>
    </div>
  );
}
