export default function CopyToClipboard(id) {
    let element = document.getElementById(id);
    let elementText = element.textContent;
    navigator.clipboard.writeText(elementText)
        .catch(error => {
            console.log(error);
    });
}