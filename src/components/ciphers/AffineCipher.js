import React, {useState} from "react";
import SaveFile from "../../scripts/SaveFile";
import LoadFileAsText from "../../scripts/LoadFileAsText";
import CopyToClipboard from "../../scripts/CopyToClipboard";
import LoadFromTwitter from "../../scripts/LoadFromTwitter";

export default function AffineCipher() {

    let alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']; //26 letters

    const [keyA, setKeyA] = useState(0);
    const [keyB, setKeyB] = useState(0);
    const [message, setMessage] = useState("");
    const [cipher, setCipher] = useState("");

    function encryptToAffine(e) {

        e.preventDefault();

        let reg = /[A-Z]+/g;

        let word = message;

        for (let i = 0; i < word.length; i++) {
            if (word[i].match(reg)) {
                let alphabetIndex = alphabet.indexOf(word[i]);
                let troublesome = (parseInt(keyA * alphabetIndex) + parseInt(keyB)) % alphabet.length;
                word = word.substring(0, i) + alphabet[troublesome] + word.substring(i + 1);
            } else {
                word = word.substring(0, i) + word[i] + word.substring(i + 1);
            }
        }
        console.log(word);
        document.getElementById("toAffine").innerHTML = word;
    }

    function decryptFromAffine(e) {

        e.preventDefault();

        let word = cipher;

        for (let i = 0; i < word.length; i++) {
            setKeyA(keyA % alphabet.length);

            let invert = 0;

            for (let j = 1; j < alphabet.length; j++) {
                if ((keyA * j) % alphabet.length === 1)
                    invert = j;
            }

            let alphabetIndex = alphabet.indexOf(word[i]);

            let troublesome = (invert * (alphabetIndex - keyB)) % alphabet.length;
            if (troublesome < 0)
                troublesome += alphabet.length;
            word = word.substring(0, i) + alphabet[troublesome] + word.substring(i + 1);
        }
        console.log(word);
        document.getElementById("fromAffine").innerHTML = word;
    }

    return(
        <div id="content">
            <h2>Szyfr Affiniczny</h2>
            <form id="myKey">
                <h4>
                Wybierz klucz:<br/>
                A:
                <input type="number" value={keyA} required onChange={
                    (e) => setKeyA(e.target.value)
                }/>&nbsp;
                B:
                <input type="number" value={keyB} required onChange={
                    (e) => setKeyB(e.target.value)
                }/>
                </h4>
            </form><br/>

            <div className="row">
                <div className="column">
                    <h3>Zaszyfruj</h3>
                    <form onSubmit={encryptToAffine}>
                        Wiadomość:<br/>
                        <textarea cols="50" rows="10" placeholder="Wpisz swoją wiadomość" className="myInput" value={message} required onChange={
                            (e) => setMessage((e.target.value).toUpperCase())
                        }>text</textarea><br/>
                        <input className="changeBtn" type="submit" value="Zamień"/>
                    </form><br/>

                    <div className="loadDiv">
                        Lub załaduj wiadomość z pliku:&nbsp;
                        <input type="file" id="messageToLoadUp"/><br/>
                        <button className="loadBtn" onClick={() => LoadFileAsText("messageToLoadUp", setMessage)}>Załaduj</button><br/><br/>

                        Lub załaduj z Twittera:&nbsp;
                        <input type="text" id="messageFromTweetUp" placeholder="Link do tweeta"/>&nbsp;
                        <button className="loadBtn" onClick={() => LoadFromTwitter("messageFromTweetUp", setMessage)}>Załaduj</button><br/><br/>
                    </div>

                    Zaszyfrowana wiadomość:<br/>
                    <textarea cols="50" rows="10" readOnly="true" id="toAffine"></textarea><br/>

                    <button className="saveBtn" onClick={() => CopyToClipboard("toAffine")}>Skopiuj do schowka</button>&nbsp;
                    <button className="saveBtn" onClick={() => SaveFile("toAffine")}>Zapisz do pliku .txt</button><br/><br/>
                </div>

                <div className="column">
                    <h3>Odszyfruj</h3>
                    <form onSubmit={decryptFromAffine}>
                        Szyfr:<br/>
                        <textarea cols="50" rows="10" placeholder="Wpisz swój szyfr" className="myInput" value={cipher} required onChange={
                            (e) => setCipher((e.target.value).toUpperCase())
                        }>text</textarea><br/>
                        <input className="changeBtn" type="submit" value="Zamień"/>
                    </form><br/>

                    <div className="loadDiv">
                        Lub załaduj szyfr z pliku:&nbsp;
                        <input type="file" id="cipherToLoadUp"/><br/>
                        <button className="loadBtn" onClick={() => LoadFileAsText("cipherToLoadUp", setCipher)}>Załaduj</button><br/><br/>

                        Lub załaduj z Twittera:&nbsp;
                        <input type="text" id="cipherFromTweetUp" placeholder="Link do tweeta"/>&nbsp;
                        <button className="loadBtn" onClick={() => LoadFromTwitter("cipherFromTweetUp", setCipher)}>Załaduj</button><br/><br/>
                    </div>

                    Odszyfrowana wiadomość:<br/>
                    <textarea cols="50" rows="10" readOnly="true" id="fromAffine"></textarea><br/>

                    <button className="saveBtn" onClick={() => CopyToClipboard("fromAffine")}>Skopiuj do schowka</button>&nbsp;
                    <button className="saveBtn" onClick={() => SaveFile("fromAffine")}>Zapisz do pliku .txt</button>
                </div>
            </div>
        </div>
    )
}