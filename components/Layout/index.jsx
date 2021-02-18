import styles from './Layout.module.css'
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CarOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import 'antd/dist/antd.css'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const LayoutContainer = ({
  title,
  children
}) => {

  const [collapsed, setCollapse] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('toggleMenu')) {
      setCollapse(true)
    }
  })

  const toggle = () => {
    if (localStorage.getItem('toggleMenu')) {
      localStorage.removeItem('toggleMenu')
    } else {
      localStorage.setItem('toggleMenu', 'active')
    }
      setCollapse(!collapsed)
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header} style={{ padding: 0, background: '#FFF' }}>
        <Row>
          <Col span={6}>
            <Row align='middle' className={styles.logoContainer}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: styles.trigger,
                onClick: toggle,
              })}
              <div className={styles.logo}>AUTO WIN</div> | Dashboard
            </Row>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h4>{title}</h4>
          </Col>
          <Col span={6} />
        </Row>
      </Header>
      <Layout className={styles['site-layout-background']}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<CarOutlined />}>
              <Link href="/cars">
                Veículos
              </Link>
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutContainer
