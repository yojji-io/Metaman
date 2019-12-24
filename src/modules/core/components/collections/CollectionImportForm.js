/* eslint-disable */
/* prettier-ignore */
import React, {useState} from 'react';
import { compose } from 'redux';
import { Form, Button, Input,  Tabs, Upload, Icon, message } from 'antd';
import { postmanCollectionToCollection } from "../../utils/postmanCollectionToCollection";
import LoadingWrapper from "../../../common/components/loadingWrapper";
import { useTranslation } from "react-i18next";

const { Item } = Form;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Dragger } = Upload;

const importExample = `
    {
        "name": "My Collection",
        "requests": [
            {
                "name": "Get all",
                "config": {
                    "baseURL": "https://gitlab.com",
                    "data": [],
                    "headers": [],
                    "method": "get",
                    "params": [],
                    "url": "/"
                }
            }
        ]
    }
`;

export function CollectionImportFormComponent({ form, onSubmit }) {
    const [disabled, setDisabled] = useState(false);
    const [activeTab, setActiveTab] = useState("0");
    const { t } = useTranslation();

    const submit = e => {
        e.preventDefault();
        form.validateFields(async (err, {collectionJson}) => {
            if (err) {
                return;
            }
            try {
                setDisabled(true);
                const data = JSON.parse(collectionJson);
                const requests = data.requests || [];
                const folders = data.folders || [];
                await onSubmit({name: data.name, requests, folders})
            } catch (e) {
                message.error(`Collection import failed.`);
            } finally {
                setDisabled(false);
            }
        });
    };

    const onFileFailed = (err) => {
        console.log(err);
        message.error(`Import failed.`);
        setDisabled(false);
    };

    const onJsonReady = async ({target})  => {
        try {
            const postmanCollection = JSON.parse(target.result);
            const collection = postmanCollectionToCollection(postmanCollection);
            await onSubmit(collection);
            message.success(`${collection.name} collection imported successfully.`)
        } catch (err) {
            onFileFailed(err)
        }
    };

    const props = {
        name: 'file',
        customRequest: (config) => {
            setDisabled(true);

            try {
                const reader = new FileReader();
                reader.onload = onJsonReady;
                reader.readAsText(config.file);
            } catch (e) {
                onFileFailed(e)
            }
        },
    };


    return (
        <LoadingWrapper loading={disabled} >
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab={t('import.tabs.file')} key="0">
                    <Dragger {...props} disabled={disabled}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">{t('import.import_title_text')}</p>
                        <p className="ant-upload-hint">{t('import.import_subtitle_text')}</p>
                    </Dragger>
                </TabPane>
                <TabPane tab={t('import.tabs.plain_json')} key="1">
                    <Form onSubmit={submit} >
                        <Item label="JSON">
                            {form.getFieldDecorator('collectionJson', { initialValue: importExample, rules: [{ required: true }] })(
                                <TextArea style={{ height: '360px' }} />
                            )}
                        </Item>
                        <div>
                            <Button type="primary" htmlType="submit">{t('button.import')}</Button>
                        </div>
                    </Form>
                </TabPane>
            </Tabs>
        </LoadingWrapper>
    );
}

export const CollectionImportForm = compose(
    Form.create(),
)(CollectionImportFormComponent);
