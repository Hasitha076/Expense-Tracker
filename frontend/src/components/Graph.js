import React from 'react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import Labels from './Labels'
import { chart_Data, getLabels, getTotal } from '../helper/helper'
import { useGetLabelsQuery } from '../store/apiSlice'

Chart.register(ArcElement)

function Graph() {

    const { data: allLabels, isSuccess, isFetching, isError } = useGetLabelsQuery()

    let graphData;
    let Total;

    if (isSuccess) {
        graphData = <Doughnut {...chart_Data(allLabels.data)} />
        Total = getTotal(allLabels.data)
    }
    else if (isError) {
        graphData = <div>Error!</div>
    }

    return (
        <div className='flex justify-content max-w-xs- mx-auto'>
            <div className="item">
                <div className="chart relative">
                    {graphData}
                    <h3 className='mb-4 font-bold title'>Total
                        <span className='block text-3xl text-emerald-400' >${Total}</span>
                    </h3>
                </div>

                <div className="flex flex-col py-10 gap-4">
                    {/* Lables */}
                    <Labels />
                </div>
            </div>
        </div>
    )
}

export default Graph
