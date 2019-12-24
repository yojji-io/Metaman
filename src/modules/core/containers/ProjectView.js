/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import { useFela } from 'react-fela';
import { useTranslation } from "react-i18next";

const { Sider, Content } = Layout;

const style = {
  layout: {
    height: '100vh'
  },
  page: {
    height: '100%'
  },
  sider: {
    overflowY: 'auto', 
    borderRight: '1px solid rgb(232, 232, 232)',
  },
  content: {
    height: '100%', 
    padding: '15px',
    overflowY: 'auto', 
    background: '#fff', 
  },
};

export function ProjectView({ sider, content }) {
  const { t } = useTranslation();
  const { css } = useFela();

  return (
    <Layout className={css(style.layout)}>
      <Header title={t('header.request')} />
      <Layout className={css(style.page)}>
        <Sider theme="light" className={css(style.sider)} width="350px">
          {sider}
        </Sider>
        <Content className={css(style.content)}>
          {content}
        </Content>
      </Layout>
    </Layout>
  );
}
