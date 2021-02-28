import { saveAs } from 'file-saver';

export default function SaveFile(id) {
    let text = document.getElementById(id).innerHTML;
    let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, id + ".txt");
}