import '../styles/globals.css'
import Link from 'next/link'

function UFOMarketplace({Component, pageProps})
{
  return(
    <dev className='border-b p-6 bgcPurple'>
      <nav>
        <p className='test-4x1 font-bold text-white'>UFO Marketplace</p>
        <dev className='justifyCen'>
          <Link id='link' href='/'>
              Main MarketPlace |
          </Link>
          <Link id='link' href='/mint-item'>
            mint tokens |
          </Link>
          <Link id='link' href='/nfts'>
            my nfts |
          </Link>
          <Link href='/account-dash'>
            account dashboard 
          </Link>
        </dev>
      </nav>
      <Component {...pageProps}/>
    </dev>
  )
}

export default UFOMarketplace