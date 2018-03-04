
$(document).ready(function(){ 	
    $('.modal').modal();
});



Vue.component('assignments', {
  props: ['entry', 'isrequired'],
  template:"#assignment-template"
})


var app = new Vue({
  el: '#app',
  data: {
    locked: true,
    points: 0,
    keys: 0,
    assignmentList: [
      {id:1, title:"Task 1", description:"Write an essay!", required:true, points:50, submitted:false},
	  {id:2, title:"Task 2", description:"Write another essay!", required:true, points:50, submitted:false},
	  {id:3, title:"Quiz", description:"Take a quiz!", required:false, points:20, submitted:false},
	  {id:4, title:"Quiz", description:"Take an alternative quiz!", required:false, points:20, submitted:false}
    ],
    currAssignId: 5
  },
  methods: {
    submitAssign: function() {
        this.points = this.points +5;
        if (this.points === 20) {
            this.locked = false;
        }
        console.log("submit clicked!!");
    },
    createAssign: function() {
        this.assignmentList.push({id:this.currAssignId++, title:"Task 5", description:"Just do... something", required:false, points:5, submitted:false});
        console.log("pressed create button!");
    }
  }

})


