from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pandas as pd

from datetime import datetime

app = Flask(__name__)
CORS(app)

BINANCE_ENDPOINT = "https://api.binance.com/api/v3/klines"

COINS = [
    "BNBUSDT", "BTCUSDT", "ETHUSDT", "XRPUSDT", "LTCUSDT", 
    "ADAUSDT", "SOLUSDT", "DOGEUSDT", "MATICUSDT", "DOTUSDT"
]

def fetch_price_data(symbol, interval="15m", limit=100):
    params = {
        "symbol": symbol,
        "interval": interval,
        "limit": limit
    }
    res = requests.get(BINANCE_ENDPOINT, params=params)
    data = res.json()

    df = pd.DataFrame(data, columns=[
        "timestamp", "open", "high", "low", "close", "volume",
        "close_time", "quote_asset_volume", "number_of_trades",
        "taker_buy_base_vol", "taker_buy_quote_vol", "ignore"])
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    df.set_index("timestamp", inplace=True)
    df["close"] = pd.to_numeric(df["close"])
    return df[["close"]]

@app.route("/signals", methods=["GET"])
def get_signals():
    signals = {}

    for coin in COINS:
        try:
            df = fetch_price_data(coin)

            # Create EMAs and MACD using pandas
            df["ema20"] = df["close"].ewm(span=20).mean()
            df["ema50"] = df["close"].ewm(span=50).mean()
            df["macd"] = df["close"].ewm(span=12).mean() - df["close"].ewm(span=26).mean()
            df["macd_signal"] = df["macd"].ewm(span=9).mean()
            delta = df["close"].diff()
            gain = delta.clip(lower=0)
            loss = -delta.clip(upper=0)
            avg_gain = gain.rolling(window=14).mean()
            avg_loss = loss.rolling(window=14).mean()
            rs = avg_gain / avg_loss
            df["rsi"] = 100 - (100 / (1 + rs))

            latest = df.iloc[-1]

            # Strategy Signal
            action = "Hold"
            if latest["macd"] > latest["macd_signal"] and latest["ema20"] > latest["ema50"] and latest["rsi"] < 70:
                action = "Buy"
            elif latest["macd"] < latest["macd_signal"] and latest["ema20"] < latest["ema50"] and latest["rsi"] > 30:
                action = "Sell"

            # Optional: use bt for backtest or combine signals
            # (not implemented in API here, but possible)

            signals[coin] = {
                "time": latest.name.isoformat(),
                "price": latest["close"],
                "signal": action,
                "ema20": round(latest["ema20"], 4),
                "ema50": round(latest["ema50"], 4),
                "rsi": round(latest["rsi"], 2),
                "macd": round(latest["macd"], 4),
                "macd_signal": round(latest["macd_signal"], 4)
            }

        except Exception as e:
            signals[coin] = {"error": str(e)}



    return jsonify(signals)
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=7860, debug=True)
