/* eslint-disable */
/* prettier-ignore */
import React, { useState, useMemo } from 'react';
import { Button, Modal } from 'antd';
import { FIREBASE_AUTH_TYPES } from "../../core/constants";
import get from 'lodash/get';
import { useTranslation } from "react-i18next";

const { Group } = Button;

export function OAuth({ onOauth, size }) {
  const { t } = useTranslation();
  const [modal, setModal] = useState(null);

  const open = provider => () => onOauth(provider, openModal);
  const closeModal = () => setModal(null);
  const openModal = provider => setModal({provider});
  const onOk = () => {
      const provider = get(modal, 'provider');
      onOauth(provider, openModal);
      closeModal();
  };

  const showModal = useMemo(() => !!modal, [modal]);
  const title = useMemo(
      () => `${t('auth.modal_auth/account_exists_text')} ${get(modal, 'provider', '')}`,
      [modal]
  );

  return (
    <>
    <Group size={size} className="d-block">
      <Button onClick={open(FIREBASE_AUTH_TYPES.GOOGLE)} className="w-50">
        <i className="fab fa-google mr-2" />
        Google
      </Button>
      <Button onClick={open(FIREBASE_AUTH_TYPES.GIT)} className="w-50">
        <i className="fab fa-github mr-2" />
        Github
      </Button>
    </Group>
    <Modal
        visible={showModal}
        onOk={onOk}
        onCancel={closeModal}
    >
        <p className="py-4 mb-0">
            {title}
        </p>
    </Modal>
    </>

  );
} 
