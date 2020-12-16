import React, { useState, useEffect } from 'react';
import useStore from '../../../../hook/use-store/useStore';
import FormModalWrapper from '../form-modal-template/FormModalWrapper';
import FormModalItem from '../form-modal-template/FormModalItemWrapper';
import FormModalLabel from '../form-modal-template/FormModalLabel';
import ModalBackground from '../modal-background/ModalBackground';
import FormModalHeader from '../form-modal-header/FormModalHeader';
import { observer } from 'mobx-react';
import AccountPreview from '../../account-preview/AccountPreview';
import InputText from '../../inputs/input-text/InputText';
import formModal from '../../../../constants/formModal';
import useGetParam from '../../../../hook/use-get-param/useGetParam';
import { convertToAccount } from '../formUtils';
import { Account } from '../../../../types/account';
import CheckSuccess from '../../check/check-success/CheckSuccess';
import CheckFail from '../../check/check-fail/CheckFail';
import CheckSuccessText from '../../check/check-text/CheckSuccessText';
import CheckFailText from '../../check/check-text/CheckFailText';
import CheckNoActionText from '../../check/check-text/CheckNoActionText';
import CheckNoAction from '../../check/check-no-action/CheckNoAction';
import { LIGHT_GREEN, FAIL_RED } from '../../../../constants/color';

const FormModalUpdateAccount: React.FC = () => {
  const { rootStore } = useStore();
  const id = useGetParam();
  const updateAccountFormStore = rootStore.modalStore.updateAccountFormStore;
  const { show } = updateAccountFormStore;
  const [colorCheck, setColorCheck] = useState(false);
  const [name, setName] = useState<string>((updateAccountFormStore.account as Account).name);
  const [inputColor, setInputColor] = useState<string>((updateAccountFormStore.account as Account).color);
  const { check, noChange } = rootStore.modalStore.updateAccountFormStore;

  const accountId = updateAccountFormStore.account?.id;

  useEffect(() => {
    updateAccountFormStore.loadOriginalAccount((updateAccountFormStore.account as Account).name);
  }, []);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (rootStore.accountStore.accountNames.includes(e.target.value)) {
      updateAccountFormStore.setCheckFalse();
    } else {
      updateAccountFormStore.setCheckTrue();
    }
    if (updateAccountFormStore.orginalAccountName === e.target.value) {
      updateAccountFormStore.setNoChangeTrue();
    } else {
      updateAccountFormStore.setNoChangeFalse();
    }
  };

  const onChange = (color: { hex: string }): void => {
    setInputColor(color.hex);
    if (inputColor.toLowerCase() === (updateAccountFormStore.account as Account).color.toLowerCase()) {
      setColorCheck(false);
    } else {
      setColorCheck(true);
    }
  };

  const modalToggle = (): void => {
    updateAccountFormStore.toggleShow();
    updateAccountFormStore.setNoChangeTrue();
  };

  const deleteAccount = (): void => {
    try {
      if (accountId !== undefined) {
        rootStore.accountStore.deleteAccount(accountId);
      }
    } catch (e) {
      alert(e.message);
    } finally {
      modalToggle();
    }
  };

  const updateAccount = (): void => {
    if (accountId && name && inputColor) {
      const account = convertToAccount(id, name, inputColor);
      rootStore.accountStore.updateAccount(account, accountId);
      updateAccountFormStore.setNoChangeFalse();
      modalToggle();
    }
  };

  if (
    updateAccountFormStore.convertAccount?.name !== undefined &&
    updateAccountFormStore.convertAccount?.color !== undefined
  ) {
    return (
      <ModalBackground show={show} closeModal={modalToggle}>
        <FormModalWrapper>
          {/*
            1. 정상적으로 통과 (noChange , check , name 통과) ( 완료를 누를 수 있음)
            2. 이름이 변경되지 않아 (or null) 완료 버튼 비활성화 clickBLue (없음)
            3. 중복검사 실패 (clickBlue 없음)
            */}
          {check || noChange ? (
            (name && !noChange) || (name && colorCheck) ? (
              <FormModalHeader
                modalName={formModal.UPDATE_ACCOUNT_MODAL_NAME}
                blueName={'완료'}
                redName={'삭제'}
                closeModal={modalToggle}
                clickRed={deleteAccount}
                clickBlue={updateAccount}
              />
            ) : (
              <FormModalHeader
                modalName={formModal.UPDATE_ACCOUNT_MODAL_NAME}
                closeModal={modalToggle}
                redName={'삭제'}
                clickRed={deleteAccount}
                disabledName={'완료'}
              />
            )
          ) : (
            <FormModalHeader
              modalName={formModal.UPDATE_ACCOUNT_MODAL_NAME}
              closeModal={modalToggle}
              redName={'삭제'}
              clickRed={deleteAccount}
              disabledName={'완료'}
            />
          )}

          <FormModalItem>
            <AccountPreview name={name} color={inputColor} onChange={onChange} />
          </FormModalItem>
          <FormModalItem>
            <FormModalLabel>{formModal.ACCOUNT_LABEL_NAME}</FormModalLabel>
            {/*
            check : 중복검사 통과 여부 true -> 통과 false-> 실패
            name : true-> 이름 존재 , 없으면 false
            noChange : 현재 선택된 결제수단의 이름이 바뀌지 않을때 ( 한번이라도 입력되면 false 같은 이름으로 돌아오면 true)
             */}
            {/*
               1. LIGHT_GREEN : 중복검사 통과
               2. No Change
               3. 중복검사 실패고
               4. 이름이 없음
               */}
            {check ? (
              name && !noChange ? (
                <InputText
                  maxLength={8}
                  placeholder={formModal.ACCOUNT_PLACEHOLDER}
                  value={name}
                  onChange={onChangeName}
                  focusColor={LIGHT_GREEN}
                />
              ) : (
                <InputText
                  maxLength={8}
                  placeholder={formModal.ACCOUNT_PLACEHOLDER}
                  value={name}
                  onChange={onChangeName}
                />
              )
            ) : !noChange ? (
              <InputText
                maxLength={8}
                placeholder={formModal.ACCOUNT_PLACEHOLDER}
                value={name}
                onChange={onChangeName}
                focusColor={FAIL_RED}
              />
            ) : (
              <InputText
                maxLength={8}
                placeholder={formModal.ACCOUNT_PLACEHOLDER}
                value={name}
                onChange={onChangeName}
              />
            )}
            {check ? (
              name && !noChange ? (
                <CheckSuccess />
              ) : (
                <CheckNoAction />
              )
            ) : !noChange ? (
              <CheckFail />
            ) : (
              <CheckNoAction />
            )}
          </FormModalItem>
          {check ? (
            name && !noChange ? (
              <CheckSuccessText />
            ) : (
              <CheckNoActionText />
            )
          ) : !noChange ? (
            <CheckFailText />
          ) : (
            <CheckNoActionText />
          )}
        </FormModalWrapper>
      </ModalBackground>
    );
  } else {
    return null;
  }
};

export default observer(FormModalUpdateAccount);
