/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { Layout } from 'antd';
import { useFela } from 'react-fela';

const { Content } = Layout;

const style = {
  layout: {
    height: '100vh',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    background: '#f9f9f9',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

export function EmptyPage({ children, ...props }) {
  const { css } = useFela(props);

  return (
    <Layout className={css(style.layout)}>
      <Content className={css(style.content)}>
        {children}
      </Content>
    </Layout>
  );
}
