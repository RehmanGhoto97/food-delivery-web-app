import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { QtyDecrement, QtyIncrement, RemoveItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';




const CartCards = () => {
    let items = useSelector(state => state.cart);
   
    let dispatch = useDispatch()

    return (
        <>

            <div className="w-full mt-9 flex flex-col gap-8">

                {items.map((obj, index) => (
                  
                    <div key={index} className="w-full h-[120px] p-2  shadow-lg flex justify-between ">
                        <div className="w-[60%] h-full  flex gap-3">
                            <div className="w-[60%] h-full overflow-hidden rounded-lg">
                                <img src={obj.image} alt="" />
                            </div>

                            <div className="w-[40%] h-full flex flex-col gap-3">
                                <p className='lg:text-md text-gray-600 font-semibold'>{obj.name}</p>
                                <div className="w-[110px] h-[50px] bg-slate-400 flex rounded-lg overflow-hidden shadow-lg  font-semibold border-2 border-green-400 text-xl">
                                    <button className="w-[30%] h-full bg-white flex justify-center items-center text-green-400 hover:bg-gray-200" onClick={() => dispatch(QtyDecrement(obj.id))} >-</button>
                                    <span className="w-[40%] h-full bg-slate-200 flex justify-center items-center text-green-400">{obj.qty}</span>
                                    <button className="w-[30%] h-full bg-white flex justify-center items-center text-green-400 hover:bg-gray-200" onClick={() => dispatch(QtyIncrement(obj.id))} >+</button>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-start items-end gap-6">
                            <span className="text-xl text-green-400 font-semibold">Rs 349/-</span>
                            <RiDeleteBin6Line className='w-[30px] h-[30px] text-red-400 cursor-pointer' onClick={() =>{ dispatch(RemoveItem(obj.id));  toast.error(<span className='text-gray-500 pe-1'>{obj.name} removed</span> )}} />

                        </div>
                    </div>
                ))}

            </div>


        </>
    )
}

export default CartCards
