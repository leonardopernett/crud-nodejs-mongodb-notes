controller = {}

controller.index = (req,res)=>{
    res.render('index',{
        title:'index',
        path:'index'
    });
}

controller.about = (req,res)=>{
    res.render('about',{
        title:'about',
        path:'about'
    });
}


module.exports= controller;