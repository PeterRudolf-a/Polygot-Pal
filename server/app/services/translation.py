import os
import requests

def translate_text(text, source_lang, target_lang):
    api_key = os.getenv("MYMEMORY_API_KEY")
    url = f"https://api.mymemory.translated.net/get?q={text}&langpair={source_lang}|{target_lang}&key={api_key}"

    response = requests.get(url)
    data = response.json()

    if "responseData" not in data or "translatedText" not in data["responseData"]:
        raise Exception("Invalid response from translation API")

    return {
        "translated_text": data["responseData"]["translatedText"],
        "match": data.get("responseData", {}).get("match", None),  # Use .get to avoid crash
        "source": source_lang,
        "target": target_lang
    }
