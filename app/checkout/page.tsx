"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../common/components/buttons/Button";
import { useRouter } from "next/navigation";


type productProps = {
    _id: string,
    images: string[],
    name: string,
    price: number,
    stock: number,
}

type userProps = {
    _id: string,
    name: string,
    phone: string,
    couponse: string[],
    email: string,
    itemsInCart: productProps[],
    ordersPlaced: string[],
}

const Checkout = () => {
    // state to store user.
    const [user, setUser] = useState<userProps | null>(null)

    // state to store total price of products.
    const [totalPrice, setTotalPrice] = useState<number>(0)

    // state to store loading state for checkout button.
    const [loadingForCheckout, setLoadingForCheckout] = useState<boolean>(false)

    // state to store loading state for coupon button.
    const [loadingForCoupon, setLoadingForCoupon] = useState<boolean>(false)

    // state to store coupon code.
    const [couponCode, setCouponCode] = useState<string>("")

    // router hook
    const router = useRouter()

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

            if (res.data.itemsInCart.length > 0) {
                let total = 0
                res.data.itemsInCart.forEach((item: productProps) => {
                    total += item.price
                })
                setTotalPrice(total)
            }
        }
    }

    // function to complete order.
    const completeOrder = async () => {
        // set loading to true
        setLoadingForCheckout(true)

        // call api to complete the order
        // https://uniblox-assgn.onrender.com
        const response = await fetch("https://uniblox-assgn.onrender.com/api/complete-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user ? user._id : null,
                coupon_code: couponCode ? couponCode : null
            })
        })

        // get json response from the api.
        const res = await response.json();

        // if status is 200 then set user data in state.
        if (res.status_code === 200) {
            // push to success page
            router.push('/success')

            // set user state
            setLoadingForCheckout(false)
        }
        else {
            // push to failure page
            router.push('/fail')

            // set loadi ng state to false
            setLoadingForCheckout(false)
        }
    }

    // function to apply coupon.
    const applyCoupon = async () => {
        // set loading to true
        setLoadingForCoupon(true)

        // call api to get coupon
        const response = await fetch("https://uniblox-assgn.onrender.com/api/generate-coupon-code", {
            method: "GET",
        })

        // get json response from the api.
        const res = await response.json();

        // if status is 200 then set user data in state.
        if (res.status_code === 200) {
            // set user state
            setLoadingForCoupon(false)

            // set coupon code
            setCouponCode(res.data)
        }
        else {
            // set laoding state to false
            setLoadingForCoupon(false)

            alert("Coupon code generation failed!")
        }
    }


    // hook to set user data and get available products.
    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className="max-w-5xl pt-12 m-auto">
            {user ? <>
                <div>
                    <h1 className="text-xl text-neutral-700 font-semibold">Hi, {user && user.name}</h1>

                </div>
                {user && user.itemsInCart.length > 0 ?
                    <div>
                        <p className="text-lg text-neutral-700">Proceed to checkout</p>
                        {user.itemsInCart.map((item, index) => {

                            return (
                                <div key={index} className="border border-neutral-200 rounded-xl w-full px-4 py-4 mt-4">
                                    <div className="flex justify-between">
                                        <div className="relative w-32 h-16">
                                            <Image
                                                fill
                                                alt="Product image"
                                                src={item.images && item.images.length > 0 ? item.images[0] : '/images/placeholder.png'}
                                                className="rounded-xl"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-base text-neutral-700 font-medium">{item.name}</p>
                                            <p className="text-base text-neutral-700 font-medium">{item.price}$</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="mt-4 flex justify-end">
                            <div className="flex justify-end flex-col">
                                <p className="text-lg mb-2">{couponCode ? "Discounted Price: " : "Total Order Value:"}<span className="font-semibold">{couponCode ? <span className="font-bold text-[#5359ea]">{totalPrice - 0.1 * totalPrice}</span> : totalPrice}</span></p>
                                {(user.ordersPlaced.length + 1) % 2 == 0 ?
                                    <div className="mb-2">
                                        {couponCode ? <p className="text-base text-neutral-700 font-medium mb-2">Coupon Code: <span className="font-semibold">{couponCode}</span></p> :
                                            <Button disabled={loadingForCoupon} appearance="Primary" width="w-full" loading={loadingForCoupon} onClick={() => applyCoupon()}>Apply Coupon</Button>}
                                    </div> : <p className="text-base text-neutral-700 font-medium mb-2">Complete 1 order to get a coupon.</p>}
                                <div className="mb-2">
                                    <Button disabled={loadingForCheckout} appearance="Primary" width="w-full" loading={loadingForCheckout} onClick={() => completeOrder()}>Complete Order</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <p className="text-lg text-neutral-700 font-medium">No items present in cart!</p>
                }
            </> : <div className="text-xl font-medium text-neutral-700">Loading...</div>
            }
        </div>
    )
}

export default Checkout