function toggleClassName(){
    const sidebarElt = document.querySelector(".sidebar");
    const openElt = document.getElementById('open');
    const closeElt = document.getElementById('close');

    sidebarElt.classList.toggle('active');

    if(sidebarElt.classList.contains('active')){
        openElt.style.display = "none";
        closeElt.style.display = "block";
    }
    else{
        openElt.style.display = "block";
        closeElt.style.display = "none";
    }
}
