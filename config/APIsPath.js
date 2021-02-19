
const fipeTable = ({ type, unit, brand, model, year }) => {
    switch(type) {
        case 'brand':
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas/${brand}/modelos`
        case 'model':
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas/${brand}/modelos/${model}/anos`
        case 'year':
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas/${brand}/modelos/${model}/anos/${year}`
        default:
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas`
    }
}

export default {
    fipeTable
}