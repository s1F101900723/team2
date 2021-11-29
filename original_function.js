function quickSort(profile, startID = 0, endID = profile.length - 1) {
    var pivot = profile[Math.floor((startID + endID) / 2)].point;
    var left = startID;
    var right = endID;

    while (true) {
      while (profile[left].point < pivot) {
        left++;
      }
      while (pivot < profile[right].point) {
        right--;
      }
      if (right <= left) {
        break;
      }

      var tmp = profile[left];
      profile[left] = profile[right];
      profile[right] = tmp;
      left++;
      right--;
    }

    if (startID < left - 1) {
      quickSort(profile, startID, left - 1);
    }
    if (right + 1 < endID) {
      quickSort(profile, right + 1, endID);
    }
}


function submit_search(search_num){
    const textbox = document.getElementById("search_box"+search_num);
    const inputValue = textbox.value;
    window.location.href = "./index.html?id="+inputValue ;
}

function FormGetAid(Aid_num){
    var form_Aid = document.getElementsByClassName('form-Aid');
    for (var i = 0; i < form_Aid.length; i++){
      form_Aid[i].value= Aid_num;
    }
    //document.getElementById('form-Aid').value = Aid_num;
    //quill.clipboard.dangerouslyPasteHTML(pretext);
    //console.log(Aid_num);
}

function getpretext(num){
    var endpoint ="https://script.google.com/macros/s/AKfycbyEXVk8PA9ZgzR2FvV0gnezs11MrX1DOmAoVH2OU6d6u5bxKOO1qKu5Vl2GECnaVAskng/exec";
    fetch(endpoint)
        .then(response => response.json())
        /*成功した処理*/
        .then(data => {
            //JSONから配列に変換
            var AList = data[1];
            var pretext_A=AList.filter(value => {if(value.qid === url && value.aid === num && value.uid === GlobalUid){
            return true;
            }});
            quill.clipboard.dangerouslyPasteHTML(pretext_A[0].text);
        });
    FormGetAid(num);
}
