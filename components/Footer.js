// components/Footer.js

const Footer = () => {
    return (
        <footer className="bg-[#232F3E] text-white text-center text-xs p-3 bottom-0 w-full border-t">
            <p>&copy; {new Date().getFullYear()} Spc. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
