import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { nftaddress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/UFOMarket.sol/UFOMarket.json'
import { useRouter } from 'next/router'

// in this component we set the ipfs up to host our nft data of file storage
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0/')

export default function MintItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [fromInput, updateFromInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    // set up a function to fireoff when we update files in our form - we can add our
    // nft image - ipfs
    async function onChange(e) {
        const file = e.target.files[0]
        try{
            const added = await client.add(
                file, {
                progress: (prog) =>
                    console.log(`received: ${prog}`)
            }
            )
            const url = `https://ipfs.infura.io:5001/api/v0/${added.path}`
            setFileUrl(url)
        }catch(error){console.log('error uploading file: ',error)}

        async function createMarket(){
            const {name, description, price} = formInput
            if(!name || !description || !price || !fileUrl) return 
            // upload in ipfs
            const data = JSON.stringify({
                name, discription, image: fileUrl
            })
            try{
                const added = await client.add(data)
                const url = `https://ipfs.infura.io:5001/api/v0/${added.path}`
                // run a function that create sale and passes in the url
                createSale(url)
            }catch(error){console.log('error uploading file: ',error)}
        }
    }
}