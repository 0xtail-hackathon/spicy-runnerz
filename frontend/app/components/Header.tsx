import { jockeyOne } from "@/app/fonts";

interface HeaderProps {
  lines: string[];
}

const Header: React.FC<HeaderProps> = ({ lines }) => {
  return (
    <>
      <header
        className={`flex flex-col justify-end gap-3 h-52 left-0 w-full z-10 ${jockeyOne.className} align-end text-center text-6xl font-bold text-gray-800`}
      >
        {lines.map((line, index) => (
          <h1 key={index}>{line}</h1>
        ))}
      </header>

      <div className="w-full h-52"></div>
    </>
  );
};

export default Header;
