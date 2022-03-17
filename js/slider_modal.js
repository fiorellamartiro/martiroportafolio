var pos = 0;
var img_list = [
    "images/abbott_project/Screenshot (42).png",
    "images/abbott_project/Screenshot (43).png",
    "images/abbott_project/Screenshot (44).png",
    "images/abbott_project/Screenshot (45).png",
    "images/abbott_project/Screenshot (46).png",
    "images/abbott_project/Screenshot (47).png"

]

var total_imgs = img_list.lenght

function change_img() {
    pos++;  
    if(pos === img_list.length){
        pos = 0;
    }

    document.getElementById("modal-img").src = img_list[pos];

}


function back_img() {
    pos--;  
    if(pos <= 0){
        pos = img_list.length - 1;
    }

    document.getElementById("modal-img").src = img_list[pos];
}
