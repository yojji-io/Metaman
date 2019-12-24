/* eslint-disable */
/* prettier-ignore */
import React, {useEffect, useState} from "react";
import startCase from 'lodash/startCase';
import { Select, Input } from "antd";
import { POSSIBLE_PROXY_TYPES, PROXY_TYPES } from "../../constants";
import { useTranslation } from "react-i18next";
const { Option } = Select;

export const ProxySelect = ({ onChange, proxy }) => {
    const [type, setType] = useState(proxy.type);
    const { t } = useTranslation();
    const showInput = type === 'custom';

    useEffect(() => {
        if (proxy.type !== type) {
            onChange(PROXY_TYPES[type] || PROXY_TYPES.disabled);
        }
    }, [type]);

    const setProxyValue = (e) => {
        const value = e.target.value;
        onChange({type, value})
    };

    return (
        <div className="d-flex align-items-center">
            <span className="mr-2">{t('form.proxy')}:</span>
            <Select className="w-auto" value={type} onChange={setType}>
                {
                    POSSIBLE_PROXY_TYPES.map((type, i) => <Option value={type} key={i}>{startCase(t(`form.${type}`))}</Option>)
                }
            </Select>
            {showInput && <Input className="ml-3 flex-shrink-1" value={proxy.value} onChange={setProxyValue} placeholder="Proxy url"/>}
        </div>
    )
};
