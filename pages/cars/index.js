import { Table, Row, Col, Button, Divider } from 'antd'
import { columns, data } from './functions'
import Layout from '../../components/Layout'
import Link from 'next/link'

import styles from './Car.module.css'

const Cars = () => {
    return (
      <Layout title='Lista de Veículos'>
        <Row className={styles.header}>
          <Col offset={12} span={12} style={{ textAlign: 'right' }}>
            <Link href="/cars/new"><Button>Criar novo veículo</Button></Link>
          </Col>
        </Row>
        <Divider style={{ marginTop: 0 }} />
        <Table
          columns={columns}
          dataSource={data}
        />
      </Layout>
    )
}

export default Cars