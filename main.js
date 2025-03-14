var AutoClicker = {}

AutoClicker.init = function() {
  //Init values for menus
  AutoClicker.OffColor = '#b52f18';
  AutoClicker.OnColor = '#63943e';
  AutoClicker.ButtonContainerColor = 'rgba(175, 143, 0, 0.2)';
  AutoClicker.ButtonBackgroundColor = '#313332';

  AutoClicker.AutoClickMode = false;
  AutoClicker.GoldenClickMode = false;
  AutoClicker.FortuneClickMode = false;

  AutoClicker.MenuHidden = true;
  AutoClicker.ClickWraths = false;

  //Function to hide or show the menu
  AutoClicker.MenuHideShow = function() {
      if(AutoClicker.MenuHidden) {
        AutoClicker.ShowContainer.style.visibility = "hidden";    
        AutoClicker.ButtonContainer.style.visibility = "visible";
        AutoClicker.MenuHidden = false;
      }
      else {
        AutoClicker.ShowContainer.style.visibility = "visible";    
        AutoClicker.ButtonContainer.style.visibility = "hidden";
        AutoClicker.MenuHidden = true;
      }
  };

  AutoClicker.ChangeClickWraths = function() {

    AutoClicker.ClickWraths = !AutoClicker.ClickWraths; 
    AutoClicker.setButtonStatus(AutoClicker.WrathButton, AutoClicker.ClickWraths);
  };

  //AutoClick the cookie
  AutoClicker.ClickCookie = function() {
    //if not autoClicker selected in menu, do nothing
    if(!AutoClicker.AutoClickMode) return;

    var cookie = document.getElementById('bigCookie');
    AutoClicker.dispatchEvent(cookie, 'click');

  };

  //AutoClick the goolden Cookies
  AutoClicker.ClickGoldenCookie = function() {
    if(!AutoClicker.GoldenClickMode) return;

    //Check if is a goldenCookie and its not wrath, then click it
    
    for (var i in Game.shimmers){
      if(Game.shimmers[i].type=='golden'  ){

        if(!Game.shimmers[i].wrath ) AutoClicker.dispatchEvent(Game.shimmers[i].l, 'click');
        else if(AutoClicker.ClickWraths) AutoClicker.dispatchEvent(Game.shimmers[i].l, 'click');
      } 
    }
  };

  //AutoClick fortunes
  AutoClicker.ClickFortune = function() {
    if(!AutoClicker.FortuneClickMode) return;
    if(Game.TickerEffect && Game.TickerEffect.type === 'fortune') {
      Game.tickerL.click();
    }
  }

  AutoClicker.dispatchEvent = function(target, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    if(target) {
      target.dispatchEvent(e);
    }
  };

  AutoClicker.setButtonStatus = function(button, status) {
    var statusTextEl = button.getElementsByClassName('status-text')[0];

    if(!statusTextEl) return;

    statusTextEl.style.backgroundColor = status ? AutoClicker.OnColor : AutoClicker.OffColor;
    statusTextEl.innerHTML = status ? 'on' : 'off';
  }

  AutoClicker.AutoClickCallback = function(event) {
    AutoClicker.AutoClickMode = !AutoClicker.AutoClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoButton, AutoClicker.AutoClickMode);
  }

  AutoClicker.GoldenAutoClickCallback = function(event) {
    AutoClicker.GoldenClickMode = !AutoClicker.GoldenClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoGoldenButton, AutoClicker.GoldenClickMode);
  }

  AutoClicker.FortuneAutoClickCallback = function(event) {
    AutoClicker.FortuneClickMode = !AutoClicker.FortuneClickMode;
    AutoClicker.setButtonStatus(AutoClicker.AutoFortuneButton, AutoClicker.FortuneClickMode);
  }

  AutoClicker.setButtonProps = function(button, text, eventCallback) {
    var textEl = document.createElement('p');
    var statusTextEl = document.createElement('p');
    textEl.innerHTML = text;
    textEl.style.margin = 'auto 0';

    //textEl.style.flexBasis = '60%';
    //textEl.style.flexBasis = '45%'
    statusTextEl.innerHTML = 'off';
    statusTextEl.className = 'status-text';
    statusTextEl.style.backgroundColor = AutoClicker.OffColor;
    statusTextEl.style.margin = 'auto 0';
    statusTextEl.style.padding = '0.5rem';
    //statusTextEl.style.textAlign = 'center';
    statusTextEl.style.flexBasis = '20%'
    
    button.style.display = 'flex';
    button.style.padding = '0.5rem';
    button.style.height = '3.25rem';
    button.style.flexBasis = '45%';
    button.style.justifyContent = 'space-between';
    button.style.marginBottom = '0.25rem';
    button.style.backgroundColor = AutoClicker.ButtonBackgroundColor;
    button.style.cursor = 'pointer';
    button.addEventListener('click', eventCallback);
    button.appendChild(textEl);
    button.appendChild(statusTextEl);
  }

  AutoClicker.setButtonHide = function(button, text, eventCallback) {
    var textEl = document.createElement('p');
    textEl.innerHTML = text;
    textEl.style.margin = 'auto 0';
    //textEl.style.textAlign = 'center';
    //textEl.style.flexBasis = '60%';
    //textEl.style.flexBasis = '45%'
    button.style.display = 'flex';
    button.style.padding = '0.5rem';
    button.style.height = '3.25rem';
    button.style.flexBasis = '45%';
    button.style.justifyContent = 'center';
    button.style.marginBottom = '0.25rem';
    button.style.backgroundColor = AutoClicker.ButtonBackgroundColor;
    button.style.cursor = 'pointer';
    button.addEventListener('click', eventCallback);
    button.appendChild(textEl);
  }

  AutoClicker.setButtonWrath = function(button) {
    var textEl = document.createElement('p');
    var statusTextEl = document.createElement('p');
    textEl.innerHTML = 'Click Wrath Cookies?';
    textEl.style.margin = 'auto 0';

    //textEl.style.flexBasis = '60%';
    //textEl.style.flexBasis = '45%'
    statusTextEl.innerHTML = 'off';
    statusTextEl.className = 'status-text';
    statusTextEl.style.backgroundColor = AutoClicker.OffColor;
    statusTextEl.style.margin = 'auto 0';
    statusTextEl.style.padding = '0.5rem';
    //statusTextEl.style.textAlign = 'center';
    statusTextEl.style.flexBasis = '20%'

    button.style.display = 'flex';
    button.style.padding = '0.5rem';
    button.style.height = '3.25rem';
    button.style.flexBasis = '45%';
    button.style.justifyContent = 'center';
    button.style.marginBottom = '0.25rem';
    button.style.backgroundColor = AutoClicker.ButtonBackgroundColor;
    button.style.cursor = 'pointer';
    button.addEventListener('click', AutoClicker.ChangeClickWraths);
    button.appendChild(textEl);
    button.appendChild(statusTextEl);
  }

  AutoClicker.createButtons = function() {

    //TODO : Cambiar completante el estilo del menu
    var container = document.createElement('div');
    container.style.padding = '1rem';
    container.style.backgroundColor = AutoClicker.ButtonContainerColor;
    container.style.position = 'absolute';
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between'
    container.style.flexWrap = 'wrap';
    container.style.top = '75%';
    container.style.left = '15%';
    container.style.right = '15%';
    container.style.color = 'white';
    container.style.zIndex = '9999';
    container.style.border = '1px solid lightgray';

    var autoButton = document.createElement('div');
    AutoClicker.setButtonProps(autoButton, 'Auto Click', AutoClicker.AutoClickCallback);
    
    var autoGoldenButton = document.createElement('div');
    AutoClicker.setButtonProps(autoGoldenButton, 'Auto Golden', AutoClicker.GoldenAutoClickCallback);
    
    var autoFortuneButton = document.createElement('div');
    AutoClicker.setButtonProps(autoFortuneButton, 'Auto Fortunes', AutoClicker.FortuneAutoClickCallback);
    
    var hideButton = document.createElement('div');
    AutoClicker.setButtonHide(hideButton, 'Hide', AutoClicker.MenuHideShow);

    var WrathButton = document.createElement('div');
    AutoClicker.setButtonWrath(WrathButton);
    
    container.appendChild(autoButton);
    container.appendChild(autoGoldenButton);
    container.appendChild(autoFortuneButton);
    container.appendChild(hideButton);
    container.appendChild(WrathButton);
    
    var gameContainer = document.getElementById('sectionLeft')
    gameContainer.appendChild(container);
    
    AutoClicker.ButtonContainer = container;
    AutoClicker.AutoButton = autoButton;
    AutoClicker.AutoGoldenButton = autoGoldenButton;
    AutoClicker.AutoFortuneButton = autoFortuneButton;
    AutoClicker.WrathButton = WrathButton
    AutoClicker.ButtonContainer.style.visibility = "hidden";
  };


  AutoClicker.createButtonShow = function() {

    var textEl = document.createElement('p');
    textEl.innerHTML = 'Show';
    textEl.style.margin = 'auto 0';
    
    var container = document.createElement('div');
    container.style.padding = '1rem';
    container.style.backgroundColor = AutoClicker.ButtonBackgroundColor;
    container.style.position = 'absolute';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.flexWrap = 'wrap';
    container.style.top = '85%';
    container.style.right = '5%';
    container.style.color = 'white';
    container.style.zIndex = '9999';
    container.style.border = '1px solid lightgray';
    container.addEventListener('click', AutoClicker.MenuHideShow);
    container.appendChild(textEl);
    container.style.cursor = 'pointer';
    
    AutoClicker.ShowContainer = container;
    AutoClicker.ShowContainer.style.visibility = "visible";
    
    var gameContainer = document.getElementById('sectionLeft')
    gameContainer.appendChild(container);
    
    
  };

  window.setTimeout(() => {
    AutoClicker.createButtons();
    AutoClicker.createButtonShow();
    AutoClicker.AutoClickInterval = window.setInterval(AutoClicker.ClickCookie, 25);
    AutoClicker.GoldenClickInterval = window.setInterval(AutoClicker.ClickGoldenCookie, 25);
    AutoClicker.FortuneClickInterval = window.setInterval(AutoClicker.ClickFortune, 25);
  }, 5000);
  Game.Notify(`AutoClicker!`,'',[16,5]);
  AutoClicker.isLoaded = true;
};

AutoClicker.save = function() {

};

AutoClicker.load = function() {

};

if(!AutoClicker.isLoaded) Game.registerMod('AutoClicker', AutoClicker);