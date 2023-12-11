import Link from "next/link";

const Success = () => {
    return (
        <div className="max-w-5xl m-auto mt-12">
            <h1 className="text-xl text-neutral-700 font-semibold mb-2">Order Success</h1>
            <Link href={"/store"}>
                <div className="flex w-fit rounded-xl active:scale-95 cursor-pointer text-sm transition ease-in-out duration-300 bg-[#5359ea] text-white font-semibold px-4 py-3 text-center items-center justify-center">
                    Retrun to Store</div></Link>
        </div>
    )
}

export default Success;