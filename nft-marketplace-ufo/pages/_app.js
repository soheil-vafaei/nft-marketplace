import "../styles/app.css"
import Link from 'next/link'
import Image from 'next/image'
import ufoI from './ufoI.png'

function UFOMarketplace({ Component, pageProps }) {
  return (
    <>
      <dev className="header--fix">
        <dev className="header--main">
          <Image src={ufoI} alt="me" width="64" height="64" />
          <dev className="header--d">
            <nav className="header--main">
              <Link className="link--headers" href="/">MAIN MARKETPLACE</Link>
              <Link className="link--headers" href="/mint-token">MINT TOKEN</Link>
              <Link className="link--headers" href="/my-nfts">MY NFTs</Link>
              <Link className="link--headers" href="/account-dashboard">ACCOUNT DASHBOARD</Link>
            </nav>
          </dev>
        </dev>
      </dev>
      <Component {...pageProps} />
    </>
  )
}

export default UFOMarketplace