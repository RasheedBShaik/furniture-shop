import { NavLink } from 'react-router-dom';

// 1. Define the Interface for props
interface NavbarProps {
  isMobile?: boolean;
}

// 2. Use single curly braces for destructuring
const Navbar = ({ isMobile }: NavbarProps) => {
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `
    cursor-pointer transition-all duration-300 text-xs sm:text-base
    ${isActive 
      ? 'font-semibold scale-110 text-[#B88E2F] decoration-2 hover:scale-120' 
      : 'font-normal text-black hover:scale-120'
    }`;

  return (
    <nav className={`flex items-center w-full justify-evenly md:justify-between ${isMobile ? 'flex-col gap-4' : 'min-w-80 max-w-107.5'}`}>
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
      <NavLink to="/about" className={navLinkClass}>About</NavLink>
      <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
    </nav>
  );
};

export default Navbar;