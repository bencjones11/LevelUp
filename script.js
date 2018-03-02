var app = new Vue({
  el: '#app',
  data: {
    locked: true,
    points: 0,
},
methods: {
    submitAssign: function() {
        this.points = this.points +5;
        if (this.points === 20) {
            this.locked = false;
        }
    }
}

})

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});