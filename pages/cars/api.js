import axios from 'axios'
import APIsPath from '../../config/APIsPath'

export const getFipeTable = async ({ type, unit, brand, model, year }) => {
    const path = APIsPath.fipeTable({ type, unit, brand, model, year })
    return await axios.get(path)
        .then((response) => {
            // handle success

            const { data } = response

            if (type === 'brand') {
                return data.modelos.map((car) => ({
                    text: car.nome,
                    value: car.codigo
                }))
            } else if (type === 'year') {
                return data
            } else {
                return data.map((car) => ({
                    text: car.nome,
                    value: car.codigo
                }))
            }
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
}
