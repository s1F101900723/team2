const fmt =  new Intl.NumberFormat("en-GB",{ 
    notation: "compact",
    compactDisplay: "short"
});
  var show_numQ = 3;
  var show_numA = 3;
  function show_listQ(){
    show_numQ += 3;
    var showQ = document.getElementById('question_list').getElementsByClassName('contents');
    //console.log(showQ.length, show_numQ);
    if (showQ.length<show_numQ){
      for (var i = 0; i < showQ.length; i++){
        showQ[i].style.cssText = "display: block;";
        //console.log(showQ.length, show_numQ,"block");
      }
    }
    else{
      for (var i = 0; i < show_numQ; i++){
        showQ[i].style.cssText = "display: block;";
      }
    }
  }
  function show_listA(){
    show_numA += 3;
    var showA = document.getElementById('answer_list').getElementsByClassName('contents');
    //console.log(showA.length, show_numA);
    if (showA.length<show_numA){
      for (var i = 0; i < showA.length; i++){
        showA[i].style.cssText = "display: block;";
        //console.log(showA.length, show_numA,"block");
      }
    }
    else{
      for (var i = 0; i < show_numA; i++){
        showA[i].style.cssText = "display: block;";
      }
    }
  }
  var str=location.href;
  var url = decodeURI(location.search.substring(4));//idが整数の場合
  let result = str.split("/").filter(e => Boolean(e));
  let last_url=result[result.length - 1];
  //console.log(url);
  //console.log(last_url);
  //document.getElementById('form-Qid').value = url;
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
  

  //window.onload = function(){
    //600000ミリ秒（600秒）毎に関数を呼び出す
  //  setInterval("load_sheet()", 600000);
  //}

  //GASのAPIのURL（各自変更してください。）
  function load_sheet(){
      var endpoint =
      "https://script.google.com/macros/s/AKfycbzWQ6ojGAvYrhWerWDPCO11Y_3VGqD_EYcSSyX5ZV7KIanzi-TXOHKsXUHsSBN5mgdiXw/exec";//WebAPIのURL

      //APIを使って非同期データを取得する

      fetch(endpoint)
          .then(response => response.json())
          /*成功した処理*/
          .then(data => {
              //JSONから配列に変換
              //console.log(data);
              var UserList = data[0];
              var AList = data[1];
              var QList = data[2];
              //var LIKEList = data[3];
              let likehtmltext = "";
              let pointhtmltext = "";
              var resultPointRank = UserList.filter(value => value.point !== '');
              var resultLikeQRank = QList.filter(value => value.like_sum !== '');

              quickSort(resultPointRank);
              quickSort(resultLikeQRank);

              pointhtmltext +='<p>#PointRanking</p>';
              resultPointRank.reverse().map((e, i) => {
                if ((i+1) > 3) return 
                pointhtmltext += "<li>" + (i + 1) + "位　" + e.name + "　" + fmt.format(BigInt(e.point) ) + " points</li>";
              });
              document.getElementById("point_ranking").innerHTML = pointhtmltext;

              likehtmltext +='<p>#LikesRanking</p>';
              resultLikeQRank.reverse().map((e, i) => {
                if ((i+1) > 3) return 
                likehtmltext += "<li>" + (i + 1) + '位　<a href="./detail.html?id='+e.qid+'">' + e.title + "</a>　" + fmt.format(BigInt(e.like_sum) ) + " likes</li>";
              });
              document.getElementById("like_Q_ranking").innerHTML = likehtmltext;

              let htmltext = "";
              let htmltextA = "";
              //console.log(typeof(url));
              regexp = new RegExp(url, 'g');
              //console.log(regexp);
              var resultQ = QList.filter(value => {if(value.text.match(regexp) || value.title.match(regexp)){
                return true;
              }});
              var resultA = AList.filter(value => value.text.match(regexp));
              if(resultQ.length==0){
                htmltext+='<p>「'+url+'」の検索結果がありません</p>';
              }
              else{
                htmltext += '<p>新規質問一覧</p>';

                for (let i=resultQ.length-1; i>=0; i--){//let i = 0; i < resultQ.length; i++
                    htmltext += '<div class="contents ql-editor"><a href="./detail.html?id='+resultQ[i].qid+'">'+resultQ[i].title+'</a>';
                    htmltext += '<p>'+resultQ[i].text+'</p>';
                    htmltext += '<div class="heart_box"><div><a href="" class="fab fa-product-hunt login_must_top"></a></div><p>'+fmt.format(BigInt((0+Number(resultQ[i].point))))+'</p><div class="far fa-heart heart '+resultQ[i].qid+'"></div><p class="heart_num">'+fmt.format(BigInt((0+Number(resultQ[i].like_sum))))+'</p></div></div></div>';
                }
              }

              if(resultA.length==0){
                htmltextA+='<p>「'+url+'」の検索結果がありません</p>';
              }
              else{
                htmltextA += '<p>回答一覧</p>';

                for (let i=resultA.length-1; i>=0; i--){//let i = 0; i < resultA.length; i++
                    htmltextA += '<div class="contents ql-editor"><a href="./detail.html?id='+resultA[i].qid+'">'+QList[(resultA[i].qid-1)].title+'</a>';
                    htmltextA += '<p>'+resultA[i].text+'</p>';
                    htmltextA += '<div class="heart_box"><div><a href="" class="fab fa-product-hunt login_must_top"></a></div><p>'+fmt.format(BigInt((0+Number(resultA[i].point))))+'</p><div class="far fa-heart heart '+resultA[i].qid+'"></div><p class="heart_num">'+fmt.format(BigInt((0+Number(resultA[i].like_sum))))+'</p></div></div></div>';
                }
              }
              document.getElementById("question_list").innerHTML = htmltext;
              document.getElementById("answer_list").innerHTML = htmltextA;
              //console.log(htmltext);
              //quill.clipboard.dangerouslyPasteHTML(resultA[2].text);//現在は仮でテキストを指定している
              //document.getElementById("editor").innerHTML = resultA[2].text;
  
              if(GlobalUid==undefined){
                //console.log("ログインしてください");
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
              var login_target_point_top = document.getElementsByClassName('login_must_top');
              for (var i = 0; i < login_target_point_top.length; i++){
                login_target_point_top[i].style.cssText = "pointer-events:none;";
              }

              var showQ = document.getElementById('question_list').getElementsByClassName('contents');
              //console.log(showQ.length, show_numQ);
              for (var i = show_numQ; i < showQ.length; i++){
                showQ[i].style.cssText = "display: none;";
              }
              var showA = document.getElementById('answer_list').getElementsByClassName('contents');
              //console.log(showA.length, show_numA);
              for (var i = show_numA; i < showA.length; i++){
                showA[i].style.cssText = "display: none;";
              }
          });
  }
  

  load_sheet();

  const $form = $('#form');
  $('.btn-send').on('click', evt => {
      $("#form_text").val(quill.root.innerHTML);
      $form.submit();
      $form[0].reset();
      //document.getElementById('form-Qid').value = url;
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

//[{ 'font': [false, 'serif', 'monospace'] }],
//[{ 'size': ['small', false, 'large', 'huge'] }],
//[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//[{ 'color': [] }, { 'color': ['red', 'blue'] }, { 'background': [] }], 
//[{ 'font': [] }],
//[{ 'align': [] }],

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