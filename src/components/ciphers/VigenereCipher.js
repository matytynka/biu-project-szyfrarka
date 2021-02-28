import React, {useState} from "react";
import SaveFile from "../../scripts/SaveFile";
import LoadFileAsText from "../../scripts/LoadFileAsText";
import CopyToClipboard from "../../scripts/CopyToClipboard";
import LoadFromTwitter from "../../scripts/LoadFromTwitter";

export default function VigenereCipher() {

    const [message, setMessage] = useState("");
    const [cipher, setCipher] = useState("");
    const [key, setKey] = useState("");

    function encryptToVigenere(e) {

        e.preventDefault();

        let keyArray = filterKey(key);
        document.getElementById("toVigenere").innerHTML = crypt(keyArray, message);
    }

    function decryptFromVigenere(e) {

        e.preventDefault();

        let keyArray = filterKey(key);
        for (let i = 0; i < keyArray.length; i++) {
            keyArray[i] = (26 - keyArray[i]) % 26;
        }
        document.getElementById("fromVigenere").innerHTML = crypt(keyArray, cipher);
    }

    function crypt(keyArray, input) {
        let output = "";
        for (let i = 0, j = 0; i < input.length; i++) {
            let c = input.charCodeAt(i);
            if (isUppercase(c)) {
                output += String.fromCharCode((c - 65 + keyArray[j % keyArray.length]) % 26 + 65);
                j++;
            } else if (isLowercase(c)) {
                output += String.fromCharCode((c - 97 + keyArray[j % keyArray.length]) % 26 + 97);
                j++;
            } else {
                output += input.charAt(i);
            }
        }
        return output;
    }

    function filterKey(key) {
        let result = [];
        for (let i = 0; i < key.length; i++) {
            let c = key.charCodeAt(i);
            if (isLetter(c))
                result.push((c - 65) % 32);
        }
        return result;
    }

    function isUppercase(c) {
        return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
    }

    function isLowercase(c) {
        return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
    }

    function isLetter(c) {
        return isUppercase(c) || isLowercase(c);
    }

    return(
        <div id="content">
            <h2>Szyfr Vigenère'a</h2>
            <form id="myKey">
                <h4>
                Wybierz klucz:&nbsp;
                <input type="text" placeholder="Klucz tekstowy" value={key} required onChange={
                (e) => setKey(e.target.value)
                }/>
                </h4>
            </form><br/>

            <div className="row">
                <div className="column">
                    <h3>Zaszyfruj</h3>
                    <form onSubmit={encryptToVigenere}>
                        Wiadomość:<br/>
                        <textarea cols="50" rows="10" placeholder="Wpisz swoją wiadomość" className="myInput" value={message} required onChange={
                            (e) => setMessage(e.target.value)
                        }>text</textarea><br/>
                        <input className="changeBtn" type="submit" value="Zamień"/>
                    </form><br/>

                    <div className="loadDiv">
                        Lub załaduj wiadomość z pliku:&nbsp;
                        <input type="file" id="messageToLoad"/><br/>
                        <button className="loadBtn" onClick={() => LoadFileAsText("messageToLoad", setMessage)}>Załaduj</button><br/><br/>

                        Lub załaduj z Twittera:&nbsp;
                        <input type="text" id="messageFromTweet" placeholder="Link do tweeta"/>&nbsp;
                        <button className="loadBtn" onClick={() => LoadFromTwitter("messageFromTweet", setMessage)}>Załaduj</button><br/><br/>
                    </div>

                    Zaszyfrowana wiadomość:<br/>
                    <textarea cols="50" rows="10" readOnly={true} id="toVigenere"></textarea><br/>

                    <button className="saveBtn" onClick={() => CopyToClipboard("toVigenere")}>Skopiuj do schowka</button>&nbsp;
                    <button className="saveBtn" onClick={() => SaveFile("toVigenere")}>Zapisz do pliku .txt</button><br/><br/>
                </div>

                <div className="column">
                    <h3>Odszyfruj</h3>
                    <form onSubmit={decryptFromVigenere}>
                        Szyfr:<br/>
                        <textarea cols="50" rows="10" placeholder="Wpisz swój szyfr" className="myInput" value={cipher} required onChange={
                            (e) => setCipher(e.target.value)
                        }>text</textarea><br/>
                        <input className="changeBtn" type="submit" value="Zamień"/>
                    </form><br/>

                    <div className="loadDiv">
                        Lub załaduj szyfr z pliku:&nbsp;
                        <input type="file" id="cipherToLoad"/><br/>
                        <button className="loadBtn" onClick={() => LoadFileAsText("cipherToLoad", setCipher)}>Załaduj</button><br/><br/>

                        Lub załaduj z Twittera:&nbsp;
                        <input type="text" id="cipherFromTweet" placeholder="Link do tweeta"/>&nbsp;
                        <button className="loadBtn" onClick={() => LoadFromTwitter("cipherFromTweet", setCipher)}>Załaduj</button><br/><br/>
                    </div>

                    Odszyfrowana wiadomość:<br/>
                    <textarea cols="50" rows="10" readOnly={true} id="fromVigenere"></textarea><br/>

                    <button className="saveBtn" onClick={() => CopyToClipboard("fromVigenere")}>Skopiuj do schowka</button>&nbsp;
                    <button className="saveBtn" onClick={() => SaveFile("fromVigenere")}>Zapisz do pliku .txt</button>
                </div>
            </div>
        </div>
    )
}