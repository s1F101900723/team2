const fmt =  new Intl.NumberFormat("en-GB",{ 
    notation: "compact",
    compactDisplay: "short"
});
  var str=location.href;
  var url = Number(location.search.substring(4));//idが整数の場合
  let result = str.split("/").filter(e => Boolean(e));
  let last_url=result[result.length - 1];
  var form_Qid = document.getElementsByClassName('form-Qid');
  for (var i = 0; i < form_Qid.length; i++){
    form_Qid[i].textContent= url;
    form_Qid[i].value= url;
  }

  //送信3秒後にjsonを再読み込み
  let btn = document.getElementById('btn-send');
    btn.addEventListener('click', function(){
        window.setTimeout(function(){
            load_sheet();
        }, 3000);
  });
  let btnQ = document.getElementById('btn-Qsend');
    btnQ.addEventListener('click', function(){
        window.setTimeout(function(){
            load_sheet();
        }, 3000);
  });

  function load_sheet(){
      var endpoint =
      "https://script.google.com/macros/s/AKfycbzWQ6ojGAvYrhWerWDPCO11Y_3VGqD_EYcSSyX5ZV7KIanzi-TXOHKsXUHsSBN5mgdiXw/exec";//WebAPIのURL

      //APIを使って非同期データを取得する

      fetch(endpoint)
          .then(response => response.json())
          /*成功した処理*/
          .then(data => {
              //JSONから配列に変換
              var UserList = data[0];
              var AList = data[1];
              var QList = data[2];
              var LIKEList = data[3];
              let likehtmltext = "";
              let pointhtmltext = "";
              var LIKErankList = data[4];
              var POINTrankList = data[5];
              likehtmltext +='<p>#LikesRanking</p>';
              pointhtmltext +='<p>#PointRanking</p>';
              for (let i=0; i<LIKErankList.length; i++){
                likehtmltext += "<li>" + LIKErankList[i].rank + '位　<a href="./detail.html?id='+LIKErankList[i].qid+'">' + LIKErankList[i].title + "</a>　" + fmt.format(BigInt(LIKErankList[i].like_sum) ) + " likes</li>";
              }
              for (let i=0; i<POINTrankList.length; i++){
                pointhtmltext += "<li>" + POINTrankList[i].rank + "位　" + POINTrankList[i].name + "　" + fmt.format(BigInt(POINTrankList[i].point) ) + " points</li>";
              }
              
              document.getElementById("point_ranking").innerHTML = pointhtmltext;
              document.getElementById("like_Q_ranking").innerHTML = likehtmltext;

              

              let htmltext = "";
              var resultQ = QList.filter(value => value.qid === url);
              var resultA = AList.filter(value => value.qid === url);
              var resultLIKE = LIKEList.filter(value => {if(value.uid === GlobalUid && value.qid === url && value.like_num === 1){
                return true;
              }});
              var LIKE_aid = resultLIKE.map(value => value["aid"]);
              htmltext += '<div class="detail_contents"><p>質問</p>';
              htmltext += '<p>' + resultQ[0].title + '</p>';
              htmltext += '<p>' + resultQ[0].text + '</p></div>';
              
              if(LIKE_aid.includes(0)==true){
                htmltext += '<div class="heart_box"><div class="left_icon">';
                if(GlobalUid==resultQ[0].uid){
                  htmltext += '<a onclick="getpreQuestion('+resultQ[0].qid+')" class="btn_blue" data-toggle="modal" data-target="#testQModal">編集</a>';
                }
                htmltext += '<a onclick="FormGetAid(null); reset_A();" class="btn_blue" data-toggle="modal" data-target="#testModal">回答する</a>';
                htmltext +='</div><div><a href="" onclick="FormGetAid(0)" class="fab fa-product-hunt login_must" data-toggle="modal" data-target="#testpointModal"></a></div><p>'+fmt.format(BigInt((0+Number(resultQ[0].point))))+'</p><div class="far fa-heart heart_on 0" onclick="Onheart(0)"></div><div style="display: none;" class="far fa-heart heart_off 0" onclick="Offheart(0)"></div><p class="heart_num">'+fmt.format(BigInt((0+Number(resultQ[0].like_sum))))+'</p></div></div>';
              }
              else{
                htmltext += '<div class="heart_box"><div class="left_icon">';
                if(GlobalUid==resultQ[0].uid){
                  htmltext += '<a onclick="getpreQuestion('+resultQ[0].qid+')" class="btn_blue" data-toggle="modal" data-target="#testQModal">編集</a>';
                }
                htmltext += '<a onclick="FormGetAid(null); reset_A();" class="btn_blue" data-toggle="modal" data-target="#testModal">回答する</a>';
                htmltext += '</div><div><a href="" onclick="FormGetAid(0)" class="fab fa-product-hunt login_must" data-toggle="modal" data-target="#testpointModal"></a></div><p>'+fmt.format(BigInt((0+Number(resultQ[0].point))))+'</p><div style="display: none;" class="far fa-heart heart_on 0" onclick="Onheart(0)"></div><div class="far fa-heart heart_off 0" onclick="Offheart(0)"></div><p class="heart_num">'+fmt.format(BigInt((0+Number(resultQ[0].like_sum))))+'</p></div></div>';
              }


              for (let i = 0; i < resultA.length; i++){
                if(LIKE_aid.includes(resultA[i].aid)==true){

                  htmltext += '<div class="contents ql-editor"><p>'+resultA[i].text+'</p>';                 
                  htmltext += '<div class="heart_box"><div class="left_icon">';
                  if(GlobalUid==resultA[i].uid){
                    htmltext += '<a onclick="getpretext('+resultA[i].aid+')" class="btn_blue" data-toggle="modal" data-target="#testModal">編集</a>';
                  }
                  htmltext += '</div><div><a href="" onclick="FormGetAid('+resultA[i].aid+')" class="fab fa-product-hunt login_must" data-toggle="modal" data-target="#testpointModal"></a></div><p>'+fmt.format(BigInt((0+Number(resultA[i].point))))+'</p><div class="far fa-heart heart_on '+resultA[i].aid+'" onclick="Onheart('+resultA[i].aid+')"></div><div style="display: none;" class="far fa-heart heart_off '+resultA[i].aid+'" onclick="Offheart('+resultA[i].aid+')"></div><p class="heart_num">'+fmt.format(BigInt((0+Number(resultA[i].like_sum))))+'</p></div></div>';
                  
                }
                else{

                  htmltext += '<div class="contents ql-editor"><p>'+resultA[i].text+'</p>';
                  htmltext += '<div class="heart_box"><div class="left_icon">';
                  if(GlobalUid==resultA[i].uid){
                    htmltext += '<a onclick="getpretext('+resultA[i].aid+')" class="btn_blue" data-toggle="modal" data-target="#testModal">編集</a>';
                  }
                  htmltext += '</div><div><a href="" onclick="FormGetAid('+resultA[i].aid+')" class="fab fa-product-hunt login_must" data-toggle="modal" data-target="#testpointModal"></a></div><p>'+fmt.format(BigInt((0+Number(resultA[i].point))))+'</p><div style="display: none;" class="far fa-heart heart_on '+resultA[i].aid+'" onclick="Onheart('+resultA[i].aid+')"></div><div class="far fa-heart heart_off '+resultA[i].aid+'" onclick="Offheart('+resultA[i].aid+')"></div><p class="heart_num">'+fmt.format(BigInt((0+Number(resultA[i].like_sum))))+'</p></div></div>';
                }
              }
              document.getElementById("detail_article").innerHTML = htmltext;
              if(GlobalUid==undefined){
                document.getElementById('photo').style.display = "none";
                var login_target_off = document.getElementsByClassName('btn_blue');
                for (var i = 0; i < login_target_off.length; i++){
                  login_target_off[i].style.display = "none";
                }

                var login_target_point = document.getElementsByClassName('login_must');
                for (var i = 0; i < login_target_point.length; i++){
                  login_target_point[i].style.cssText = "pointer-events:none;";
                }
                
              }
              else{
                var USER_info = UserList.find(value => value.uid === GlobalUid);
                document.getElementById("form-name").value = USER_info.name;
                var login_rightbottom_off = document.getElementsByClassName('bottom_right');
                login_rightbottom_off[0].style.display = "block";
              }
  
          });
  }
  

  load_sheet();

  const $form = $('#form');
  $('.btn-send').on('click', evt => {
      $("#form_text").val(quill.root.innerHTML);
      $form.submit();
      $form[0].reset();
      for (var i = 0; i < form_Qid.length; i++){
        form_Qid[i].textContent= url;
        form_Qid[i].value= url;
      }
      var elems = document.getElementsByClassName('uid');
      for (var i = 0; i < elems.length; i++){
        elems[i].textContent= GlobalUid;
        elems[i].value= GlobalUid;
      }
      quill.clipboard.dangerouslyPasteHTML('<p></p>');
      $('#testModal').modal('hide');
      return false
  })
  const $pointform = $('#pointform');
  $('.btn-sendpoint').on('click', evt => {
      $pointform.submit();
      $pointform[0].reset();
      for (var i = 0; i < form_Qid.length; i++){
        form_Qid[i].textContent= url;
        form_Qid[i].value= url;
      }
      var elems = document.getElementsByClassName('uid');
      for (var i = 0; i < elems.length; i++){
        elems[i].textContent= GlobalUid;
        elems[i].value= GlobalUid;
      }
      $('#testpointModal').modal('hide');
      return false
  })
  const $Qform = $('#Qform');
  $('.btn-sendQ').on('click', evt => {
      $("#formQ_text").val(quillQ.root.innerHTML);
      $Qform.submit();
      $Qform[0].reset();
      var elems = document.getElementsByClassName('uid');
      for (var i = 0; i < elems.length; i++){
        elems[i].textContent= GlobalUid;
        elems[i].value= GlobalUid;
      }
      quillQ.clipboard.dangerouslyPasteHTML('<p></p>');
      $('#testQModal').modal('hide');
      return false
  })

var toolbarOptions = [
['bold', 'italic', 'underline', 'strike'],
['blockquote', 'code-block'],
['link', 'image'],

[{ 'header': 1 }, { 'header': 2 }],
[{ 'list': 'ordered'}, { 'list': 'bullet' }],
[{ 'script': 'sub'}, { 'script': 'super' }],
[{ 'indent': '-1'}, { 'indent': '+1' }],
[{ 'direction': 'rtl' }],
['clean']
];
var quill = new Quill('#editor',{
theme: 'snow',
modules: {
  toolbar: toolbarOptions
},
});
var quillQ = new Quill('#editorQ',{
theme: 'snow',
modules: {
  toolbar: toolbarOptions
},
});