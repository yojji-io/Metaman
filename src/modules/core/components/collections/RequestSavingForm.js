/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { compose } from 'redux';
import { Select, Input, Form, Button } from 'antd';
import * as paths from "../../firebase-path";
import { useTranslation } from "react-i18next";

const { Item } = Form;
const { Option } = Select;

export function RequestSavingFormComponent({ _id, workspace, form, changes, request = {}, collections = [], folders = [], onSubmit, firestore }) {
  const { collection } = changes;
  const { t } = useTranslation();

  form.getFieldDecorator('workspace', { initialValue: workspace });
  form.getFieldDecorator('config', { initialValue: request.config });

  const getCollectionListener = workspace => ({collection: paths.collections.all({ workspace })});
  const getFoldersListener = (workspace, collection) => ({collection: paths.folders.all({ workspace, collection })});

  const collectionListener = useMemo(() => getCollectionListener(workspace), [workspace]);
  const folderListener = useMemo(() => getFoldersListener(workspace, collection), [collection, workspace]);

  useEffect(() => {
      firestore.setListener(collectionListener);

      return function cleanup() {
          firestore.unsetListener(collectionListener);
      };
  }, [collectionListener]);

  useEffect(() => {
      if (collection) {
          firestore.setListener(folderListener);
      }
      return function cleanup() {
          firestore.unsetListener(folderListener);
      };
  }, [folderListener]);

  const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
        onSubmit(values);
    });
  };

  return (
    <Form onSubmit={submit}>
      <Item label={t('general.collection')}>
        {form.getFieldDecorator('collection', { required: true, initialValue: changes.collection || request.collection })(
          <Select>
            {_.map(collections, collection => <Option key={collection.id} value={collection.id}>{collection.name}</Option>)}
          </Select>
        )}
      </Item>
      <Item label={t('general.folder')}>
        {form.getFieldDecorator('folder', { initialValue: request.folder })(
          <Select allowClear disabled={!(changes.collection || request.collection)}>
            {_.map(folders, folders => <Option value={folders.id} key={folders.id}>{folders.name}</Option>)}
          </Select>
        )}
      </Item>
      <Item label={t('general.request_name')}>
        {form.getFieldDecorator('name', { required: true, initialValue: request.name })(
          <Input />
        )}
      </Item>
      <div>
        <Button type="primary" htmlType="submit">
          {t('button.save')}
        </Button>
      </div>
    </Form>
  );
}

export const RequestSavingForm = compose(
  Form.create({
    onValuesChange: (props, updates, values) => props.onChange(values),
  }),
)(RequestSavingFormComponent);
