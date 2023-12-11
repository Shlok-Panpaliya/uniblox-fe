import Image from "next/image";
import Button from "../common/components/buttons/Button";
import { useState } from "react";

type InputProps = {
    name: string,
    price: number,
    images: string[],
    productId: string,
    userId: string,
    getUserDetails: () => void
}

const ItemCard = ({ name, price, images, productId, userId, getUserDetails }: InputProps) => {
    // state for add to cart button loading.
    const [addItemloading, setAddItemLoading] = useState<boolean>(false)

    // add item to cart. This function will be called when user clicks on add to cart button
    const addItemToCart = async () => {
        // set loading to true
        setAddItemLoading(true)

        // add item to cart
        const res = await fetch("https://uniblox-assgn.onrender.com/api/add-items-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product_id: productId,
                user_id: userId
            })
        })

        // get json response from the api.
        const response = await res.json()

        // if status is 200 then set user data in state.
        if(response.status_code === 200) {
            setAddItemLoading(false)
            getUserDetails()
        }
    }

    return (
        <div className="border border-neutral-200 rounded-xl w-fit px-4">
            <div className="relative w-52 h-52 mb-4">
                <Image
                    fill
                    alt="Product image"
                    src={images && images.length > 0 ? images[0] : '/images/placeholder.png'}
                    className="rounded-t-xl object-contain"
                />
            </div>
            <div className="flex justify-between">
                <p className="text-base text-neutral-700 font-medium">Name</p>
                <p className="text-base text-neutral-700 font-medium">{name}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-base text-neutral-700 font-medium">Price</p>
                <p className="text-base text-neutral-700 font-medium">{price}$</p>
            </div>
            <div className="w-full my-4">
                <Button disabled={addItemloading} width="w-full" appearance="Primary" onClick={async () => await addItemToCart()} loading={addItemloading}>Add to cart</Button>
            </div>
        </div>
    )
}

export default ItemCard