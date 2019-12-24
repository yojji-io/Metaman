import React from 'react';
import { compose } from 'redux';
import { Form, Button, Input } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

export function WorkspaceFormComponent({ form, onSubmit, workspace = {} }) {
  const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit({ ...values, envs: {} });
    });
  };

  form.getFieldDecorator('id', { initialValue: workspace.id });
  form.getFieldDecorator('contributors', {
    initialValue: workspace.contributors,
  });

  return (
    <Form onSubmit={submit}>
      <Item label="Name">
        {form.getFieldDecorator('name', {
          initialValue: workspace.name,
          rules: [{ required: true }],
        })(<Input />)}
      </Item>
      <Item label="Description">
        {form.getFieldDecorator('description', {
          initialValue: workspace.description,
          rules: [{ required: true }],
        })(<TextArea autoSize style={{ minHeight: '150px' }} />)}
      </Item>
      <div>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}

export const WorkspaceForm = compose(Form.create())(WorkspaceFormComponent);
