var pos = 0;
var img_list = [
    "images/illustrador/cuarto.jpg",
    "images/illustrador/cuartohoodie.jpg",
    "images/illustrador/frente.jpg",
    "images/illustrador/primero.jpg",
    "images/illustrador/primerohoodie.jpg",
    "images/illustrador/quinto.jpg",
    "images/illustrador/quintohoodie.jpg",
    "images/illustrador/segundo.jpg",
    "images/illustrador/segundohoodie.jpg",
    "images/illustrador/tercerhoodie.jpg",
    "images/illustrador/tercero.jpg"

]

var total_imgs = img_list.lenght

function change_img2() {
    pos++;  
    if(pos === img_list.length){
        pos = 0;
    }

    document.getElementById("modal-img2").src = img_list[pos];

}


function back_img2() {
    pos--;  
    if(pos <= 0){
        pos = img_list.length - 1;
    }

    document.getElementById("modal-img2").src = img_list[pos];
}
