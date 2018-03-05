
$(document).ready(function(){ 	
    $('.modal').modal();
    $('select').material_select();
});



var assignmentComponent = Vue.component('assignments', {
  props: ['entry', 'id', 'isrequired', 'submitted'],
  template:"#assignment-template",
  methods: {
    openAssign() {
        console.log("pressed open assignment button on id=%i!", this.id);
        this.$emit('update-curr-open-assignment-id', this.id);
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    locked: true,
    points: 0,
    keys: 0,
    assignmentList: [
      {id:0, title:"Task 1", description:"Write an essay!", required:true, points:50, submitted:false},
	  {id:1, title:"Task 2", description:"Write another essay!", required:true, points:50, submitted:false},
	  {id:2, title:"Quiz", description:"Take a quiz!", required:false, points:20, submitted:false},
	  {id:3, title:"Quiz", description:"Take an alternative quiz!", required:false, points:20, submitted:false}
    ],
    newestAssignId: 4,
    currOpenAssignmentId: -1
  },
  methods: {
    submitAssign() {
        console.log("submit clicked!!");
        
        var currAssign = this.assignmentList[this.currOpenAssignmentId];
        
        if(!currAssign.submitted){
            this.points += currAssign.points;
            if(currAssign.required){
                this.keys += 1;
            }
        }

        currAssign.submitted = true;
        if (this.points >= 20 && this.keys >= 2) {
            this.locked = false;
        }
    },
    createAssign() {
        this.assignmentList.push({id:this.newestAssignId++, title:"Task 5", description:"Just do... something", required:false, points:5, submitted:false});
        console.log("pressed create button!");
    },
    updateCurrOpenAssignmentId(arg) {
        console.log("caught event!");
        this.currOpenAssignmentId = arg;
    }
  }

})


