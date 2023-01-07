import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { nftaddress, nftmarketaddress } from '../config'
import mintToken from '../styles/img/mint-token.png'
import Image from 'next/image'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/UFOMarket.sol/UFOMarket.json'
import { useRouter } from 'next/router'

// in this component we set the ipfs up to host our nft data of file storage
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function MintItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [fromInput, updateFromInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    // set up a function to fireoff when we update files in our form - we can add our
    // nft image - ipfs
    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file, {
                progress: (prog) =>
                    console.log(`received: ${prog}`)
            }
            )
            const url = `https://ipfs.infura.io:5001/api/v0/${added.path}`
            setFileUrl(url)
        } catch (error) { console.log('error uploading file: ', error) }
    }

    async function createMainMarket(){
        const {name, description,price} = fromInput
        if (!name || !description || !price || fileUrl) return
        // uploading to ipfs
        const data = JSON.stringify({
            name,description,image: fileUrl
        })
        try{
            const added = await client.add(data)
            const url = `https://ipfs.infura.io:5001/api/v0/${added.path} `
            // run a function that create sale and passes in the url
            createSale (url)   
        }catch (error)
        {
            console.log('error uploading file: ', error)
        }
    }

    async function createSale(url) {
        // create the items and list them on the marketplace
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        // we want to create the token
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.mintToken(url)
        let tx = await transaction.wait()
        let event = tx.event[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(fromInput.price, 'ether')

        // list this nft on market place
        contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.makeMarketItem(nftaddress, tokenId, price, { value: listingPrice })
        await transaction.wait()
        router.push('./')
    }

    return (
        <dev className='from--container'>
            <dev className='form--main'>
                <div class="group">
                    <input type="text" required onChange={e => updateFromInput({ ...fromInput, name: e.target.value })} />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Asset Name</label>
                </div>

                <div class="group">
                    <input type="text" required onChange={e => updateFromInput({ ...fromInput, description: e.target.value })} />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Asset Description</label>
                </div>
                <div class="group">
                    <input type="text" required onChange={e => updateFromInput({ ...fromInput, price: e.target.value })} />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Asset Price (eth)</label>
                </div>
                <div class="group">
                    <input type="file" name='Asset' onChange={onChange} id="fileInput" required />
                </div>
                {fileUrl && (
                    <img className='img--chose' alt="nft url on ipfs" width="500" height="600" src={fileUrl} />
                )}
                <button onClick={createMainMarket} className='btn-mint'>
                    Mint NFT
                </button>
            </dev>
        </dev >)
}

