import React from 'react'
import 'boxicons'
import { useDeleteTransactionMutation, useGetLabelsQuery } from '../store/apiSlice'

const List = () => {

    const { data: allLabels, isSuccess, isFetching, isError } = useGetLabelsQuery()

    const [deleteTransaction] = useDeleteTransactionMutation()

    let Transaction;

    const handleClick = (e) => {
        console.log("Handle click: ", e.target.id)
        if (!e.target.id) return 0
        deleteTransaction({ id: e.target.id })
    }

    if (isFetching) {
        Transaction = <div>Data Fetching...</div>
    } else if (isSuccess) {
        console.log("List data: ", allLabels)
        Transaction = allLabels.data.map((ele, index) => <Transactions key={index} category={ele} handler={handleClick} />)
    } else if (isError) {
        Transaction = <div>Error!</div>
    }

    return (
        <div className='flex flex-col py-6 gap-3' >
            <h1 className="py-4 font-bold text-xl">History</h1>
            {Transaction}
        </div>
    )
}

export default List

const Transactions = ({ category, handler }) => {
    if (!category) return null
    return (
        <div className="item flex justify-center bg-gray-50 py-3 rounded-r" style={{ borderRight: `8px solid ${category.color}` }} >
            <button onClick={handler} className="px-3"><box-icon name="trash" id={category._id ?? ''} color={category.color ?? 'rgb(255, 99, 132)'} size="20px" /></button>
            <span className='block w-full' >{category.name}</span>
        </div>
    )
}
