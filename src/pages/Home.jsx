import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Categories from '../Category'
import { food_items } from '../food'
import { PiLeaf } from "react-icons/pi";
import { GiChickenOven } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

import { dataContext } from '../context/UserContext';
import CartCards from '../components/CartCards';
import { useDispatch, useSelector } from 'react-redux';
import { AddItem, RemoveAll } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch()

    const OrderedNotify = () => toast.success("order placed...");
    let { cat, setCat, input, showCart, setShowCart } = useContext(dataContext);
    useEffect(() => {
        input.replace(/^\s+/, "")

    }, [input])
    const FilterFun = (category) => {
        if (category == 'All') {
            setCat(food_items)
        } else {
            setCat(food_items.filter((data) => data.food_category == category))

        }
    }
    let CartedItems = useSelector(state => state.cart)
    let subtotal = CartedItems.reduce((total, item) => total + item.price * item.qty, 0)
    let deliveryChrg = 20;
    let taxes = parseFloat((subtotal * 0.005).toFixed(2));
    let NetTotal = Math.round(subtotal + deliveryChrg + taxes); // Rounded net total if needed


    const OrderedFun = () => {
        OrderedNotify()
        dispatch(RemoveAll())
    }


    return (
        <div className='bg-slate-200 w-full min-h-screen'>
            <Navbar />

            <div className={`flex flex-wrap px-3 gap-7 justify-center items-center ${input == '' ? '' : 'hidden'} `}>
                {Categories.map((item) => (
                    <div onClick={() => FilterFun(item.name)} className={`bg-white shadow-lg cursor-pointer hover:bg-green-100 transition-all duration-200 flex items-center justify-center flex-col p-2 rounded-lg ${item.id == 5 ? '' : ' px-5'}`} key={item.id}>
                        <div>{item.icon}</div>
                        <div>
                            <p className='text-gray-500 font-bold'>{item.name}</p>
                        </div>

                    </div>
                ))}
            </div>

            {cat.length == 0 ? <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'> <div className="text-center text-2xl text-green-500 font-semibold pt-5">No dish Found like " <span className='text-black'> {input} </span> " !!</div></div> :
                <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ps-10 pe-10 pt-4 pb-4 mt-10 mb-6 my-3 gap-7 ">

                    {cat.map((item) => (
                        <div key={item.id} className='h-5/6 bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:border-2 border-green-300 '>
                            <div className="w-[100%] h-[60%] overflow-hidden rounded-lg">
                                <img
                                    src={item.food_image}
                                    alt={item.name}
                                    className=" object-cover"
                                />
                            </div>

                            <h1 className="text-2xl font-semibold">{item.food_name}</h1>
                            <div className="flex font-bold justify-between items-center text-green-500 p-1 w-full">
                                <p className="text-lg font-bold">Rs{item.price}/-</p>
                                <p className="flex justify-center items-center gap-2 text-green-500 text-lg font-semibold ">{item.food_type == 'veg' ? <PiLeaf /> : <GiChickenOven />}  <span> {item.food_type}</span></p>
                            </div>
                            <button className='w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition-all' onClick={() => { dispatch(AddItem({ id: item.id, name: item.food_name, image: item.food_image, price: item.price, qty: 1, })); toast.info(<div><span className='text-green-400 pe-1'>{item.food_name} </span> <span> added to cart</span></div> ) }}>Add to dish</button>
                        </div>
                    ))}

                </div>}
            <div className={`w-full ${showCart ? "translate-x-0" : "translate-x-full"} md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto`}>
                <header className='w-[100%] flex justify-between items-center'>
                    <span className='text-green-400 text-[18px] font-semibold'>Order items</span>
                    <RxCross2 onClick={() => setShowCart(false)} className='w-[30px] h-[30px] text-green-400 text-[18px] font-semibold cursor-pointer hover:text-gray-600' />
                </header>


                {CartedItems.length < 1 ? <div className='text-center text-2xl text-green-500 font-semibold pt-5'>Empty Cart</div> : <>
                    {/* cards body to show all selected items */}
                    <CartCards />
                    {/* cards footers to show all payments of selected item */}
                    <div className="crd-detail w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8">
                        <div className="w-full flex justify-between items-center">
                            <span className="text-lg text-gray-600 font-semibold">Subtotal</span>
                            <span className="text-green-400 font-semibold text-lg">Rs {subtotal}/-</span>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <span className="text-lg text-gray-600 font-semibold">Delivery Fee</span>
                            <span className="text-green-400 font-semibold text-lg">Rs {deliveryChrg}/-</span>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <span className="text-lg text-gray-600 font-semibold">Taxes</span>
                            <span className="text-green-400 font-semibold text-lg">Rs {taxes}/-</span>
                        </div>
                    </div>
                    {/* cards footers to show total final payments of selected item */}
                    <div className="crd-total w-full flex justify-between items-center p-9">
                        <span className="text-2xl text-gray-600 font-semibold">Total</span>
                        <span className="text-green-400 font-semibold text-2xl">Rs {NetTotal}/-</span>
                    </div>
                    <button className='w-[80%] p-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition-all' onClick={() => OrderedFun()}>Place Order</button>


                </>}

            </div>
        </div>

    )
}

export default Home
