$(function () {
  
    var currentPlayer = 1; 
    var arrP1 = [];
    var arrP2 = [];

   var $btnG = $(".btnGrid");

    $btnG.click(function(){
        console.log($btnG);
        
        if (currentPlayer===1) {
            arrP1.push(+$(this).val());
            currentPlayer = 2;
            this.innerText = 'X';
            console.log(arrP1); 
        } else {
            arrP2.push(+$(this).val());
            currentPlayer = 1;
            this.innerText='O';
            console.log(arrP2);
        }
    });


});
