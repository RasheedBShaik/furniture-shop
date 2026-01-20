import { Link } from "react-router-dom"
import Banner from "../components/Banner"

const About = () => {
  return (
    <div className="max-w-7xl mx-auto my-6 px-4 md:px-0">
      {/* Banner / Header */}
      <div className="bg-[url(/images/shop-hero.png)] bg-cover bg-center flex items-center justify-center flex-col h-80 py-12 mb-10 text-center rounded-sm">
        <img src="/icons/logo.png" alt="Logo" className="mb-2" />
        <h1 className="text-4xl font-bold text-gray-800 not-italic">About</h1>
        <p className="mt-2 not-italic">
          <Link to="/" className="hover:text-[#B88E2F] text-lg font-semibold">Home</Link> &gt;{" "}
          <span>
            <Link to="/about" className="text-gray-800">About</Link>
          </span>
        </p>
      </div>

      {/* --- PREMIUM CONTENT SECTIONS --- */}
      <div className="space-y-24 mb-20">
        
        {/* Section 1: Brand Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Craft, Your Comfort</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Since our inception, we have been dedicated to the art of fine furniture making. 
              We believe that every piece of furniture should tell a story of quality, 
              durability, and aesthetic harmony.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our designers travel the globe to find the finest materials—from sustainably 
              sourced hardwoods to premium textiles—ensuring that your home feels as good 
              as it looks.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000" 
              alt="Quality Interior" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Section 2: Values Grid */}
        <div className="bg-[#FCF8F3] py-16 px-8 rounded-xl">
  <div className="text-center max-w-2xl mx-auto mb-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Furniro?</h2>
    <p className="text-gray-500">We stand by our commitment to excellence in every detail of our process.</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Feature 01 - Modern Design */}
    <div className="text-center space-y-4 group">
      <div className="flex justify-center">
        <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-[#B88E2F] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B88E2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
            <path d="M12 3v18M3 12h18M3 6l18 12M3 18L21 6" opacity=".2"/>
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 9h6v6H9z" />
          </svg>
        </div>
      </div>
      <h3 className="font-bold text-lg">Modern Design</h3>
      <p className="text-sm text-gray-600 px-4">Sleek, contemporary silhouettes that elevate any modern living space.</p>
    </div>

    {/* Feature 02 - Sustainable Wood */}
    <div className="text-center space-y-4 group">
      <div className="flex justify-center">
        <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-[#B88E2F] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B88E2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
            <path d="M12 22v-7l-2-2m4 2l-2 2" />
            <path d="M12 10g 4-5-4-5-4 5 4 5z" />
            <path d="M12 10V2" />
            <path d="M7 10c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z" />
          </svg>
        </div>
      </div>
      <h3 className="font-bold text-lg">Sustainable Wood</h3>
      <p className="text-sm text-gray-600 px-4">All our timber is sourced from FSC-certified forests to ensure planet safety.</p>
    </div>

    {/* Feature 03 - Premium Finish */}
    <div className="text-center space-y-4 group">
      <div className="flex justify-center">
        <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-[#B88E2F] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B88E2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
            <path d="M20 7h-9m3 4h-3m6 4h-6m9 4h-9" />
            <path d="M12 21.21c-3.37 0-6.1-2.73-6.1-6.1s2.73-6.1 6.1-6.1c1.25 0 2.41.38 3.38 1.03" />
            <path d="M21 7v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2z" />
          </svg>
        </div>
      </div>
      <h3 className="font-bold text-lg">Premium Finish</h3>
      <p className="text-sm text-gray-600 px-4">Triple-layered finishing techniques for furniture that lasts a lifetime.</p>
    </div>
  </div>
</div>

        {/* Section 3: Artisan Focus */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-[#B88E2F] font-bold uppercase tracking-widest text-sm">The Artisan Touch</span>
          <h2 className="text-3xl font-bold text-gray-800">Made by Hands, Not Just Machines</h2>
          <p className="text-gray-600 leading-relaxed">
            While we embrace technology for precision, the soul of our furniture lies in the hand-finishing 
            done by our master artisans. From hand-sanded edges to custom-stitched upholstery, 
            the human touch makes the difference between a house and a home.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/shop" className="bg-[#B88E2F] text-white px-10 py-3 font-semibold hover:bg-[#967328] transition-all">
              Shop Collection
            </Link>
          </div>
        </div>

      </div>

      <Banner/>
    </div>
  )
}


export default About
