import Image from "next/future/image";
import {
    SearchIcon,
    MenuIcon,
    ShoppingCartIcon,
    UserIcon,
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

function Header() {
  const { data: session } = useSession();
  const router = useRouter()
  const items = useSelector(selectItems)
  

  const [sideBar, setSideBar] = useState(false);

  const setBarState = () => {
    setSideBar(!sideBar);
  };


  return (
    <>
    <LoadingIndicator />
    <header>
      {/* Top nav */}
      <div className="flex items-center bg-[#232F3E] sm:bg-[#121921] p-1 flex-grow py-2">
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
        <div className="hidden sm:mt-0 sm:flex items-center h-12 rounded-md flex-grow cursor-pointer px-5">
            <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
            <SearchIcon className="h-12 p-4 bg-[#febd69] hover:bg-[#F3A847] rounded-r-md" />
        </div>

        {/* account & list & card */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {/* pc login */}
          {
            !session ? (
            <div onClick={() => signIn()}>
              <div className="hidden tablet:block link">
            <p>
              {session ? `Hello, ${session.user.name}` : 'Hello, sign in'}
              
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>

            {/* mobile login icon */}
            <div className="link z-40 tablet:hidden">
                  <p className="ml-10 mx-auto text-sm">Sign in &gt;</p>
                  <UserIcon className="h-8 ml-24 -mt-7" />
                </div>
        </div> ) : (
          <User_drop_down session={session} />
        )
        
          }
            
            <div className="hidden tablet:block link">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            
            
            
            <div className="relative link flex items-center" onClick={() => router.push('/checkout')}>

                <span className="absolute top-0 right-0 md:right-8 h-5 w-5 bg-[#f90] text-center rounded-full text-black font-bold">
                  {items.length}
                </span>

                <ShoppingCartIcon className="h-10" />
                <p className="hidden font-extrabold md:text-sm md:inline mt-2">Cart</p>
            </div>
        </div>
      </div>
      {/* mobile search */}
      <div className="bg-[#232F3E]">
      <div className="flex w-[95%] mx-auto items-center h-[44px] rounded-md flex-grow cursor-pointer sm:hidden">
            <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" placeholder="Search Amazon" />
            <SearchIcon className="h-[44px] p-2 bg-[#febd69] hover:bg-[#F3A847] rounded-r-md" />
        </div>
      </div>
      
      {/* bottom nav */}
      {/* <div className="mt-14 sm:mt-0 flex items-center space-x-8 p-2 pl-2 font-semibold md:text-lg text-sm bg-[#232F3E] text-white h-12 overflow-x-auto scrollbar-hide"> */}
      <div className="flex items-center space-x-8 p-2 pl-2 font-semibold md:text-lg text-sm bg-[#232F3E] text-white h-12 overflow-x-auto scrollbar-hide">
        <p onClick={setBarState} className="link hidden tablet:flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All</p>
          <p className="link">Today`s Deals</p>
          <p className="link">Customer Service</p>
          <p className="link">Registry</p>
          <p className="link">Gift Cards</p>
          <p className="link">Sell</p>
      </div>
    </header>
    </>
  );
}

export default Header;
