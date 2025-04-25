import React, { useContext, useEffect } from 'react'
import { IoSearch } from 'react-icons/io5';
import { LuShoppingBag } from 'react-icons/lu';
import { MdFastfood } from "react-icons/md";
import { dataContext } from '../context/UserContext';
import { food_items } from '../food';
import { useSelector } from 'react-redux';

const Navbar = () => {
    let { input, setInput, setCat, setShowCart } = useContext(dataContext)


    useEffect(() => {

        setInput(input.toLowerCase())
        let newList = food_items.filter((item) => item.food_name.includes(input) || item.food_name.toLowerCase().includes(input))

        setCat(newList)
    }, [input, setCat, setInput])
   let items = useSelector(state => state.cart)

    return (
        <>
            <div className="w-full  flex items-center justify-between px-5 md:px-8  h-[100px] ">
                <div className="logo left-nav bg-white rounded-md md:h-16 h-10 md:w-16 w-10 h-10 shadow-lg flex justify-center items-center">
                    <MdFastfood className=' md:w-8 md:h-8 w-4 h-4  text-green-500 ' />
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="center-nav md:w-[70%] sm:w-3/5 w-2/5 flex shadow-lg items-center justify-start gap-5 px-5 rounded-md md:h-16 h-10 bg-white">
                    <IoSearch className='text-green-500 hidden sm:block md:block w-5 h-5' />
                    <input onChange={(e) => setInput(e.target.value)} value={input} className='w-full h-full rounded-none outline-none text-green-800 lg:text-xl md:text-md text-sm' type="text" placeholder='search your dish...' />
                </form>
                <div onClick={() => setShowCart(true)} className=" relative left-nav cursor-pointer hover:bg-green-100 hover:translate-y-0.5  bg-white rounded-md md:h-16 h-10 md:w-16 w-10 h-10 shadow-lg flex justify-center items-center">

                    <LuShoppingBag className='  md:w-8 md:h-8 w-4 h-4   text-green-500 ' />
                    <div className="absolute md:top-0 md:right-2 -top-1 right-0.5">
                        <span className={`${items.length>0?"text-red-500":"text-green-500"}  font-bold text-xs md:text-[18px]`}>{items.length}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
