import { ethers } from 'hardhat'

import * as dotenv from 'dotenv'
import {ContractReceipt} from 'ethers'
import {EventsExample, EventsExample__factory} from '../typechain-types'

const parseTxReceipt = (tx: ContractReceipt) => {
  const price = tx.gasUsed.toBigInt() * tx.effectiveGasPrice.toBigInt()
  const events = (tx.events || []).map(event => `${event.event}: [${(event.args || []).map(arg => JSON.stringify(arg))}]`)
  return {
    get tx() {return tx},
    from: tx.from,
    to: tx.to,
    price,
    priceParsed: ethers.utils.formatEther(price),
    events,
  }
}

async function main() {
  ///////////////////////////////////////////////
  // prepare
  ///////////////////////////////////////////////

  dotenv.config()

  const PRIVATE_KEY = process.env.PRIVATE_KEY as string
  if (typeof PRIVATE_KEY !== 'string') {
    throw new Error(`PRIVATE_KEY should be string`)
  }

  console.log(await ethers.provider.getNetwork())
  console.log(`Head block number is: ${await ethers.provider.getBlockNumber()}`)
  const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider)

  ///////////////////////////////////////////////
  // deploy smart contract or get existing one
  ///////////////////////////////////////////////

  let contract: EventsExample

  const existingContractAddress = process.env.EXISTINT_EVENT_EXAMPLES_SMART_CONTRACT_ADDRESS

  if (!existingContractAddress || !ethers.utils.getAddress(existingContractAddress)) {
    const EventsExampleDeployer = await ethers.getContractFactory("EventsExample", wallet)
    // const ot = OverloadTests__factory.connect('0x2Ad8aD47B905c52fAa191f37a23DA005CeB1C662', wallet)
    contract = await EventsExampleDeployer.deploy()
    await contract.deployed()

    console.log(`SMART CONTRACT IS DEPLOYED AND ITS ADDRESS IS ${contract.address}`)
  } else {
    contract = await EventsExample__factory.connect(existingContractAddress, wallet)
    console.log(`SMART CONTRACT IS CONNECTED AND ITS ADDRESS IS ${contract.address}`)
  }

  ///////////////////////////////////////////////////////
  // call some methods from the deployed smart contract
  ///////////////////////////////////////////////////////

  const tx = await contract.f1()
  const result = await tx.wait()
  const txReceipt = parseTxReceipt(result)
  console.log('"f1()"', txReceipt)

  // same processing, but in one-line notation

  // console.log('"f2(address)"', parseTxReceipt(await (await contract.f2(wallet.address)).wait()))
  // console.log('"f3(uint256)"', parseTxReceipt(await (await contract.f3(12345)).wait()))
  // console.log('"f4(address,uint256)"', parseTxReceipt(await (await contract.f4(wallet.address, 12345)).wait()))
  // console.log('"f5(uint256,address)"', parseTxReceipt(await (await contract.f5(12345, wallet.address)).wait()))
  // console.log('"f6(uint256,address,uint256)"', parseTxReceipt(await (await contract.f6(333, wallet.address, 12345)).wait()))
  // console.log('"f7(uint256,uint256,address)"', parseTxReceipt(await (await contract.f7(333, 12345, wallet.address)).wait()))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
