import Image from "next/future/image";
import {
    SearchIcon,
    MenuIcon,
    ShoppingCartIcon,
    UserIcon,
    ChevronDownIcon,
} from "@heroicons/react/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import User_drop_down from './Dropdown';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { selectItems } from './../slice/cartSlice';
import { useState } from 'react';
import SideNavigation from './SideNavigation';
import TintBackground from './TintBackground';
import Link from 'next/link';
import LoadingIndicator from './LoadingIndicator';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const translations = {
  English: {
    signIn: 'Hello, sign in',
    accountAndLists: 'Account & Lists',
    returns: 'Returns',
    orders: '& Orders',
    cart: 'Cart',
    searchPlaceholder: 'Search Mustaqbal',
    all: 'all',
    tdeal: 'Today`s Deals',
    cs: 'Customer Service',
    // ... other translations ...
  },
  Arabic: {
    signIn: 'مرحبا، تسجيل الدخول',
    accountAndLists: 'الحساب والقوائم',
    returns: 'المرتجعات',
    orders: 'والطلبات',
    cart: 'العربة',
    searchPlaceholder: 'ابحث في المستقبل',
    all: 'الكل',
    tdeal: 'عروض اليوم',
    cs: 'مركز الخدمة'
    // ... other translations ...
  }
};

function Header() {
  const { data: session } = useSession();
  const router = useRouter()
  const items = useSelector(selectItems)
  const { changeLanguage } = useContext(LanguageContext);

  const { language } = useContext(LanguageContext);

  const [sideBar, setSideBar] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);


  const setBarState = () => {
    setSideBar(!sideBar);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const closeLanguageDropdown = () => {
    setShowLanguageDropdown(false);
  };

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    closeLanguageDropdown();
  };
  const text = translations[language];
  return (
    <>
    <LoadingIndicator />

    <header onMouseLeave={closeLanguageDropdown}>
      {/* Top nav */}
      <div className="flex items-center bg-[#232F3E] sm:bg-[#121921] flex-grow py-2">
      <p  className="absolute -mt-2 ml-2 tablet:hidden items-center text-white">
          <MenuIcon onClick={setBarState} className="h-8" />
          </p>
          <div className="z-50">
          <SideNavigation act={sideBar} button={setBarState} session={session} />
      
      <TintBackground act={sideBar} button={setBarState} />
          </div>
        <div className=" ml-2 tablet:link mt-1 flex items-center flex-grow sm:flex-grow-0">
        <Link href='/'>
          <Image
            src="/Images/amazon.webp"
            className="cursor-pointer ml-10"
            height={24}
            width={80}
            alt="amazon"
            
          />
          </Link>
        </div>

        {/* pc search bar */}
        {/* <div className="flex absolute mt-28 w-[90%] right-0 left-0 m-auto sm:relative sm:mt-0 sm:flex items-center h-12 rounded-md flex-grow cursor-pointer"> */}
        <div className="hidden sm:mt-0 sm:flex items-center h-10 rounded-md flex-grow cursor-pointer px-5">
            <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" placeholder={text.searchPlaceholder} />
            <SearchIcon className="h-10 p-2 w-12 bg-[#febd69] hover:bg-[#F3A847] rounded-r-md" />
        </div>
         {/* Language Dropdown */}
         <div className="relative ml-4">
          <button 
            className="flex items-center text-white space-x-1" 
            onMouseEnter={toggleLanguageDropdown}
          >
            <span>🌐</span>
            <p className="font-extrabold md:text-sm">{language === 'English' ? "EN" : "AR"}</p>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          {showLanguageDropdown && (
            <div 
              className="absolute top-full right-0 bg-white shadow-md mt-2 rounded-md z-50 w-40"
              onMouseLeave={closeLanguageDropdown}
            >
              <p className="p-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={() => handleLanguageChange('English')}>
                🇺🇸 <span className="ml-2">English</span>
              </p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={() => handleLanguageChange('Arabic')}>
              🇮🇶 <span className="ml-2">العربية</span>
              </p>
            </div>
          )}
        </div>
        {/* account & list & card */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {/* pc login */}
          {
            !session ? (
            <div onClick={() => signIn()}>
              <div className="hidden tablet:block link">
            <p>
            {session ? `Hello, ${session.user.name}` : text.signIn}
              
            </p>
            <p className="font-extrabold md:text-sm">{text.accountAndLists}</p>
            </div>

            {/* mobile login icon */}
            <div className="link z-40 tablet:hidden">
                  {/* <p className="ml-10 mx-auto text-sm">{text.signIn} &gt;</p> */}
                  <UserIcon className="h-6 md:h-8 ml-5 mt-0" />
                </div>
        </div> ) : (
          <User_drop_down session={session} />
        )
        
          }
            
            <div className="hidden tablet:block link">
                <p>{text.returns}</p>
                <p className="font-extrabold md:text-sm">& {text.orders}</p>
            </div>
            
            
            
            <div className="relative link flex items-center" onClick={() => router.push('/checkout')}>

                <span className="absolute top-0 right-0 md:right-8 h-5 w-5 bg-[#f90] text-center rounded-full text-black font-bold">
                  {items.length}
                </span>

                <ShoppingCartIcon className="h-6 md:h-10" />
                <p className="hidden font-extrabold md:text-sm md:inline mt-2">{text.cart}</p>
            </div>
        </div>

  
      </div>
      {/* mobile search */}
      <div className="bg-[#232F3E]">
      <div className="flex w-[95%] mx-auto items-center h-[44px] rounded-md flex-grow cursor-pointer sm:hidden">
            <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" placeholder={text.searchPlaceholder} />
            <SearchIcon className="h-[44px] p-2 bg-[#febd69] hover:bg-[#F3A847] rounded-r-md" />
        </div>
      </div>
      
      {/* bottom nav */}
      {/* <div className="mt-14 sm:mt-0 flex items-center space-x-8 p-2 pl-2 font-semibold md:text-lg text-sm bg-[#232F3E] text-white h-12 overflow-x-auto scrollbar-hide"> */}
      <div className="flex items-center space-x-8 p-2 pl-2 font-semibold md:text-lg text-sm bg-[#232F3E] text-white h-12 overflow-x-auto scrollbar-hide">
        <p onClick={setBarState} className="link hidden tablet:flex items-center">
          <MenuIcon className="h-6 mr-1" />
          {text.all}</p>
          <p className="link">{text.tdeal}</p>
          <p className="link">{text.cs}</p>
          {/* <p className="link">Registry</p> */}
          {/* <p className="link">Gift Cards</p>
          <p className="link">Sell</p> */}
      </div> 
    </header>
    </> 
  );
}

export default Header;
 