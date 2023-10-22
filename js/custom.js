document.addEventListener("DOMContentLoaded", function() {

    const selectElement = document.getElementById("regionSelect");

    selectElement.addEventListener("change", function() {
        const selectedValue = selectElement.value;
        const selectedText = selectElement.options[selectElement.selectedIndex].text;

        console.log("选择的值是: " + selectedValue);
        console.log("选择的文本内容是: " + selectedText);
    });

    const button = document.getElementById("weatherButton");

    button.addEventListener("click", function() {
        const selectedValue = selectElement.value;
        console.log("Prediction with ",selectedValue)
    });
});