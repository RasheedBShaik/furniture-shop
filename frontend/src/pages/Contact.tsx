import { Link } from "react-router-dom";
import Banner from "../components/Banner";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto my-6 ">
      {/* Banner / Header */}
      <div className="bg-[url(images/shop-hero.png)] bg-cover bg-center flex items-center justify-center flex-col h-80 py-12 mb-10 text-center rounded-sm">
        <h1 className="text-4xl font-bold text-gray-800 not-italic">Contact</h1>
        <p className=" mt-2 not-italic">
          <Link to="/" className="hover:text-[#B88E2F] font-semibold text-lg">
            Home
          </Link>{" "}
          &gt;{" "}
          <span>
            <Link to="/contact" className="text-gray-800">
              Contact
            </Link>
          </span>
        </p>
      </div>
      <div className="not-italic py-5">
        <div className="flex flex-col items-center justify-center">
          <div className="text-[36px] font-bold">Get In Touch With Us</div>
          <div className="text-[#9f9f9f] text-center max-w-161">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </div>
        </div>
      </div>

<div className="flex flex-col md:flex-row w-full justify-between gap-12 mt-16 px-4 md:px-12 not-italic">

  {/* --- LEFT SIDE: Contact Info --- */}
  <div className="flex flex-col gap-10 w-full md:w-1/3">
    
    {/* Address */}
    <div className="flex gap-4 group">
      <div className="mt-1">
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 0C8.08369 0.0033903 5.28779 1.1465 3.22564 3.17859C1.16348 5.21067 0.00345217 7.96579 1.17029e-05 10.8396C-0.00348119 13.1881 0.774992 15.4728 2.21601 17.3433C2.21601 17.3433 2.51601 17.7326 2.56501 17.7887L11 27.5917L19.439 17.7838C19.483 17.7316 19.784 17.3433 19.784 17.3433L19.785 17.3404C21.2253 15.4707 22.0034 13.187 22 10.8396C21.9966 7.96579 20.8365 5.21067 18.7744 3.17859C16.7122 1.1465 13.9163 0.0033903 11 0ZM11 14.7813C10.2089 14.7813 9.43553 14.5501 8.77773 14.117C8.11993 13.6838 7.60724 13.0682 7.30449 12.348C7.00174 11.6277 6.92253 10.8352 7.07687 10.0706C7.23121 9.30599 7.61217 8.60366 8.17158 8.0524C8.73099 7.50115 9.44373 7.12574 10.2197 6.97365C10.9956 6.82156 11.7998 6.89962 12.5307 7.19796C13.2616 7.49629 13.8864 8.00151 14.3259 8.64971C14.7654 9.29792 15 10.06 15 10.8396C14.9987 11.8846 14.5768 12.8864 13.827 13.6253C13.0771 14.3642 12.0605 14.7799 11 14.7813Z" fill="black" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-800">Address</h1>
        <p className="text-gray-600">236 5th SE Avenue, <br />New York NY10000, <br /> United States</p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex gap-4">
      <div className="mt-1">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.6091 21.425L20.5279 16.805C20.2877 16.5867 19.972 16.4703 19.6476 16.4803C19.3232 16.4903 19.0154 16.626 18.7891 16.8587L15.7979 19.935C15.0779 19.7975 13.6304 19.3462 12.1404 17.86C10.6504 16.3687 10.1991 14.9175 10.0654 14.2025L13.1391 11.21C13.3721 10.9839 13.508 10.676 13.5181 10.3515C13.5281 10.027 13.4115 9.71129 13.1929 9.47124L8.5741 4.39124C8.35541 4.15044 8.05145 4.00437 7.72679 3.98407C7.40214 3.96376 7.08235 4.07082 6.83535 4.28249L4.12285 6.60874C3.90674 6.82564 3.77775 7.11431 3.76035 7.41999C3.7416 7.73249 3.3841 15.135 9.1241 20.8775C14.1316 25.8837 20.4041 26.25 22.1316 26.25C22.3841 26.25 22.5391 26.2425 22.5804 26.24C22.886 26.2229 23.1745 26.0933 23.3904 25.8762L25.7154 23.1625C25.9279 22.9163 26.0357 22.5968 26.0159 22.2721C25.996 21.9475 25.85 21.6435 25.6091 21.425Z" fill="black" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-800">Phone</h1>
        <p className="text-gray-600">Mobile: +(84) 546-6789 <br /> Hotline: +(84) 456-6789</p>
      </div>
    </div>

    {/* Working Time */}
    <div className="flex gap-4">
      <div className="mt-1">
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 11.5C23 14.55 21.7884 17.4751 19.6317 19.6317C17.4751 21.7884 14.55 23 11.5 23C8.45001 23 5.52494 21.7884 3.36827 19.6317C1.2116 17.4751 0 14.55 0 11.5C0 8.45001 1.2116 5.52494 3.36827 3.36827C5.52494 1.2116 8.45001 0 11.5 0C14.55 0 17.4751 1.2116 19.6317 3.36827C21.7884 5.52494 23 8.45001 23 11.5ZM11.5 5.03125C11.5 4.84063 11.4243 4.65781 11.2895 4.52302C11.1547 4.38823 10.9719 4.3125 10.7812 4.3125C10.5906 4.3125 10.4078 4.38823 10.273 4.52302C10.1382 4.65781 10.0625 4.84063 10.0625 5.03125V12.9375C10.0625 13.0642 10.0961 13.1886 10.1597 13.2982C10.2233 13.4077 10.3147 13.4985 10.4247 13.5614L15.456 16.4364C15.6211 16.5256 15.8146 16.5467 15.995 16.4952C16.1755 16.4437 16.3287 16.3236 16.4218 16.1607C16.5149 15.9977 16.5406 15.8048 16.4933 15.6232C16.4461 15.4415 16.3297 15.2856 16.169 15.1886L11.5 12.5206V5.03125Z" fill="black" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-800">Working Time</h1>
        <p className="text-gray-600">Monday-Friday: 9:00 - 22:00 <br /> Saturday-Sunday: 9:00 - 21:00</p>
      </div>
    </div>
  </div>

  {/* --- RIGHT SIDE: Form --- */}
  <div className="w-full md:w-1/2">
    <form className="flex flex-col gap-6">
      
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-800">Your name</label>
        <input
          className="border border-gray-300 h-14 px-4 w-full rounded-lg focus:outline-[#B88E2F] focus:ring-1 focus:ring-[#B88E2F]"
          placeholder="Abc"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-800">Email address</label>
        <input
          className="border border-gray-300 h-14 px-4 w-full rounded-lg focus:outline-[#B88E2F] focus:ring-1 focus:ring-[#B88E2F]"
          placeholder="Abc@def.com"
          type="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-800">Subject</label>
        <input
          className="border border-gray-300 h-14 px-4 w-full rounded-lg focus:outline-[#B88E2F] focus:ring-1 focus:ring-[#B88E2F]"
          placeholder="This is optional"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-800">Message</label>
        <textarea
          className="border border-gray-300 p-4 w-full rounded-lg h-32 focus:outline-[#B88E2F] focus:ring-1 focus:ring-[#B88E2F] resize-none"
          placeholder="Hi! I’d like to ask about..."
        />
      </div>

      <button
        className="bg-[#B88E2F] text-white w-full md:max-w-60 py-4 rounded-md font-bold text-lg hover:bg-[#9e7a28] transition-all shadow-md active:scale-95 mt-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</div>
      <Banner />
    </div>
  );
};

export default Contact;
