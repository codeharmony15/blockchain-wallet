import { curry, lift } from 'ramda'

import { ExtractSuccess } from '@core/types'
import { RootState } from 'data/rootReducer'

export const getPaymentsAccountExchange = curry((currency: string, state: RootState) => {
  return state.components.send.exchangePaymentsAccount[currency]?.map((x) => x.address)
})

export const getPaymentsTradingAccountAddress = curry((currency: string, state: RootState) => {
  return state.components.send.tradingPaymentsAccount[currency]?.map((x) => {
    // commenting this out for now, we don't want to use
    // agent address until we properly implement memo
    // if (x.agent?.address) {
    //   return x.agent.address
    // }
    return x.address
  })
})

export const getUnstoppableDomainResults = (state: RootState) =>
  state.components.send.unstoppableDomainResults

export const getWithdrawLockCheck = (state: RootState) => state.components.send.withdrawLockCheck

export const getWithdrawLockCheckRule = (state: RootState) => {
  const lockCheckR = getWithdrawLockCheck(state)

  return lift((lockCheck: ExtractSuccess<typeof lockCheckR>) => lockCheck.rule)(lockCheckR)
}
