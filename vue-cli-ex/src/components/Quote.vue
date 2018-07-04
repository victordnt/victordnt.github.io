<template>
    <div class="col-lg-3 col-md-4 col-sm-6">
      <div class="card m-1">
        <div class="card-body quote" @click="deleteQuote()">
          <p class="card-text">{{ quote }}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props: ['quote'],
      methods:{
        deleteQuote(){
          this.$emit('deleteQuote',this.quote)
        }
      },
      beforeDestroy(){
        console.log("this quote was destroyed")
      }
    }
</script>

<style scoped>

  .card-body{
    font: bold 24px 'Arizonia', cursive;
    color: #6e6e6e;
  }
  .quote {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .quote:hover {
    background-color: #ffe2e2;
  }
</style>
