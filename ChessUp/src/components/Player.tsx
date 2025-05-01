type PlayerProps = {
  image: string;
  elo: number;
  title: string;
  name: string;
};

export default function Player({ image, elo, title, name }: PlayerProps) {
  return (
    <div className="flex flex-col my-3">
      <div className="flex flex-row items-center space-x-3">
        <img
          src={image}
          className="w-10 rounded-md outline outline-1 outline-gray-400"
        />
        <div className="flex flex-row items-center">
          <div className="bg-red-900 text-white text-sm px-2 py-1 rounded mx-1">
            {title}
          </div>
          <div className="font-bold">{name}</div>
          <div className="text-xs text-gray-900 mx-1">({elo})</div>
        </div>
      </div>
    </div>
  );
}
