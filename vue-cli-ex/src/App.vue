<template>
  <div class="container component">

    <div class="quoteMeter">
      <h2>Quotes Added</h2>
      <div class="healthbar">
        <div class="healthbar text-center" style="background-color: steelblue; margin: 0; color: white; " :style="{width:quotes.length+'0%'}">
          <p style="padding: 8px;">{{ quotes.length }}/10</p>
        </div>
      </div>
    </div>

    <div class="writeQuote">
      <div class="col-12">
        <div class="m-auto col-8">

          <label for="newQuote">
            <h5>Quote</h5>
          </label>
          <textarea id="newQuote" style="width: 100%; height: 130px; " v-model="newQuote" @keyup.enter="addQuote"></textarea>

          <div class="col-md-12">
            <div class="text-center">
              <button class="btn btn-primary" @click="addQuote">Add Quote</button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="quotes col-md-12 ">
      <div class="row m-2">
        <app-quote v-for="quote in quotes" :quote="quote" @deleteQuote="del($event)"></app-quote>
      </div>
    </div>
    <div class="col-12">
      <div class="card text-white bg-info m-1">
        <div class="card-header">Info:</div>
        <div class="card-body quote text-center">
          <p class="card-text" >Click on a quote to delete it.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Quote from "./components/Quote";
  export default {
    data(){
      return {
        quotes:[],
        newQuote:'',
      }
    },
    methods:{
      addQuote(){
        let newQuote = this.newQuote.trim();
        if(this.quotes.length>=10)
          alert("You can only insert 10 quotes!");
        if(newQuote && this.quotes.length<10){
          this.quotes.push(newQuote);
          this.newQuote = '';
        }
      },
      del(q){
        this.quotes.splice(this.quotes.indexOf(q),1)
      }
    },
    components:{
      appQuote: Quote,
    },
  }
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import "https://fonts.googleapis.com/css?family=Arizonia";

  .component{
    margin-top: 30px;
  }
  .healthbar {
    width: 100%;
    height: 40px;
    background-color: #eee;
    transition: width 500ms;
    border-radius: 4.5px;
  }
  .btn-primary {
    background-color: steelblue;
  }

</style>
