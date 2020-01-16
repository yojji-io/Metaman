/* eslint-disable */
/* prettier-ignore */
import { Button } from 'antd';
import React, { useState, useMemo } from 'react';

import { Raw } from './Raw.view';
import { Pretty } from './Pretty.view';
import { Preview } from './Preview.view';
import { useTranslation } from 'react-i18next';

const { Group } = Button;

const VIEW_MODE = {
  raw: 'raw',
  pretty: 'pretty',
  preview: 'preview',
};

export function Body({ response = false }) {
  const [mode, setMode] = useState(VIEW_MODE.raw);

  const select = mode => e => setMode(mode);
  const view = useMemo(() => {
    switch (mode) {
      case VIEW_MODE.pretty:
        return <Pretty result={response} />;
      case VIEW_MODE.preview:
        return <Preview result={response} />;
      default:
        return <Raw result={response} />;
    }
  }, [mode, response]);

  const { t } = useTranslation();

  return (
    <div
      className="p-2"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignContent: 'stretch',
      }}>
      <div className="mb-2">
        <Group>
          <Button
            onClick={select(VIEW_MODE.pretty)}
            disabled={mode === VIEW_MODE.pretty}>
            {t('form.pretty')}
          </Button>
          <Button
            onClick={select(VIEW_MODE.raw)}
            disabled={mode === VIEW_MODE.raw}>
            {t('form.raw')}
          </Button>
          <Button
            onClick={select(VIEW_MODE.preview)}
            disabled={mode === VIEW_MODE.preview}>
            {t('form.preview')}
          </Button>
        </Group>
      </div>
      <div
        className="preview-container"
        style={{ display: 'flex', height: '100%' }}>
        {view}
      </div>
    </div>
  );
}
