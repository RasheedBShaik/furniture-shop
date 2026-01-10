import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // NavLink gives us an 'isActive' boolean automatically
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `
    cursor-pointer transition-all duration-300 text-base
    ${isActive 
      ? 'font-semibold scale-110 text-[#B88E2F] decoration-2 hover:scale-120' 
      : 'font-normal text-black hover:scale-120'
    }`;

  return (
    <nav className="hidden md:flex items-center max-w-107.5 w-full justify-between">
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
      <NavLink to="/about" className={navLinkClass}>About</NavLink>
      <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
    </nav>
  );
};

export default Navbar;