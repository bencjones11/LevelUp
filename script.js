
$(document).ready(function(){ 	
    $('.modal').modal();
    $('select').material_select();
});



Vue.component('assignments', {
  props: ['entry', 'id', 'isrequired', 'submitted'],
  template:"#assignment-template",
  methods: {
    openAssign() {
        console.log("pressed open assignment button on id=%i!", this.id);
        this.$emit('update-curr-open-assignment-id', this.id);
    }
  }
})

Vue.component('create-assignment', {
  data() {
    return {
      
        title: '',
        desc: '',
        points: '',
        required: ''
      
    }
  },
  template:"#create-assignment-template",
  methods: {
    createAssign() {
        console.log("pressed create assignment button with title=%s!", this.title);
        this.$emit('create-assignment', this.title, this.desc, parseInt(this.points), this.required);
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    locked: true,
    points: 0,
    keys: 0,
    pointsToUnlock: 120,
    keysToUnlock: 2,
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
        if (this.points >= this.pointsToUnlock && this.keys >= this.keysToUnlock) {
            this.locked = false;
        }
    },
    addNewAssign(newTitle, newdesc, newpoints, newrequired) {
        this.assignmentList.push({id:this.newestAssignId++, title:newTitle, description:newdesc, required:newrequired, points:newpoints, submitted:false});
        if(newrequired){
            this.keysToUnlock++;
            this.pointsToUnlock += newpoints;
        }
        console.log("pressed create button!");
    },
    updateCurrOpenAssignmentId(arg) {
        console.log("caught event!");
        this.currOpenAssignmentId = arg;
    }
  }

})


