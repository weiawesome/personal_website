$(document).ready(function() {

    const $selectElement = $("#regionSelect");
    const $button = $("#weatherButton");
    const $result = $("#resultTarget");

    $selectElement.on("change", function() {
        const selectedValue = $selectElement.val();
        const selectedText = $selectElement.find("option:selected").text();

        console.log("选择的值是: " + selectedValue);
        console.log("选择的文本内容是: " + selectedText);
    });

    let Title="";
    let Location="";
    let timeZones=[];
    let wx=[];
    let pop=[];
    let minT=[];
    let ci=[];
    let maxT=[]



    $button.on("click", function() {
        const selectedValue = $selectElement.val();
        if (selectedValue===""){
            alert("You should choose a city!");
            return;
        }
        console.log("Prediction with ", selectedValue);
        $.ajax({
            url: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001',
            type: 'GET',
            data: {
                Authorization: 'CWA-750CC720-BDF5-41F1-B5F2-631ACE2B76B3',
                format: 'JSON',
                locationName: selectedValue,
                elementName: ''
            },
            dataType: 'json',
            success: function(data) {
                console.log(data.records);
                Title=data.records.datasetDescription;
                Location=data.records.location[0].locationName;
                data.records.location[0].weatherElement.map((item,index)=>{
                    if (item.elementName==="Wx"){
                        timeZones=[item.time[0].startTime,item.time[1].startTime,item.time[2].startTime]
                        wx=[item.time[0].parameter.parameterName,item.time[1].parameter.parameterName,item.time[2].parameter.parameterName]
                    } else if (item.elementName==="PoP"){
                        pop=[item.time[0].parameter.parameterName+" %",item.time[1].parameter.parameterName+" %",item.time[2].parameter.parameterName+" %"]
                    } else if (item.elementName==="MinT"){
                        minT=[item.time[0].parameter.parameterName+" °C",item.time[1].parameter.parameterName+" °C",item.time[2].parameter.parameterName+" °C"]
                    } else if (item.elementName==="CI"){
                        ci=[item.time[0].parameter.parameterName,item.time[1].parameter.parameterName,item.time[2].parameter.parameterName]
                    } else if (item.elementName==="MaxT"){
                        maxT=[item.time[0].parameter.parameterName+" °C",item.time[1].parameter.parameterName+" °C",item.time[2].parameter.parameterName+" °C"]
                    }

                })
                let innerHtml=`<h2>${Location} - ${Title}</h2>
            <table>
                <thead>
                <tr>
                    <th>時間維度</th>
                    <th>${timeZones[0]}</th>
                    <th>${timeZones[1]}</th>
                    <th>${timeZones[1]}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>天氣情況</td>
                    <td>${wx[0]}</td>
                    <td>${wx[1]}</td>
                    <td>${wx[2]}</td>
                </tr>
                <tr>
                    <td>降雨機率</td>
                    <td>${pop[0]}</td>
                    <td>${pop[1]}</td>
                    <td>${pop[2]}</td>
                </tr>
                <tr>
                    <td>最低溫度</td>
                    <td>${minT[0]}</td>
                    <td>${minT[1]}</td>
                    <td>${minT[2]}</td>
                </tr>
                <tr>
                    <td>最高溫度</td>
                    <td>${maxT[0]}</td>
                    <td>${maxT[1]}</td>
                    <td>${maxT[2]}</td>
                </tr>
                <tr>
                    <td>感受</td>
                    <td>${ci[0]}</td>
                    <td>${ci[1]}</td>
                    <td>${ci[2]}</td>
                </tr>
                </tbody>
            </table>`
                $result.html(innerHtml);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('请求失败：', textStatus, errorThrown);
                alert("Error to request!")
            }
        });

    });
});
