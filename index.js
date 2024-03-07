const app=require('./app')

app.listen(5060,(err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log('running')
    }  
})