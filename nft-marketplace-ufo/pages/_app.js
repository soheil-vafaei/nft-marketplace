import "../styles/app.css"
import "../styles/planet.css"
import Link from 'next/link'
import Image from 'next/image'
import ufoI from '../styles/img/ufoI.png'
import ufoName from '../styles/img/ufo.png'
import '../styles/index.css'
import '../styles/mint-token.css'
import Head from 'next/head'

function UFOMarketplace({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>UFO</title>
        <meta name="description" content="ufo marketplace nft" />
        <link rel="icon" type="image/png" href={ufoI} />
      </Head>
      <dev className="main">
        <dev className="header--fix">
          <dev className="header--main">
            <a href="/"><Image className="ml-10" src={ufoI} alt="me" width="64" height="64" /></a>
            <a href="/"><Image className="icon-name--header" src={ufoName} alt="me" width="100" height="100" /></a>
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
        <dev className="dev--main">
          <div className="main--planet">
            <h1 ></h1>
            <div className="ufo">
              <div className="upper-part"></div>
              <div className="mainpart"></div>
            </div>
            <div className="planet">
              <div className="white-circle"></div>
              <div className="c1"></div>
              <div className="c2"></div>
              <div className="c3"></div>
              <div className="c4"></div>
              <div className="c5"></div>
              <div className="c6"></div>
            </div>
          </div>

        </dev>
      </dev>
      <Component {...pageProps} />
    </>
  )
}

export default UFOMarketplace