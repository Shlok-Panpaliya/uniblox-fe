"use client";

import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard"

type userProps = {
    _id: string,
    name: string,
    phone: string,
    couponse: string[],
    email: string,
    itemsInCart: string[],
    ordersPlaced: string[],
}

type productProps = {
    _id: string,
    images: string[],
    name: string,
    price: number,
    stock: number,
}

const MobileStore = () => {
    // state to store user.
    const [user, setUser] = useState<userProps | null>(null)

    // state to store products.
    const [products, setProducts] = useState<productProps[] | null>(null)

    // function to get available products.
    const getAvailableProducts = async () => {
        // get items from database to be shown on listing
        const response = await fetch("https://uniblox-assgn.onrender.com/api/get-all-products?available=Yes", {
            method: "GET"
        }
        );
        // get json response from the api.
        const res = await response.json();

        // if status is 200 then set user data in state.
        if (res.status_code === 200) {
            // set user state
            setProducts(res.data)
        }
    }

    // function to get user data.
    const getUserDetails = async () => {
        // get user details from database.
        const response = await fetch("https://uniblox-assgn.onrender.com/api/get-user-data?user_id=6575cdee91036adf33e8dbb7", {
            method: "GET"
        });

        // get json response from the api.
        const res = await response.json();

        // if status is 200 then set user data in state.
        if (res.status_code === 200) {
            // set user state
            setUser(res.data)
        }
    }

    // hook to set user data and get available products.
    useEffect(() => {
        getAvailableProducts()
        getUserDetails()
    }, [])

    return (
        <div className="max-w-5xl pt-12 m-auto">
            {/* Header */}
            {user ?
                <>
                    <div className="flex justify-between">
                        <p className="text-neutral-700 text-2xl font-semibold mb-4">Welcome, {user && user.name}</p>
                    </div>

                    {/* Cart items and option to checkout to cart */}
                    <div className="flex justify-between">
                        <p className="text-neutral-700 text-2xl font-semibold mb-4">{user && user?.itemsInCart && user?.itemsInCart.length} items in cart</p>
                        <a href="/checkout" target="_blank">
                            <div className="flex active:scale-95 cursor-pointer text-sm transition ease-in-out duration-300 bg-[#5359ea] text-white font-semibold px-4 py-3 text-center items-center justify-center rounded-xl">
                                View Cart
                            </div>
                        </a>
                    </div>

                    {/* Listing of products */}
                    {user && products && products.length > 0 && products.map((item) => (
                        <ItemCard key={item.name} name={item.name} price={item.price} images={item.images} productId={item._id.toString()} userId={user._id} getUserDetails={getUserDetails} />
                    ))}

                    {/* Assignment rules */}
                    <div className="mt-12">
                        <p className="text-neutral-700 text-lg font-semibold">Value of n has been taken as 2 for testing purpose but it can be set to any value required from database for each user.</p>
                        <p className="text-neutral-700 text-lg font-semibold mb-4">Once you place order for 2rd, 4th, 6th,.. time you will get a discount of 10%</p>
                    </div>
                </>
                : 
                <div className="text-xl font-medium text-neutral-700">Loading...</div>
            }
        </div>
    )
}

export default MobileStore
