import React, {useState} from "react";
import SaveFile from "../../scripts/SaveFile";
import LoadFileAsText from "../../scripts/LoadFileAsText";
import LoadFromTwitter from "../../scripts/LoadFromTwitter";
import CopyToClipboard from "../../scripts/CopyToClipboard";

export default function MorseCode() {

    const [message, setMessage] = useState("");
    const [cipher, setCipher] = useState("");

    let alphabet = {
        "-----": "0",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        ".-": "a",
        "-...": "b",
        "-.-.": "c",
        "-..": "d",
        ".": "e",
        "..-.": "f",
        "--.": "g",
        "....": "h",
        "..": "i",
        ".---": "j",
        "-.-": "k",
        ".-..": "l",
        "--": "m",
        "-.": "n",
        "---": "o",
        ".--.": "p",
        "--.-": "q",
        ".-.": "r",
        "...": "s",
        "-": "t",
        "..-": "u",
        "...-": "v",
        ".--": "w",
        "-..-": "x",
        "-.--": "y",
        "--..": "z",
        "..--..": "?",
        "-.-.--": "!",
        ".-.-.-": ".",
        "--..--": ",",
        ".----.": "'",
        "-..-.": "/",
        "---...": ":",
        "-.-.-.": ";",
        "-...-": "=",
        ".-.-.": "+",
        "-....-": "-",
        ".-..-.": "\"",
        "...-..-": "$",
        ".--.-.": "@"
    };

    function decryptFromMorse(e) {

        e.preventDefault();

        let word = cipher; //ex. .--. .. .-- ---

        let wordConverted = [];

        word.split("     ").map(function (word) {
            word.split(" ").map(function (letter) {
                wordConverted.push(alphabet[letter]);
            });
            wordConverted.push(" ");
        });
        word = wordConverted.join("");
        console.log(word);
        document.getElementById("fromMorse").innerHTML = word;
    }

    function encryptToMorse(e) {

        e.preventDefault();

        let word = message;

        let wordConverted = [];

        word.split(" ").map(function (word) {
            word.split("").map(function (letter) {
                wordConverted.push(Object.keys(alphabet).find(key => alphabet[key] === letter));
            });
            wordConverted.push("   ");
        });
        word = wordConverted.join(" ");
        console.log(word);
        document.getElementById("toMorse").innerHTML = word;
    }

    return (
        <div id="content">
            <h2>Kod Morse'a</h2>
            <div className="row">
                <div className="column">
                    <h3>Zaszyfruj</h3>
                    <form onSubmit={encryptToMorse}>
                        Wiadomość:<br/>
                        <textarea cols="50" rows="10" placeholder="Wpisz swoją wiadomość" className="myInput"
                                  value={message} required onChange={
                            (e) => setMessage((e.target.value).toLowerCase())
                        }>text</textarea><br/>
                        <input className="changeBtn" type="submit" value="Zamień"/>
                    </form><br/>

                    <div className="loadDiv">
                        Lub załaduj wiadomość z pliku:&nbsp;
                        <input type="file" id="messageToLoadLow"/><br/>
                        <button className="loadBtn" onClick={() => LoadFileAsText("messageToLoadLow", setMessage)}>Załaduj</button><br/><br/>

                        Lub załaduj z Twittera:&nbsp;
                        <input type="text" id="messageFromTweetLow" placeholder="Link do tweeta"/>&nbsp;
                        <button className="loadBtn" onClick={() => LoadFromTwitter("messageFromTweetLow", setMessage)}>Załaduj</button><br/><br/>
                    </div>

                    Zaszyfrowana wiadomość:<br/>
                    <textarea cols="50" rows="10" readOnly={true} id="toMorse"></textarea><br/>

                    <button className="saveBtn" onClick={() => CopyToClipboard("toMorse")}>Skopiuj do schowka</button>&nbsp;
                    <button className="saveBtn" onClick={() => SaveFile("toMorse")}>Zapisz do pliku .txt</button><br/>
                </div>

                <div className="column">
                    <h3>Odszyfruj</h3>
                    <form onSubmit={decryptFromMorse}>
                        Szyfr:<br/>
                        <textarea cols="50" rows="10" placeholder="Wpisz swój szyfr" className="myInput" value={cipher}
                                  required onChange={
                            (e) => setCipher((e.target.value).toLowerCase())
                        }>text</textarea><br/>
                        <input className="changeBtn" type="submit" value="Zamień"/>
                    </form><br/>

                    <div className="loadDiv">
                        Lub załaduj szyfr z pliku:&nbsp;
                        <input type="file" id="cipherToLoadLow"/><br/>
                        <button className="loadBtn" onClick={() => LoadFileAsText("cipherToLoadLow", setCipher)}>Załaduj</button><br/><br/>

                        Lub załaduj z Twittera:&nbsp;
                        <input type="text" id="cipherFromTweetLow" placeholder="Link do tweeta"/>&nbsp;
                        <button className="loadBtn" onClick={() => LoadFromTwitter("cipherFromTweetLow", setCipher)}>Załaduj</button><br/><br/>
                    </div>

                    Odszyfrowana wiadmość:<br/>
                    <textarea cols="50" rows="10" readOnly={true} id="fromMorse"></textarea><br/>

                    <button className="saveBtn" onClick={() => CopyToClipboard("fromMorse")}>Skopiuj do schowka</button>&nbsp;
                    <button className="saveBtn" onClick={() => SaveFile("fromMorse")}>Zapisz do pliku .txt</button>
                </div>
            </div>
        </div>
    )
}