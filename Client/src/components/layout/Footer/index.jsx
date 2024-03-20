import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#0295db] shadow mt-10 py-5">
      <div className="w-full mx-auto p-4 md:py-3">
        <div className="text-center">
          <ul className="w-full mx-auto flex flex-wrap items-center justify-center mb-4 text-sm md:text-base lg:text-lg font-medium text-white sm:mb-0 gap-4">
            <li>
              <Link to='/' className="hover:underline font-bold transition-all">Home</Link>
            </li>
            <li>
              <Link to='/contact' className="hover:underline font-bold transition-all">Contact Us</Link>
            </li>
          </ul>
        </div>
        <hr className="my-1 border-gray-200 sm:mx-auto  lg:my-1"  />
        <p className="w-full mx-auto text-sm text-white text-center mt-4 pt-2">&copy; {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Bac Mart</a> | All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
