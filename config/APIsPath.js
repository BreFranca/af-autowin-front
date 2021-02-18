
const fipeTable = ({ type, unit, brand, model, year }) => {
    switch(type) {
        case 'models':
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas/${brand}/modelos`
        case 'years':
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas/${brand}/modelos/${model}/anos`
        case 'vehicle':
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas/${brand}/modelos/${model}/anos/${year}`
        default:
            return `https://parallelum.com.br/fipe/api/v1/${unit}/marcas`
    }
}

export default {
    fipeTable
}