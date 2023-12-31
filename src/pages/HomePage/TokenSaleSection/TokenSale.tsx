import React from "react";
import { Button, Progress } from "@material-tailwind/react";
import { useAccount, useDisconnect, useSwitchNetwork, useNetwork } from "wagmi";
import { Icon } from "@iconify/react";
import { useWeb3Modal } from "@web3modal/react";
import SectionTitleSash1 from "../../../components/SectionTitleSash1";
import { CHAIN_ID, CURRENCY_GWIZ_TO_BUSDT, TOKEN_CLAIM_APPROVED } from "../../../utils/constants";
import { IClaimableTokenInfo, ITokenAmountInfo } from "../../../utils/interfaces";

/* ----------------------------------------------------------- */

interface IProps {
  handleDialogBnbOpened: Function;
  handleDialogBusdtOpened: Function;
  handleDialogTokenClaimOpened: Function;
  balanceInUsd: number;
  tokenAmountInfo: ITokenAmountInfo;
  tokenClaimStopped: boolean;
  claimableTokenInfo: IClaimableTokenInfo
}

/* ----------------------------------------------------------- */

export default function TokenSale({
  handleDialogBnbOpened,
  handleDialogBusdtOpened,
  handleDialogTokenClaimOpened,
  balanceInUsd,
  tokenAmountInfo,
  tokenClaimStopped,
  claimableTokenInfo
}: IProps) {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()

  return (
    <div className="bg-primary py-16 px-6 lg:px-0">
      <div className="container max-w-xl mx-auto flex flex-col items-center gap-8">
        <h2 className="text-3xl lg:text-4xl font-black text-center text-white uppercase leading-snug">
          Presale Stage 1
        </h2>
        <SectionTitleSash1 />
        {/* <p className="text-center text-base lg:text-xl text-white capitalize tracking-wider">
          <span className="font-black text-xl lg:text-2xl">0</span> Days <span className="font-black text-xl lg:text-2xl">9</span> hours <span className="font-black text-xl lg:text-2xl">40</span> minutes <span className="font-black text-xl lg:text-2xl">50</span> seconds remaining until presale phase 3 ends
        </p> */}
        {/* <div className="border-white border-2 rounded-xl py-2 px-6 text-white">
          <p>First CEX Launch Will Go Live On Friday 31st March 2023</p>
        </div> */}
        {!TOKEN_CLAIM_APPROVED && (
          <>
            <div className="flex flex-col gap-2 text-white">
              <p className="text-center">1 GWIZ = {CURRENCY_GWIZ_TO_BUSDT} BUSDT</p>
              <p className="text-center">BUSDT Raised ${balanceInUsd.toFixed(4)}</p>
            </div>

            {/* Progress bar */}
            <Progress
              value={tokenAmountInfo.claimedTokenAmount / tokenAmountInfo.totalTokenAmount * 100}
              className="h-3 rounded-lg"
              barProps={{
                className: 'bg-secondary h-3 rounded-lg'
              }}
            />

            <div className="flex flex-col gap-2 text-white">
              <p className="text-center">
                {tokenAmountInfo.totalTokenAmount - tokenAmountInfo.claimedTokenAmount} Tokens Remaining Until<br />
                1 GWIZ = {CURRENCY_GWIZ_TO_BUSDT} BUSDT
              </p>
            </div>
          </>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {isConnected ? (
            <>
              {chain?.id === CHAIN_ID ? TOKEN_CLAIM_APPROVED ? (
                <Button
                  className="bg-darkPrimary hover:bg-darkPrimary rounded-none text-white text-lg capitalize flex items-center gap-2"
                  disabled={claimableTokenInfo.claimableTokenAmount <= 0}
                  onClick={() => handleDialogTokenClaimOpened()}
                >Claim GWIZ</Button>
              ) : (
                <>
                  <Button
                    className="bg-darkPrimary hover:bg-darkPrimary rounded-none text-white text-lg capitalize flex items-center gap-2"
                    disabled={tokenClaimStopped}
                    onClick={() => handleDialogBnbOpened()}
                  >
                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024" alt="BNB" className="w-6" />
                    Buy with BNB
                  </Button>
                  <Button
                    className="bg-darkPrimary hover:bg-darkPrimary rounded-none text-white text-lg capitalize flex items-center gap-2"
                    disabled={tokenClaimStopped}
                    onClick={() => handleDialogBusdtOpened()}
                  >
                    <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=024" alt="BUSDT" className="w-6" />
                    Buy with BUSDT
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="bg-secondary hover:bg-secondary rounded-none text-white text-lg capitalize flex items-center gap-2"
                    disabled={!switchNetwork}
                    onClick={() => switchNetwork?.(CHAIN_ID)}
                  >
                    Switch to BSC
                  </Button>
                </>
              )}
              <Button
                className="bg-secondary hover:bg-secondary rounded-none text-white text-lg capitalize flex items-center gap-2"
                onClick={() => disconnect()}
              >
                <Icon icon="wpf:disconnected" className="text-xl text-white" />
                Disconnect
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-secondary hover:bg-secondary rounded-none text-white text-lg capitalize"
                onClick={() => open()}
              >
                Connect Wallet
              </Button>
              {/* <Web3Button label="Connect Wallet" avatar="show" balance="show" icon="show" /> */}
              <Button className="bg-darkPrimary hover:bg-darkPrimary rounded-none text-white text-lg capitalize">
                Whitepaper
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}