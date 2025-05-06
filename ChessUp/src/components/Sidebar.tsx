type SidebarProps = {
  history: string[];
};

export default function Sidebar({ history }: SidebarProps) {
  return (
    <div className="bg-[#0d0d0d] rounded-md w-80 flex flex-col h-full">
      <div className="bg-[#1e1e1e] rounded-t-md">
        <div className="font-bold p-4 text-center text-base">
          Play Magnus Carlsen
        </div>
      </div>

      {/* Scrollable game history section */}
      <div className="p-2 overflow-y-auto flex-grow text-white text-sm leading-tight">
        {history.length === 0 ? (
          <div className="text-gray-400">Game History diri dapita</div>
        ) : (
          <div className="grid grid-cols-2 gap-x-2">
            {history.map((move, index) => (
              <div key={index}>
                {index % 2 === 0 ? (
                  <span className="font-medium">
                    {Math.floor(index / 2) + 1}. {move}
                  </span>
                ) : (
                  <span>{move}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
