from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import pandas as pd
import talib
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BINANCE_ENDPOINT = "https://api.binance.com/api/v3/klines"

# List of coins you want to track
COINS = [
    "BNBUSDT", "BTCUSDT", "ETHUSDT", "XRPUSDT", "LTCUSDT", 
    "ADAUSDT", "SOLUSDT", "DOGEUSDT", "MATICUSDT", "DOTUSDT"
]

@app.get("/signals")
def get_signals():
    signals = {}
    
    for coin in COINS:
        params = {
            "symbol": coin,
            "interval": "15m",  # 15 minutes interval
            "limit": 100
        }
        res = requests.get(BINANCE_ENDPOINT, params=params)
        data = res.json()

        df = pd.DataFrame(data, columns=[
            "timestamp", "open", "high", "low", "close", "volume",
            "close_time", "quote_asset_volume", "number_of_trades",
            "taker_buy_base_vol", "taker_buy_quote_vol", "ignore"])

        df["close"] = pd.to_numeric(df["close"])
        df["timestamp"] = pd.to_datetime(df["timestamp"], unit='ms')

        df["ema20"] = talib.EMA(df["close"], timeperiod=20)
        df["ema50"] = talib.EMA(df["close"], timeperiod=50)
        df["rsi"] = talib.RSI(df["close"], timeperiod=14)
        macd, signal, _ = talib.MACD(df["close"], fastperiod=12, slowperiod=26, signalperiod=9)
        df["macd"] = macd
        df["macd_signal"] = signal

        latest = df.iloc[-1]

        action = "Hold"
        if latest["macd"] > latest["macd_signal"] and latest["ema20"] > latest["ema50"] and latest["rsi"] < 70:
            action = "Buy"
        elif latest["macd"] < latest["macd_signal"] and latest["ema20"] < latest["ema50"] and latest["rsi"] > 30:
            action = "Sell"

        signals[coin] = {
            "time": latest["timestamp"],
            "price": latest["close"],
            "signal": action,
            "ema20": latest["ema20"],
            "ema50": latest["ema50"],
            "rsi": latest["rsi"],
            "macd": latest["macd"],
            "macd_signal": latest["macd_signal"]
        }

    return signals
