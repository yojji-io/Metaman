/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { Layout, Menu, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AVAIL_TRANSLATIONS } from '../constants';

const { Option } = Select;
const { SubMenu, Item } = Menu;

export function HeaderComponent({ title, user, onLogout, to = '/dashboard' }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const setLang = val => i18n.changeLanguage(val);

  const Options = AVAIL_TRANSLATIONS.map(l => (
    <Option value={l} key={l}>
      <img
        style={{ width: '16px', height: 'auto', objectFit: 'fill' }}
        src={`assets/icons/flags/${l}.svg`}
        alt={`${l}-flag`}
      />
    </Option>
  ));

  return (
    <Layout.Header className="d-flex flex-direction-row">
      <div />
      <div className="flex-grow-1">
        <Link to={to}>
          <h1 className="d-inline logo">{title}</h1>
        </Link>
      </div>
      <Menu style={{ lineHeight: '64px' }} theme="dark" mode="horizontal">
        <Select value={lang} onChange={setLang}>
          {Options}
        </Select>
        <SubMenu title={user.email}>
          <Item onClick={onLogout}>{t('header.logout')}</Item>
        </SubMenu>
      </Menu>
    </Layout.Header>
  );
}
