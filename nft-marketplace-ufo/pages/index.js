import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Head from 'next/head'
import { nftaddress, nftmarketaddress } from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import UFOMarket from '../artifacts/contracts/UFOMarket.sol/UFOMarket.json'
import UFOMarketplace from './_app'

export default function Home() {
  const [nfts, setnfts] = useState([])
  const [loading, setloading] = useState('not loaded')

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress,NFT.abi,provider)
    const marketContract = new ethers.Contract(nftmarketaddress,UFOMarket.abi,provider)
    const data = await marketContract.fetchMarkeTokens()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = 
      {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        discription: meta.data.discription
      }
      return item
    }))
    setnfts(items)
    setloading('loaded')
  }

  async function buyNFT(nft){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress,UFOMarket.abi,signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress,nft.tokenId,{
      value:price
    })

    await transaction.wait()
    loadNFTs()
  }

  return (
    <dev>
      <Head>
        <title>UFO</title>
      </Head>
    </dev>
  )
}
