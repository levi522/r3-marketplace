import React, { useState } from 'react';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Modal } from '../Modal';
import { Processing } from '../Processing';

import { CandyShop } from '@liqnft/candy-shop-sdk';
import { ShopExchangeInfo, TransactionState } from '../../model';
import { Order as OrderSchema } from '@liqnft/candy-shop-types';
import { CancelModalConfirm } from './CancelModalConfirm';
import { CancelModalDetail } from './CancelModalDetail';

import './index.css';

export interface CancelModalProps {
  order: OrderSchema;
  onClose: any;
  wallet: AnchorWallet;
  candyShop: CandyShop;
  exchangeInfo: ShopExchangeInfo;
}

export const CancelModal: React.FC<CancelModalProps> = ({
  order,
  onClose: onUnSelectItem,
  wallet,
  candyShop,
  exchangeInfo
}) => {
  const [state, setState] = useState<TransactionState>(TransactionState.DISPLAY);

  // Handle change step
  const onChangeStep = (state: TransactionState) => setState(state);

  const onCloseModal = () => {
    onUnSelectItem();
  };

  return (
    <Modal onCancel={onCloseModal} width={state !== TransactionState.DISPLAY ? 600 : 1000}>
      {state === TransactionState.DISPLAY && wallet && (
        <CancelModalDetail
          onCancel={onUnSelectItem}
          order={order}
          onChangeStep={onChangeStep}
          wallet={wallet}
          candyShop={candyShop}
          exchangeInfo={exchangeInfo}
        />
      )}
      {state === TransactionState.PROCESSING && <Processing text="Canceling your sale" />}
      {state === TransactionState.CONFIRMED && <CancelModalConfirm order={order} onCancel={onCloseModal} />}
    </Modal>
  );
};
