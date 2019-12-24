/* eslint-disable */
/* prettier-ignore */
import React from "react";
import { Spin, Button, Result } from "antd";
import { useFela } from "react-fela";

const style = {
  content: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center', 
  }, 
};

export default function Home({ workspaces }) {
  const { css } = useFela();

  return (
    <Spin spinning={false}>
      <div className={css(style.content)}>
        <Result 
          status="500"
          title="Work In Progress"
          extra={(
            <Button.Group size="large">
              <Button type="link" href="/#/sign-in">Sign In</Button>
              <Button type="link" href="/#/sign-up">Sign Up</Button>
            </Button.Group>  
          )}
        />
      </div>
    </Spin>
  );
}
