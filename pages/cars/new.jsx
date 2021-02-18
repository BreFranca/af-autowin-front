import React, { useState } from 'react'
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  Spin
} from 'antd'
import {
  LabelSelect,
  LabelInput,
  LabelTextArea
} from '../../components/wrappers'
import Layout from '../../components/Layout'
import styles from './Car.module.css'
import { defaultGutter } from '../../components/commons'
import { getFipeTable } from './api'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select

const Car = () => {
  const [form] = Form.useForm();
  const [fipeInfo, setFipeInfo] = useState({ car: {}, unit: '', model: '', year: '', brand: '', brands: [], models: [], years: [] })
  const [loadingAPI, setLoadingAPI] = useState(false)

  const { brand, model, year, brands, models, years, unit } = fipeInfo

  const handleChangeUnit = async (unit) => {
    setLoadingAPI(true)
    form.setFieldsValue({ brand: null, model: null, year: null, priceFipe: null })
    const brands = await getFipeTable({ unit })
    setFipeInfo({ ...fipeInfo, unit, brands })
    setLoadingAPI(false)
  }

  const handleChangeBrand = async (brand) => {
    setLoadingAPI(true)
    form.setFieldsValue({ model: null, year: null })
    const models = await getFipeTable({ type: 'models', unit, brand })
    setFipeInfo({ ...fipeInfo, brand, models })
    setLoadingAPI(false)
  }

  const handleChangeModel = async (model) => {
    setLoadingAPI(true)
    form.setFieldsValue({ year: null })
    const years = await getFipeTable({ type: 'years', unit, brand, model })
    setFipeInfo({ ...fipeInfo, model, years })
    setLoadingAPI(false)
  }

  const handleChangeYear = async (year) => {
    setLoadingAPI(true)
    const car = await getFipeTable({ type: 'vehicle', unit, brand, model, year })
    setFipeInfo({ ...fipeInfo, year, car })
    form.setFieldsValue({ priceFipe: car.Valor })
    setLoadingAPI(false)
  }

  return (
    <Layout title='Cadastrar novo veículo'>
      <Spin tip="Loading..." spinning={loadingAPI}>
        <Row className={styles.formContainer}>
          <Col offset={4} span={16}>
            <Form
              form={form}
              layout='vertical'
            >
              <Row gutter={defaultGutter}>
                <Col span={12}>
                  <LabelSelect
                    title='Tipo de veículo'
                    name='type'
                    placeholder='Selecione o tipo'
                    values={[
                      { value: 'motos', text: 'Moto' },
                      { value: 'carros', text: 'Carro' },
                      { value: 'caminhoes', text: 'Caminhão' }
                    ]}
                    onChange={handleChangeUnit}
                  />
                </Col>
                <Col span={12}>
                  <LabelSelect
                    showSearch={true}
                    title='Marca'
                    name='brand'
                    placeholder='Selecione a marca'
                    values={brands}
                    onChange={handleChangeBrand}
                  />
                </Col>
                <Col span={12}>
                  <LabelSelect
                    showSearch={true}
                    title='Modelos'
                    name='model'
                    placeholder='Selecione o modelo'
                    values={models}
                    onChange={handleChangeModel}
                  />
                </Col>
                <Col span={6}>
                  <LabelSelect
                    showSearch={true}
                    title='Ano modelo'
                    name='year'
                    placeholder='Selecione o Ano'
                    values={years}
                    onChange={handleChangeYear}
                  />
                </Col>
                <Col span={6}>
                  <Form.Item label='Ano Fabricação' name='yearFab'>
                    <DatePicker placeholder='Selecione o ano' style={{ width: '100%' }} picker="year" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <LabelInput
                    disabled={true}
                    title='Tabela'
                  />
                </Col>
                <Col span={6}>
                  <LabelInput
                    title='Preço (loja)'
                    name='priceStore'
                  />
                </Col>
                <Col span={6}>
                  <LabelInput
                    title='KM'
                    name='km'
                  />
                </Col>
                <Col span={6}>
                  <LabelSelect
                    title='Transmissão'
                    name='transmission'
                    placeholder='Selecione a transmissão'
                    values={[
                      { value: 'automatic', text: 'Automático' },
                      { value: 'manual', text: 'Manual' }
                    ]}
                  />
                </Col>
                <Col span={6}>
                  <LabelInput
                    title='Motor'
                    name='motor'
                  />
                </Col>
                <Col span={6}>
                  <LabelInput
                    title='Interior'
                    name='interior'
                  />
                </Col>
                <Col span={2}>
                  <LabelInput
                    title='Portas'
                    name='doors'
                  />
                </Col>
                <Col span={6}>
                  <LabelSelect
                    title='Combustível'
                    name='fuel'
                    placeholder='Selecione o tipo'
                    values={[
                      { value: 'gas', text: 'Kit à gás' },
                      { value: 'Diesel', text: 'Diesel' },
                      { value: 'Gas', text: 'Gasolina' },
                      { value: 'Etanol', text: 'Alcool' },
                      { value: 'Flex', text: 'Flex' }
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <LabelInput
                    title='Título'
                    name='name'
                  />
                </Col>
                <Col span={24}>
                  <LabelTextArea
                    title='Breve descrição'
                    name='littleDescription'
                    rows={6}
                  />
                </Col>
                <Col span={24}>
                  <Form.Item label='Descrição' name='description'>
                    {/* <ReactQuill style={{ height: 350 }} theme="snow" /> */}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type='primary'>Submit</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Layout>
  )
}

export default Car