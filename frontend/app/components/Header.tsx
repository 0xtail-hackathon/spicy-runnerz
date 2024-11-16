import { jockeyOne } from "@/app/fonts";

interface HeaderProps {
  lines: string[];
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ lines, children }) => {
  return (
    <>
      <header
        className={`flex flex-col justify-end gap-2 min-h-60 left-0 w-full z-10 ${jockeyOne.className} align-end text-center text-6xl font-bold text-gray-800`}
      >
        {children}
        {lines.map((line, index) => (
          <h1 key={index}>{line}</h1>
        ))}
      </header>
    </>
  );
};

export default Header;
