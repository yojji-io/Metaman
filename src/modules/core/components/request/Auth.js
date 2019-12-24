/* eslint-disable */
/* prettier-ignore */
import map from 'lodash/map';
import set from 'lodash/set';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import cloneDeep from 'lodash/cloneDeep';
import React, { useMemo } from 'react';
import { Form, Input, Select } from 'antd';
import { AUTH_DEFAULTS, AUTH_TYPES } from '../../constants';
import { useTranslation } from 'react-i18next';

const { Item } = Form;
const { Option } = Select;

const AdditionalOptions = map(AUTH_TYPES, (value, key) => (
  <Option value={value} key={key}>
    {startCase(key)}
  </Option>
));

export function Auth({ size, value, onChange }) {
  const { t } = useTranslation();
  const authType = get(value, 'type', null);
  const setType = val => {
    val ? onChangeAuthType(val) : onChange(false);
  };
  const onChangeAuthType = type => {
    if (authType !== type) {
      onChange(AUTH_DEFAULTS[type]);
    }
  };

  const setAuthField = (value, fieldName) => e => {
    const newValue = cloneDeep(value);
    set(newValue, fieldName, e.target.value);
    onChange(newValue);
  };
  const showInputs = authType && value && value[authType];

  const Inputs = useMemo(() => {
    return showInputs
      ? map(value[authType], (val, key) => {
          const onFieldChange = setAuthField(value, [authType, key]);
          return (
            <Item className="mb-1" label={startCase(key)} key={key}>
              <Input size={size} value={val} onChange={onFieldChange} />
            </Item>
          );
        })
      : null;
  }, [value]);

  return (
    <div className="pb-3 pt-1">
      <Item className="mb-1" label={t('form.auth_type')}>
        <Select value={authType} size={size} onSelect={setType}>
          <Option value={''}>{t('form.none')}</Option>
          {AdditionalOptions}
        </Select>
      </Item>

      {showInputs && Inputs}
    </div>
  );
}
