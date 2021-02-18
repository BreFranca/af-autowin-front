import axios from 'axios'
import APIsPath from '../../config/APIsPath'

export const getFipeTable = async ({ type, unit, brand, model, year }) => {
    const path = APIsPath.fipeTable({ type, unit, brand, model, year })
    return await axios.get(path)
        .then((response) => {
            // handle success

            const { data } = response

            console.log(type)

            if (type === 'models') {
                return data.modelos.map((car) => ({
                    text: car.nome,
                    value: car.codigo
                }))
            } else if (type === 'vehicle') {
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
