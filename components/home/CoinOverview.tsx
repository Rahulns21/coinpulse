import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import CandleStickChart from "../CandleStickChart";

const CoinOverview = async () => {
  const [coin, coinOHLCData] = await Promise.all([
    fetcher<CoinDetailsData>("/coins/bitcoin", {
      dex_pair_format: "symbol",
    }),
    fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
      vs_currency: "usd",
      days: 1,
      precision: "full",
    }),
  ]);

  const formattedCurrency = formatCurrency(
    coin.market_data.current_price.usd
  );

  return (
    <div id="coin-overview">
      <CandleStickChart data={coinOHLCData} coinId="bitcoin">

      <div className="header pt-2">
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={56}
          height={56}
        />
        <div className="info">
          <p>{coin.name}</p>
          <h1>{formattedCurrency}</h1>
        </div>
      </div>
      </CandleStickChart>

    </div>
  );
};

export default CoinOverview;