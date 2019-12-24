/* eslint-disable */
/* prettier-ignore */
import React from 'react';

import { Spin} from 'antd'

const LoadingWrapper = ({loading, text = 'Loading...', children}) => {
    return loading
        ? (
            <Spin tip={ text }>
                {children}
            </Spin>
        ) : children
};

export default LoadingWrapper;
