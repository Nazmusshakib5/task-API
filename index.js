const app=require('./app')

app.listen(5090,(err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log('running')
    }  
})