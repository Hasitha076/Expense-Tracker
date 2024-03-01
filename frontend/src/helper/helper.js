import _ from 'lodash'

const getSum = (transaction, type) => {
    let sum = _(transaction)
        .groupBy("type")
        .map((objs, key) => {
            if (!type) return _.sumBy(objs, 'amount')
            return {
                'type': key,
                'color': objs[0].color,
                'total': _.sumBy(objs, 'amount')
            }
        })
        .value()
    console.log("Group values: ", sum)
    return sum
}

const getLabels = (transaction) => {
    let amountSum = getSum(transaction, "type")

    let Total = _.sum(getSum(transaction))

    let percent = _(amountSum)
        .map(objs => _.assign(objs, { percent: (100 * objs.total) / Total }))
        .value()
    return percent
}

const chart_Data = (transaction) => {

    let bg = _.map(transaction, a => a.color)
    bg = _.uniq(bg)
    let dataValues = getSum(transaction)

    console.log("colors: ", bg)

    const config = {
        data: {
            datasets: [{
                data: dataValues,
                backgroundColor: bg,
                hoverOffset: 4,
                borderRadius: 30,
                spacing: 10
            }]
        },
        options: {
            cutout: 115
        }
    }

    return config
}

const getTotal = (transaction) => {
    return _.sum(getSum(transaction))
}

export { getSum, getLabels, chart_Data, getTotal }