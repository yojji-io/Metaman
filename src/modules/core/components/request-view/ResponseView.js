/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import React, { useMemo } from 'react';
import { Tabs, Empty, Spin } from 'antd';

import { Body } from './Body';
import { Headers } from './Headers';
import { Cookies } from './Cookies';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

function ResponseExtra({ result: { response } }) {
  const { t } = useTranslation();
  return (
    <div className="px-3">
      <small className="mr-2">
        <strong>{t('form.code')}:</strong>
        <span>{_.get(response, 'status')}</span>
      </small>
      <small className="mr-0">
        <strong>{t('form.method')}:</strong>
        <span className="text-uppercase">
          {_.get(response, 'config.method')}
        </span>
      </small>
    </div>
  );
}

export function ResponseView({ response = false }) {
  const extra = useMemo(() => <ResponseExtra result={response} />, [response]);
  const { t } = useTranslation();

  if (!response || _.isEmpty(response) || response.loading) {
    return (
      <Spin spinning={response.loading || false} className="py-3">
        <Empty description={t('form.no_response_yet')} />
      </Spin>
    );
  }

  return (
    <Tabs tabBarExtraContent={extra} className="no-margin">
      <TabPane key="body" tab={t('form.body')}>
        <Body response={response} />
      </TabPane>
      <TabPane className="px-3" key="headers" tab={t('form.headers')}>
        <Headers response={response} />
      </TabPane>
      <TabPane disabled className="px-3" key="cookies" tab={t('form.cookies')}>
        <Cookies response={response} />
      </TabPane>
    </Tabs>
  );
}
