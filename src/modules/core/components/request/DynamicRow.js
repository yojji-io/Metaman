/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import React from 'react';
import { Input, Icon } from 'antd';
import { useFela } from 'react-fela';

const { Group } = Input;

const style = {
  input: {
    width: '50%',
  },
  inputNotActive: {
    width: '50%',
    opacity: 0.6,
  },
};

export function DynamicRow({
  size,
  onChange,
  removable,
  onRemove,
  readonly,
  item = {},
}) {
  const { css } = useFela();
  const change = name => e => onChange({ ...item, [name]: e.target.value });
  const toggle = name => () => onChange({ ...item, [name]: !item[name] });

  return (
    <>
      <Group>
        <Input
          size={size}
          value={item.name}
          placeholder="Key"
          readOnly={readonly}
          style={item.active ? style.input : style.inputNotActive}
          onChange={change('name')}
          prefix={
            readonly ? null : (
              <Icon
                onClick={toggle('active')}
                className="cursor-pointer"
                type={item.active ? 'eye' : 'eye-invisible'}
              />
            )
          }
        />
        <Input
          size={size}
          value={item.value}
          readOnly={readonly}
          style={item.active ? style.input : style.inputNotActive}
          placeholder="Value"
          onChange={change('value')}
          suffix={
            !removable || readonly ? null : (
              <Icon
                type="close"
                onClick={onRemove}
                className="cursor-pointer"
              />
            )
          }
        />
      </Group>
    </>
  );
}
