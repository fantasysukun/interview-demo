window.fbAsyncInit = function() {
  FB.init({
    appId      : '1283446768423129',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.12'
  });
    
  //FB.AppEvents.logPageView();   

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};