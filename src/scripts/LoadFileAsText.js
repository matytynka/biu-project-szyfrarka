export default function LoadFileAsText(id, setVariable = f => f) {

    let fileToLoad = document.getElementById(id).files[0];
    let fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent){
        if (id === "messageToLoadUp" || id === "cipherToLoadUp") {
            setVariable((fileLoadedEvent.target.result).toUpperCase());
        } else if (id === "messageToLoadLow" || id === "cipherToLoadLow") {
            setVariable((fileLoadedEvent.target.result).toLowerCase());
        } else {
            setVariable(fileLoadedEvent.target.result);
        }
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
}