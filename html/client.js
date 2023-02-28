var data
var book = document.getElementsByClassName("flipbook")[0]
var frontimage = document.getElementById("frontimage")
var midimage = document.getElementById("midimage")
var backimage = document.getElementById("backimage")
var inited = false
var editable = false
var currentEditingPageIndex
var _editor
var settings
var onClose
var bookIsOpen = false

document.getElementById("closesettingsbutton").onclick = function() {
    SetClass("w_settings","off")
}

function StartBook(args) {
    if( args == null ) { return false }
    if( args.data == null ) {return false}
    d = args.data
    edit = !!args.edit
    onClose = args.onClose

    SetClass("w_book","off",false)
    SetClass("w_content","off",false)

    if( !inited ) {
        inited = true
        $('.flipbook').turn({
            width:922*1.5,
            height:600*1.5,
            elevation: 50,
            gradients: true,
            autoCenter: true
        });
    }

    editable = edit
    data = d
    frontimage.value = data.frontImage || ""; frontimage.onchange = function() { data.frontImage = frontimage.value }
    midimage.value = data.midImage || ""; midimage.onchange = function() { data.midimage = midimage.value }
    backimage.value = data.backImage || ""; backimage.onchange = function() { data.backimage = backimage.value }

    if( data == null || data == "" || data.pages == null || data.pages.length == 0 ) {
        $(".flipbook").turn("addPage", CreatePageElement(editable))
        $(".flipbook").turn("addPage", CreatePageElement(editable))
        $(".flipbook").turn("addPage", CreatePageElement(editable))
    } else {
        BuildPages()
        $(".flipbook").turn("page",1);
    }
    $(".flipbook").bind("turned", function(event, page, view) {
        document.getElementsByClassName("w_flip")[0].classList.toggle("off",true)
    });
}

function StopBook() {
    SetClass("w_book","off",true)
    SetClass("w_content","off",true)
}

function BuildPages() {
    var pageCount = $(".flipbook").turn("pages")
    for( var i = pageCount; i > 0; i--) {
        if($(".flipbook").turn("hasPage",i) == false ) { continue}
        $(".flipbook").turn("removePage", i);
    }
    for( var i = 0; i < data.pages.length; i++ ) {
        $(".flipbook").turn("addPage", CreatePageElement(editable,data.pages[i]))
    }
}

function CreatePageElement(editable,data) {
    var element = document.createElement("div")
    element.classList.add("w_bookpage")
    element.id = "bookpage" + ($(".flipbook").turn("pages")+1)
    if( data != null && data.background != null ) {
        element.style.backgroundImage = "url('"+data.background+"')"
    }
    if( data != null && data.backgroundColor != null ) {
        element.style.backgroundColor = data.backgroundColor
    }
    if( data != null && data.color != null ) {
        element.style.color = data.color
    }
    var cont = document.createElement("div")
    cont.id = "pagecontent" + ($(".flipbook").turn("pages")+1)
    cont.classList.add("w_pagecontent")
    cont.setAttribute("pageIndex",$(".flipbook").turn("pages")+1)
    cont.innerHTML = data.content || ""
    element.appendChild(cont)
    return element
}

function SetClass(className,otherClassName,enable) {
    if(document.getElementsByClassName(className).length == 1 ) {
        document.getElementsByClassName(className)[0].classList.toggle(otherClassName,enable)} 
		else 
		{document.getElementById(className).classList.toggle(otherClassName,enable)}
}

function index(page) {
    $(".flipbook").turn("page",page);
}

window.addEventListener('message', function(event) {

    if (event.data.type == "OpenBookGui") {
        if (event.data.value == true) {
			$.post("http://vorp_inventory/NUIFocusOff", JSON.stringify({}));
			isOpen = false;
            var url = new URL(window.location.href);
            StartBook({data:{pages:[
            {   /* 1 cover */
                content:"",
                background:"https://media.discordapp.net/attachments/564015305483878402/1079755331795693659/emotion_cover.png",
                backgroundColor:"#fff",
                color:"",
            },
            {   /* 4 */
                content:"",
                background:"https://cdn.discordapp.com/attachments/564015305483878402/1079135782725500928/emotion_book.png",
                backgroundColor:"#fff",
                color:"",
            },
            {   /* 5 */
                content:"",
                background:"https://cdn.discordapp.com/attachments/564015305483878402/1079135782725500928/emotion_book.png",
                backgroundColor:"fff",
                color:"",
            },
            {   /* 8 back-side*/
                content:"",
                background:"https://media.discordapp.net/attachments/564015305483878402/1079755346505121912/emotion_back.png",
                backgroundColor:"#fff",
                color:"",
            },
        ],
    },
    edit: (url.searchParams.get("edit") != null),
	})
            bookIsOpen = true
        } else if (event.data.value === false) {
            if (bookIsOpen) {
                StopBook()
            }
        }
    }
})

$(document).keydown(function(e){
    var previous = 37, next = 39, close = 27, close2 = 8;
    switch (e.keyCode) {
        case previous:
        $('.flipbook').turn('previous');
        break;
        case next:
        $('.flipbook').turn('next');            
        break;
        
        case close:
        Post('http://emotion_book/close')
        break;

        case close2:
        Post('http://emotion_book/close')
        break;
    }
});

function Buy(weapon,isammo) {
    var d = {}
    d.weapon = weapon;
    if (isammo == null) {
        d.isammo = 0
    } else {
        d.isammo = isammo;
    }
    Post('http://emotion_book/purchaseweapon',d)
}

Post = function(url,data) {
    var d = (data ? data : {});
    $.post(url,JSON.stringify(d));
};