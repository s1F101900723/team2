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
function Onheart(num){
  if(GlobalUid==undefined){
    alert("ログインしてください");
  }else{
    FormGetAid(num);
    var form_Like = document.getElementsByClassName('form-like');
    for (var i = 0; i < form_Like.length; i++){
      form_Like[i].value= 0;
    }
    document.likeform.submit();
    var target_on = document.getElementsByClassName('heart_on '+num+'');
    var target_off = document.getElementsByClassName('heart_off '+num+'');
    target_on[0].style.display = "none";
    target_off[0].style.display = "block";
  }
  }
function Offheart(num){
  if(GlobalUid==undefined){
    alert("ログインしてください");
  }else{
    FormGetAid(num);
    var form_Like = document.getElementsByClassName('form-like');
    for (var i = 0; i < form_Like.length; i++){
      form_Like[i].value= 1;
    }
    document.likeform.submit();
    var target_on = document.getElementsByClassName('heart_on '+num+'');
    var target_off = document.getElementsByClassName('heart_off '+num+'');
    target_on[0].style.display = "block";
    target_off[0].style.display = "none";
  }
  }

function edit(){
    var target_on = document.getElementsByClassName('name_edit_on');
    var target_off = document.getElementsByClassName('name_edit_off');
    var target_name = document.getElementById("form-name");
    target_name.readOnly = false;
    target_on[0].style.display = "none";
    target_off[0].style.display = "inline-block";
  }
function check(){
    var target_on = document.getElementsByClassName('name_edit_on');
    var target_off = document.getElementsByClassName('name_edit_off');
    var target_name = document.getElementById("form-name");
    target_name.readOnly = true;
    target_on[0].style.display = "inline-block";
    target_off[0].style.display = "none";
  }

function getpretext(num){
    var endpoint ="https://script.google.com/macros/s/AKfycbzWQ6ojGAvYrhWerWDPCO11Y_3VGqD_EYcSSyX5ZV7KIanzi-TXOHKsXUHsSBN5mgdiXw/exec";
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


function getpreQuestion(num){
    var endpoint ="https://script.google.com/macros/s/AKfycbzWQ6ojGAvYrhWerWDPCO11Y_3VGqD_EYcSSyX5ZV7KIanzi-TXOHKsXUHsSBN5mgdiXw/exec";
    fetch(endpoint)
        .then(response => response.json())
        /*成功した処理*/
        .then(data => {
            //JSONから配列に変換
              var QList = data[2];
              var pretext_Q=QList.filter(value => {if(value.qid === num && value.uid === GlobalUid){
              return true;
              }});
              QID = document.getElementsByClassName("Qform-Qid");
              Q_title = document.getElementsByClassName("Q_title");
              quillQ.clipboard.dangerouslyPasteHTML(pretext_Q[0].text);
              for (var i = 0; i < QID.length; i++){
                QID[i].value= num;
              }
              for (var i = 0; i < Q_title.length; i++){
                Q_title[i].value= pretext_Q[0].title;
              }
        });
}
function reset_Q(){
  quillQ.clipboard.dangerouslyPasteHTML('<p></p>');
  QID = document.getElementsByClassName("Qform-Qid");
  Q_title = document.getElementsByClassName("Q_title");
  for (var i = 0; i < QID.length; i++){
    QID[i].value= null;
  }
  for (var i = 0; i < Q_title.length; i++){
    Q_title[i].value= null;
  }
}
function reset_A(){
  quill.clipboard.dangerouslyPasteHTML('<p></p>');
}