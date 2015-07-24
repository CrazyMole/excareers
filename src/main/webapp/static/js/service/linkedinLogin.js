function onLogin(){
  IN.API.Profile("me").fields(["id","first-name","last-name","picture-url","email-address","phone-numbers","last-modified-timestamp","positions:(company:(id,name))"]).result(function(result) { 
    var data = result.values[0];
    var params={};
    $.each(data,function(i,v){
      if(i == "positions" || i == "phoneNumbers"){
        params[i]=JSON.stringify(v.values);
      }else{
        params[i]=v;
      }
    });
    $.ajax({
        type : 'POST',
        url : "/linkedin/login?_=" + new Date().getTime(),
        data : params ,
        dataType : "json",
        success : function(result) {
          window.location.href="/employee/write";
        },
        error:function(){
          alert('error!');
        }
    });
  });
}