import {Link} from 'react-router-dom';
import React from 'react';

export default function Header(){
    return(
        <div className="Header">
            <ul>
                <li><Link to="/" id="homeTab">Strona główna</Link></li>
                <li><Link to="/morse" id="morseTab">Kod Morse'a</Link></li>
                <li><Link to="/affine" id="affineTab">Szyfr Afiniczny</Link></li>
                <li><Link to="/vigenere" id="vigenereTab">Szyfr Vigenère'a</Link></li>
                <li className="Logo">Szyfrarka</li>
            </ul>
        </div>
    )
}