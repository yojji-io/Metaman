/* eslint-disable */
/* prettier-ignore */
import {Button, Form, Input} from "antd";
import {compose} from "redux";
import React from "react";

const { Item } = Form;

export function CreateFolderFormComponent({ form, onSubmit, collection = {} }) {
    const submit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            onSubmit(collection.id, values);
        });
    };

    return (
        <Form onSubmit={submit}>
            <Item label="Name">
                {form.getFieldDecorator('name', { initialValue: '', rules: [{ required: true }] })(
                    <Input />
                )}
            </Item>
            <div>
                <Button type="primary" htmlType="submit">Create</Button>
            </div>
        </Form>
    );
}

export const CreateFolderForm = compose(
    Form.create(),
)(CreateFolderFormComponent);
