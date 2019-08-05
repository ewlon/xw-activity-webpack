(function(){
    function fontSize() {
        var winWidth;
        if (window.innerWidth) winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        if (document.documentElement && document.documentElement.clientWidth) {
            winWidth = document.documentElement.clientWidth;
        }
        document.getElementsByTagName('html')[0].style.fontSize=winWidth/375*20+"px";
    }
    fontSize();

    function setWrapperMinHeight() {
        var winHeight;
        if (window.innerHeight) winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        if (document.documentElement && document.documentElement.clientHeight) {
            winHeight = document.documentElement.clientHeight;
        }
        document.querySelectorAll('body').forEach(function (item) {
            item.style.minHeight=winHeight + 'px';
        })
    }
    
    
    function arrangePage(){
	    var y;
	    document.querySelectorAll('input[type="text"],input[type="tel"],input[type="password"],input[type="number"],textarea').forEach(function (item) {
		    item.addEventListener('focus',function(){
			    y = window.scrollY;
		    });
		    item.addEventListener('blur',function(){
			    window.scroll(0,y);
		    });
	    });

    }

    document.addEventListener("DOMContentLoaded",function () {
        setWrapperMinHeight();
        arrangePage();
    });
    window.addEventListener("resize",function () {
        fontSize();
        setWrapperMinHeight()
    });

})();
