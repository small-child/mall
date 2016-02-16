module.exports = function ( app ) {


	var multer  = require('multer');

	app.get('/company_information',function(req,res){
        if(req.session.user){
            res.render('company_information');
        }else{
            res.redirect('login');
        }
    });
    
    // 获取信息，传到前端进行信息显示
    app.get('/company_information1',function(req,res){
        var company = global.dbHelper.getModel('company');
        if(req.session.user){
            company.find({uId:req.session.user._id},function(err,doc){
                if (err) {
                    console.log(err);
                } else{
                    res.json(doc);
                    // console.log(typeof doc);
                };
            })
        }else{
            res.redirect('login');
        }
    });


    var upload = multer({ dest:'public/picture/certification/'});
    // var upload = multer({ dest:'C:/picture/certification/'});

	app.post('/company_information',upload, function (req, res, next) {

        var company_fax,agent_email,post;
        company_fax = req.body.company_fax==undefined ? '未输入' : req.body.company_fax;
        agent_email = req.body.agent_email==undefined ? '未输入' : req.body.agent_email;
        company_bank = req.body.company_bank==undefined ? '未输入' : req.body.company_bank;
        company_bankNum = req.body.company_bankNum==undefined ? '未输入' : req.body.company_bankNum;
        post = req.body.post==undefined ? '未输入' : req.body.post;
        if (req.files.file2) {
            picture2 = req.files.file2.name;
        } else{
            picture2 = 'none';
        }

        if (req.files.file3) {
            picture3 = req.files.file3.name;
        } else{
            picture3 = 'none';
        }

        if (req.session.user) {
            // console.log(1);
            var company = global.dbHelper.getModel('company'),
                uid = req.session.user._id;
                company.find({uId:uid},function(err,doc) {
                    if (err) {
                        console.log('net failure');
                    }else {
                        company.update({uId:uid},{
                            uId:uid,
                            name: req.body.name,
                            address: req.body.address,
                            company_tel: req.body.company_tel,
                            company_fax: company_fax,
                            legal_person: req.body.legal_person,
                            legal_person_id: req.body.legal_person_id,
                            agent: req.body.agent,
                            agent_phone: req.body.agent_phone,
                            agent_id: req.body.agent_id,
                            agent_email: agent_email,
                            company_bank: company_bank,
                            company_bankNum: company_bankNum,
                            company_taxpayer: req.body.company_taxpayer,
                            post:post,
                            picture1:req.files.file1.name,
                            picture2:picture2,
                            picture3:picture3
                        },{upsert:true},function (err,doc) {
                            if(err){
                                console.log(err);
                            }else{
                                // console.log(doc);
                                res.json(0);
                            }
                        })
                    };
                })

        } else{
            res.redirect('login');
        };
    })


    
    app.post('/company_information0',upload, function (req, res, next) {
        if (req.files.file4) {
            picture4 = req.files.file4.name;
        } else{
            picture4 = 'none';
        }
        if (req.files.file5) {
            picture5 = req.files.file5.name;
        } else{
            picture5 = 'none';
        }
        if (req.files.file6) {
            picture6 = req.files.file6.name;
        } else{
            picture6 = 'none';
        }
        if (req.session.user) {
            var company = global.dbHelper.getModel('company'),
                uid = req.session.user._id;
                company.find({uId:uid},function(err,doc) {
                    if (err) {
                        console.log('net failure');
                    }else {
                        company.update({uId:uid},{
                            picture4:picture4,
                            picture5:picture5,
                            picture6:picture6
                        },{upsert:true},function (err,doc) {
                            if(err){
                                console.log(err);
                            }else{
                                console.log(doc);
                                // res.json(00);
                            }
                        })
                    };
                })

        } else{
            res.redirect('login');
        };
        
    })
}
