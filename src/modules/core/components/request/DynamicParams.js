import _ from 'lodash';
import { Button, List, Empty } from 'antd';
import React, { useState, useEffect } from 'react';

import { DynamicRow } from './DynamicRow';
import { useTranslation } from 'react-i18next';

export const isPresentEmptyParameter = arrayParams => {
  let hasEmptyParams = false;
  if (arrayParams && arrayParams.length) {
    arrayParams.forEach((param, index) => {
      if (_.get(arrayParams, `${index}.name`, '').trim() === '') {
        hasEmptyParams = true;
      }
    });
  }
  return hasEmptyParams;
};

export function DynamicParams({
  onChange,
  value = [],
  size,
  readonly = false,
  description,
  image,
}) {
  const [items, updateItems] = useState(value);
  const { t } = useTranslation();

  useEffect(() => updateItems(value), [value]);
  const setItems = items => {
    onChange(items);
    updateItems(items);
  };

  const add = () => setItems(items.concat({ active: true }));

  const remove = index => () => setItems(items.filter((el, i) => index !== i));

  const change = index => values => {
    const copied = items.concat([]);
    copied[index] = values;
    setItems(copied);
  };

  return (
    <div>
      <List
        split={false}
        bordered={false}
        itemLayout="vertical"
        locale={{
          emptyText: (
            <>
              <Empty description={description} image={image}>
                {!readonly && (
                  <Button type="link" size={size} onClick={add}>
                    {t('form.add_first_parameter')}
                  </Button>
                )}
              </Empty>
            </>
          ),
        }}
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item>
            <DynamicRow
              size={size}
              key={index}
              item={item}
              removable={true}
              readonly={readonly}
              onRemove={remove(index)}
              onChange={change(index)}
            />
          </List.Item>
        )}
      />
      {_.isEmpty(value) || readonly ? null : (
        <div className="text-center">
          <Button
            type="link"
            size={size}
            onClick={add}
            disabled={isPresentEmptyParameter(value)}>
            {t('general.add')}
          </Button>
        </div>
      )}
    </div>
  );
}
