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
import { getNextType } from './functions'
import moment from 'moment'
// import ReactQuill from 'react-quill';
// import 'react-squill/dist/quill.snow.css';

const { Option } = Select

const Car = () => {
  const [form] = Form.useForm();
  const [fipeInfo, setFipeInfo] = useState({ car: {}, unit: '', model: '', year: '', brand: '', brands: [], models: [], years: [] })
  const [loadingAPI, setLoadingAPI] = useState(false)

  const { brand, model, year, brands, models, years, unit } = fipeInfo

  const resetFields = (field) => {
    switch (field) {
      case 'brand':
        form.setFieldsValue({ model: null, year: null, priceFipe: null, name: null })
        break
      case 'model':
        form.setFieldsValue({ year: null, priceFipe: null, name: null })
        break
      case 'year':
        form.setFieldsValue({ priceFipe: null, name: null })
        break
      default:
        form.setFieldsValue({ brand: null, model: null, year: null, priceFipe: null, name: null })
        break
    }
  }

  const handleChangeFipeFields = async (value, type) => {
    setLoadingAPI(true)
    resetFields(type)
    const fipeApi = await getFipeTable({ type, unit, brand, model, year, [type]: value })
    const nextType = getNextType(type)

    setFipeInfo({
      ...fipeInfo,
      [type]: value,
      [nextType]: fipeApi
    })

    if (type === 'year') {
      form.setFieldsValue({
        priceFipe: fipeApi.Valor,
        name: `${fipeApi.Marca} ${fipeApi.Modelo}`
      })
    }

    setLoadingAPI(false)
  }

  const onFinish = (values) => {
    console.log(values)
    form.resetFields()
  }

  return (
    <Layout title='Cadastrar novo veículo'>
      <Spin tip='Loading...' spinning={loadingAPI}>
        <Row className={styles.formContainer}>
          <Col offset={4} span={16}>
            <Form
              form={form}
              onFinish={onFinish}
              layout='vertical'
            >
              <Row gutter={defaultGutter}>
                <Col span={6}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: 'Por favor selecione o tipo!'
                    }]}
                    title='Tipo de veículo'
                    name='type'
                    required
                    placeholder='Selecione o tipo'
                    values={[
                      { value: 'motos', text: 'Moto' },
                      { value: 'carros', text: 'Carro' },
                      { value: 'caminhoes', text: 'Caminhão' }
                    ]}
                    onChange={e => handleChangeFipeFields(e, 'unit')}
                  />
                </Col>
                <Col span={6}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: 'Por favor selecione a marca!'
                    }]}
                    showSearch={true}
                    title='Marca'
                    name='brand'
                    placeholder='Selecione a marca'
                    values={brands}
                    onChange={e => handleChangeFipeFields(e, 'brand')}
                  />
                </Col>
                <Col span={12}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: 'Por favor selecione o modelo!'
                    }]}
                    showSearch={true}
                    title='Modelos'
                    name='model'
                    placeholder='Selecione o modelo'
                    values={models}
                    onChange={e => handleChangeFipeFields(e, 'model')}
                  />
                </Col>
                <Col span={4}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: 'Por favor selecione o ano modelo!'
                    }]}
                    showSearch={true}
                    title='Ano modelo'
                    name='year'
                    placeholder='Selecione o Ano'
                    values={years}
                    onChange={e => handleChangeFipeFields(e, 'year')}
                  />
                </Col>
                <Col span={4}>
                  <Form.Item
                    label='Ano Fabricação'
                    name='yearFab'
                    rules={[{
                      required: true,
                      message: 'Por favor selecione o ano de fabricação!'
                    }]}
                  >
                    <DatePicker placeholder='Selecione o ano' style={{ width: '100%' }} picker='year' />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <LabelInput
                    rules={[{
                      required: true,
                      message: 'Por favor preencha a tabela!'
                    }]}
                    disabled
                    name='priceFipe'
                    title='Tabela'
                  />
                </Col>
                <Col span={5}>
                  <LabelInput
                    rules={[{
                      required: true,
                      message: 'Por favor preencha o Preço (loja)!'
                    }]}
                    title='Preço (loja)'
                    name='priceStore'
                  />
                </Col>
                <Col span={6}>
                  <LabelInput
                    rules={[{
                      required: true,
                      message: 'Por favor preencha o KM!'
                    }]}
                    title='KM'
                    name='km'
                  />
                </Col>
                <Col span={6}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: 'Por favor selecione a trasmissão!'
                    }]}
                    title='Transmissão'
                    name='transmission'
                    placeholder='Selecione a transmissão'
                    values={[
                      { value: 'automatic', text: 'Automático' },
                      { value: 'manual', text: 'Manual' }
                    ]}
                  />
                </Col>
                <Col span={5}>
                  <LabelInput
                    rules={[{
                      required: true,
                      message: 'Por favor preencha o motor!'
                    }]}
                    title='Motor'
                    name='motor'
                  />
                </Col>
                <Col span={6}>
                  <LabelInput
                    rules={[{
                      required: true,
                      message: 'Por favor preencha o interior!'
                    }]}
                    title='Interior'
                    name='interior'
                  />
                </Col>
                <Col span={2}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: ''
                    }]}
                    title='Portas'
                    name='doors'
                    values={[
                      { value: '1', text: '1' },
                      { value: '2', text: '2' },
                      { value: '3', text: '3' },
                      { value: '4', text: '4' },
                      { value: '5', text: '5' }
                    ]}
                  />
                </Col>
                <Col span={5}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: 'Por favor selecione o combustível!'
                    }]}
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
                    rules={[{
                      required: true,
                      message: 'Por favor preencha o título!'
                    }]}
                    title='Título'
                    name='name'
                  />
                </Col>
                <Col span={24}>
                  <LabelTextArea
                    rules={[{
                      required: true,
                      message: 'Por favor preencha a breve descrição!'
                    }]}
                    title='Breve descrição'
                    name='littleDescription'
                    rows={6}
                  />
                </Col>
                <Col span={24}>
                  {/* <Form.Item label='Descrição' name='description'> */}
                    {/* <ReactQuill
                      onChange={(e) => console.log(e)}
                      style={{ height: 350 }}
                      theme='snow'
                      value={form.getFieldValue('description')}
                    /> */}
                  {/* </Form.Item> */}
                </Col>
                <Col span={24}>
                  <LabelSelect
                    rules={[{
                      required: true,
                      message: 'Por favor selecione os opcionais!'
                    }]}
                    mode='multiple'
                    allowClear
                    title='Opcionais'
                    name='opcionals'
                    placeholder='Selecione os opcionais'
                    values={[
                      { value: 'air-bag-do-motorista', text: 'Air bag do motorista' },
                      { value: 'air-bag-duplo', text: 'Air bag duplo' },
                      { value: 'alarme', text: 'Alarme' },
                      { value: 'ar-condicionado', text: 'Ar condicionado' },
                      { value: 'ar-condicionado-digital', text: 'Ar condicionado digital' },
                      { value: 'ar-quente', text: 'Ar quente' },
                      { value: 'assistente-de-partida-em-rampa', text: 'Assistente de partida em rampa' },
                      { value: 'banco-bi-partido', text: 'Banco bi-partido' },
                      { value: 'banco-do-motorista-com-ajuste-de-altura', text: 'Banco do motorista com ajuste de altura' },
                      { value: 'bancos-de-couro', text: 'Bancos de couro' },
                      { value: 'bancos-dianteiros-com-aquecimento', text: 'Bancos dianteiros com aquecimento' },
                      { value: 'capota-maritima', text: 'Capota maritima' },
                      { value: 'comando-de-audio-e-telefone-no-volante', text: 'Comando de áudio e telefone no volante' },
                      { value: 'computador-de-bordo', text: 'Computador de bordo' },
                      { value: 'controle-automatico-de-velocidade', text: 'Controle automático de velocidade' },
                      { value: 'controle-de-estabilidade', text: 'Controle de estabilidade' },
                      { value: 'controle-de-tracao', text: 'Controle de tração' },
                      { value: 'desembacador-traseiro', text: 'Desembaçador traseiro' },
                      { value: 'direcao-eletrica', text: 'Direção elétrica' },
                      { value: 'direcao-hidraulica', text: 'Direção hidráulica' },
                      { value: 'encosto-de-cabeca-traseiro', text: 'Encosto de cabeça traseiro' },
                      { value: 'farol-de-neblina', text: 'Farol de neblina' },
                      { value: 'farol-xenonio', text: 'Farol xenônio' },
                      { value: 'freio-abs', text: 'Freio ABS' },
                      { value: 'gps', text: 'GPS' },
                      { value: 'kit-gas', text: 'Kit Gás' },
                      { value: 'kit-multimidia', text: 'Kit Multimídia' },
                      { value: 'kit-visibilidade', text: 'Kit Visibilidade' },
                      { value: 'limpador-traseiro', text: 'Limpador traseiro' },
                      { value: 'porta-copos', text: 'Porta-copos' },
                      { value: 'protetor-de-caçamba', text: 'Protetor de caçamba' },
                      { value: 'retrovisores-eletricos', text: 'Retrovisores elétricos' },
                      { value: 'rodas-de-liga-leve', text: 'Rodas de liga leve' },
                      { value: 'radio', text: 'Rádio' },
                      { value: 'radio-e-cd-player', text: 'Rádio e CD Player' },
                      { value: 'sensor-de-chuva', text: 'Sensor de chuva' },
                      { value: 'sensor-de-estacionamento', text: 'Sensor de estacionamento' },
                      { value: 'teto-solar', text: 'Teto solar' },
                      { value: 'travas-eletricas', text: 'Travas elétricas' },
                      { value: 'vidros-eletricos', text: 'Vidros elétricos' },
                      { value: 'volante-com-regulagem-de-altura', text: 'Volante com regulagem de altura' }
                    ]}
                  />
                </Col>
              </Row>
              <Form.Item>
                <Button type='primary' htmlType='submit'>Criar</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Layout>
  )
}

export default Car