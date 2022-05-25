import React, { useState } from 'react';

import { AnchorWallet } from '@solana/wallet-adapter-react';
import { CancelModal } from '../CancelModal';
import { LiqImage } from '../LiqImage';
import { SellModal } from '../SellModal';

import { SingleTokenInfo, CandyShop } from '@liqnft/candy-shop-sdk';
import { Order as OrderSchema, CandyShop as CandyShopResponse } from '@liqnft/candy-shop-types';

import './index.css';
import { getExchangeInfo } from '../../utils/getExchangeInfo';

export interface NftProps {
  nft: SingleTokenInfo;
  wallet: AnchorWallet;
  sellDetail?: OrderSchema;
  shop: CandyShopResponse;
  candyShop: CandyShop;
}

export const Nft = ({ nft, wallet, sellDetail, shop, candyShop }: NftProps): JSX.Element => {
  const [selection, setSelection] = useState<SingleTokenInfo | undefined>();

  const onClose = () => {
    setSelection(undefined);
  };

  const onClick = () => {
    setSelection(nft);
  };

  const isSellItem = Boolean(sellDetail);
  const exchangeInfo = sellDetail
    ? getExchangeInfo(sellDetail, candyShop)
    : {
        symbol: candyShop.currencySymbol,
        decimals: candyShop.currencyDecimals
      };

  return (
    <>
      <div className="candy-card-border candy-nft-card">
        {isSellItem && <div className="candy-status-tag">Listed for Sale</div>}
        <div onClick={onClick}>
          <LiqImage
              src={nft?.nftImage}
              alt={nft?.metadata?.data?.name}
              fit="cover"
              style={{ borderTopRightRadius: 14, borderTopLeftRadius: 14 }}

          />
        </div>
        <div className="candy-nft-info">
          <div className="name">{nft?.metadata?.data?.name}</div>
          <div className="ticker">{nft?.metadata?.data?.symbol}</div>
        </div>
      </div>

      {selection && !isSellItem && (
        <SellModal onCancel={onClose} nft={selection} wallet={wallet} shop={shop} candyShop={candyShop} />
      )}

      {selection && sellDetail ? (
        <CancelModal
          onClose={onClose}
          order={sellDetail}
          wallet={wallet}
          candyShop={candyShop}
          exchangeInfo={exchangeInfo}
        />
      ) : null}
    </>
  );
};
