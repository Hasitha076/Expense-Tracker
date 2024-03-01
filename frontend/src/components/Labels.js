import React from 'react'
import { useGetLabelsQuery } from '../store/apiSlice'
import { getLabels, getSum } from '../helper/helper'

const Labels = () => {

    const { data: allLabels, isSuccess, isFetching, isError } = useGetLabelsQuery()

    let Transaction;

    if (isFetching) {
        Transaction = <div>Data Fetching...</div>
    }
    else if (isSuccess) {
        console.log("All labels: ", allLabels)
        let result = getLabels(allLabels.data, 'type')
        console.log(result)
        Transaction = result.map((ele, index) => <LabelComponent key={index} data={ele} />)
    }
    else if (isError) {
        Transaction = <div>Error!</div>
    }


    return (
        <>
            {Transaction}
        </>
    )
}

export default Labels

const LabelComponent = ({ data }) => {
    if (!data) return <></>
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded py-3" style={{ background: data.color ?? '#f9c74f' }} ></div>
                <h3 className='text-md' >{data.type ?? ""}</h3>
            </div>
            <h3 className='font-bold' >{Math.round(data.percent) ?? 0}%</h3>
        </div >
    )
}
