import "../styles/app.css"
import Link from 'next/link'
import Image from 'next/image'
import ufoI from './ufoI.png'
import ufoName from './ufo.png'

function UFOMarketplace({ Component, pageProps }) {
  return (
    <>
      <dev className="main">
        <dev className="header--fix">
          <dev className="header--main">
            <Image src={ufoI} alt="me" width="64" height="64" />
            <Image className="icon-name--header" src={ufoName} alt="me" width="100" height="100" />
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
      </dev>
      <Component {...pageProps} />
    </>
  )
}

export default UFOMarketplace