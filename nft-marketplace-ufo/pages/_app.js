import "../styles/app.css"
import Link from 'next/link'

function UFOMarketplace({ Component, pageProps }) {
  return (
    <>

      <dev className="header--fix">
        <h1 className="name--market ">UFO MARKETPLACE</h1>
        <dev className="header--d">
          <nav className="header--main">
            <Link className="link--headers" href="/">MAIN MARKETPLACE</Link>
            <Link className="link--headers" href="/mint-token">MINT TOKEN</Link>
            <Link className="link--headers" href="/my-nfts">MY NFTs</Link>
            <Link className="link--headers am-0" href="/account-dashboard">ACCOUNT DASHBOARD</Link>
          </nav>
        </dev>
      </dev>
      <Component {...pageProps} />
    </>
  )
}

export default UFOMarketplace