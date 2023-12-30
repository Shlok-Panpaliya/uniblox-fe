"use client";

import { useEffect, useState } from "react";
import { Table } from "antd";

const MobileStore = () => {
    // state to store total items sold.
    const [totalItemsSold, setTotalItemsSold] = useState<number>(0)

    // state to store total purchased amount.
    const [totalPurchasedAmount, setTotalPurchasedAmount] = useState<number>(0)

    // state to store total discount amount.
    const [totalDiscountAmount, setTotalDiscountAmount] = useState<number>(0)

    // state to store all discunts codes used.
    const [discountCodesUsed, setDiscountCodesUsed] = useState<string[]>([])

    // state to store all orders summary.
    const [ordersSummary, setOrdersSummary] = useState<any[]>([])


    // function to get user data.
    const getOrdersSummary = async () => {
        // get user details from database.
        const response = await fetch("http://127.0.0.1:5000/api/get-orders-summary", {
            method: "GET"
        });

        // get json response from the api.
        const res = await response.json();

        // if status is 200 then set user data in state.
        if (res.status_code === 200) {
            // set user state
            console.log(res.data)

            // set total items sold
            setTotalItemsSold(res.data.total_items_sold)

            // set total purchased amount
            setTotalPurchasedAmount(res.data.total_purchased_amount)

            // set total discount amount
            setTotalDiscountAmount(res.data.total_discount_amount)

            // set discount codes used
            setDiscountCodesUsed(res.data.discount_codes_used)

            // set each orders summary
            console.log(res.data.order_summary)
            setOrdersSummary(res.data.order_summary)
        }
    }

    const dataSource = [
        {
            key: '1',
            order_id: 'Mike',
            number_of_items: 32,
            purchased_amount: '10 Downing Street',
            discount_amount: 'as',
            discount_code: 'asd',
            order_date: 'asd'
        },
    ];

    // columns for table
    const columns = [
        {
            title: 'Order Id',
            dataIndex: 'order_id',
            key: 'order_id',
        },
        {
            title: 'Number of items',
            dataIndex: 'total_items',
            key: 'total_items',
        },
        {
            title: 'Purchased Amount',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'Discount Amount',
            dataIndex: 'discount_price',
            key: 'discount_price',
        },
        {
            title: 'Discount Code',
            dataIndex: 'coupon_code',
            key: 'coupon_code',
        },
        {
            title: 'Order Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ];


    // hook to set user data and get available products.
    useEffect(() => {
        getOrdersSummary()
    }, [])

    return (
        <div className="max-w-5xl pt-12 m-auto">
            <div>
                <p className="text-base text-neutral-900">Total items sold: <span className="font-semibold">{totalItemsSold}</span></p>
                <p className="text-base text-neutral-900">Total purchased amount by users: <span className="font-semibold">{totalPurchasedAmount}</span></p>
                <p className="text-base text-neutral-900">Total discount given: <span className="font-semibold">{totalDiscountAmount}</span></p>
                {discountCodesUsed && discountCodesUsed.length > 0 &&
                    <p className="text-base text-neutral-900">Coupon codes used by user: {discountCodesUsed.join(', ')}</p>
                }
            </div>
            <p className="text-base text-neutral-900 font-semibold my-4">Detail orders summary</p>
            <Table dataSource={ordersSummary} columns={columns} />
        </div>
    )
}

export default MobileStore

