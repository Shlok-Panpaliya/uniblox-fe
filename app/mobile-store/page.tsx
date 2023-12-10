import Image from "next/image";
import Button from "../common/components/buttons/Button";

const ItemCard = () => {
    const data = null

    return (
        <div className="border border-neutral-200 rounded-xl w-fit px-4">
            <div className="relative w-52 h-52 mb-4">
                <Image
                    fill
                    alt="Product image"
                    src="https://res.cloudinary.com/dc78pr7gw/image/upload/v1702212258/cgp12qlejfprciwgchyn.jpg"
                    className="rounded-t-xl object-contain"
                />
            </div>
            <div className="flex justify-between">
                <p className="text-base text-neutral-700 font-medium">Price</p>
                <p className="text-base text-neutral-700 font-medium">10$</p>
            </div>
            <div className="w-full my-4">
                <Button width="w-full" appearance="Primary">Add to cart</Button>
            </div>
        </div>
    )
}

const MobileStore = () => {
    const data = null
    return (
        <div className="max-w-5xl pt-12 m-auto">
            {/* Store description */}
            <p className="text-neutral-700 text-2xl font-semibold mb-4">Mobile Store</p>
            <p className="text-neutral-700 text-lg font-semibold">Value of n has been taken as 3 for testing purpose but it can be set to any value required from database for each user.</p>
            <p className="text-neutral-700 text-lg font-semibold mb-4">Once you place order for 3rd, 6th, 9th,.. time you will get a discount of 10%</p>
            <ItemCard />
        </div>
    )

}

export default MobileStore