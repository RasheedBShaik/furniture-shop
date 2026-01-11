import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div>

    <div className="flex justify-evenly">
      <div>
        <h1 className="font-bold font-Montserrat text-xl md:text-2xl  lg:text-2xl">
          Furniro.
        </h1>
        <div className="pt-12.5 text-[#9f9f9f]">400 University Drive Suite 200 Coral <br />Gables,<br /> FL 33134 USA</div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="text-[#9f9f9f]">Links</div>
        
          <Link to="/">Home</Link>
          <Link to="shop">Shop</Link>
          <Link to="about">About</Link>
          <Link to="contact">Contact</Link>

      </div>
      <div className="hidden md:flex flex-col gap-8">
        <div className="text-[#9f9f9f]">Help</div>
        
          <Link to="">Payment Options</Link>
          <Link to="">Returns</Link>
          <Link to="">Privacy Policy</Link>
          

      </div>
    </div>
      <div className="pt-7 border-t-2 border-[#9f9f9f] mt-12">2025 furniro. All rights reverved</div>
    </div>
  );
};

export default Footer;
