LoadPagination();

if (Number(document.getElementById("page1").textContent) == Number(window.localStorage.getItem('PAGE_NUMBER'))){
    document.getElementById("page1").classList.add("active");
}
else if (Number(document.getElementById("page2").textContent) == Number(window.localStorage.getItem('PAGE_NUMBER'))){
    document.getElementById("page2").classList.add("active");
}
else{
    document.getElementById("page3").classList.add("active");
}


function LoadPagination(){
    if (Number(window.localStorage.getItem('PAGE_NUMBER')) > 1){
        document.getElementById("page1").textContent = window.localStorage.getItem('PAGE_NUMBER')-1;
        document.getElementById("page2").textContent = Number(window.localStorage.getItem('PAGE_NUMBER'));
        document.getElementById("page3").textContent = Number(window.localStorage.getItem('PAGE_NUMBER'))+1;
    }
    else {
        document.getElementById("page1").textContent = window.localStorage.getItem('PAGE_NUMBER');
        document.getElementById("page2").textContent = Number(window.localStorage.getItem('PAGE_NUMBER'))+1;
        document.getElementById("page3").textContent = Number(window.localStorage.getItem('PAGE_NUMBER'))+2;
    }
}

var button1 = document.getElementById("page1");

button1.addEventListener("click", function(event){
    window.localStorage.setItem('PAGE_NUMBER', Number(document.getElementById("page1").textContent));
    location.reload();
});

var button2 = document.getElementById("page2");

button2.addEventListener("click", function(event){
    window.localStorage.setItem('PAGE_NUMBER', Number(document.getElementById("page2").textContent));
    location.reload();
});

var button3 = document.getElementById("page3");

button3.addEventListener("click", function(event){
    if(!button3.classList.contains('disabled')){
        window.localStorage.setItem('PAGE_NUMBER', Number(document.getElementById("page3").textContent));
        location.reload();
    }
});
 
var buttonPrev = document.getElementById("previous");

buttonPrev.addEventListener("click", function(event){
    if(window.localStorage.getItem('PAGE_NUMBER') > 1){
        document.getElementById("page1").textContent = Number(document.getElementById("page1").textContent)-1;
        document.getElementById("page2").textContent = Number(document.getElementById("page2").textContent)-1;
        document.getElementById("page3").textContent = Number(document.getElementById("page3").textContent)-1;
        window.localStorage.setItem('PAGE_NUMBER', Number(window.localStorage.getItem('PAGE_NUMBER'))-1);
        location.reload();
    }
});

var buttonNext = document.getElementById("next");

buttonNext.addEventListener("click", function(event){
    if(!buttonNext.classList.contains('disabled')){
        document.getElementById("page1").textContent = Number(document.getElementById("page1").textContent)+1;
        document.getElementById("page2").textContent = Number(document.getElementById("page2").textContent)+1;
        document.getElementById("page3").textContent = Number(document.getElementById("page3").textContent)+1;
        window.localStorage.setItem('PAGE_NUMBER', Number(window.localStorage.getItem('PAGE_NUMBER'))+1);
        location.reload();
    }
});
