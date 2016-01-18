module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email:{ type: String, required: true },
        tag:{type:Number,default:0},
        role:{type:Number,default:0},
        createDate:{type:Date,required: true}
    },
    company: {
        uId:{ type: String},
        name: { type: String},
        address: { type: String},
        company_tel: { type: String},
        company_fax: { type: String },
        legal_person: { type: String},
        legal_person_id: { type: String},
        agent: { type: String},
        agent_phone: { type: String},
        agent_id: { type: String},
        agent_email: { type: String},
        company_bank: { type: String},
        company_bankNum: { type: String},
        company_taxpayer: { type: String},
        post: { type: String },
        picture1: { type: String},
        picture2: { type: String},
        picture3: { type: String},
        picture4: { type: String},
        picture5: { type: String},
        picture6: { type: String}
    },
    bigtype:{
        name:{ type: String},       //商品大类名字
        smallType:[{name:{type: String},small_id:{type: String}}]
    },
    smalltype:{
        name:{ type: String},       //商品大类名字
        rank:[{name:{type: String},rank_id:{type: String}}]
    },rank:{
        name:{type: String}
    },brand:{
        name:{type: String}
    },packing:{
        name:{type: String}
    },transport:{//运输方式
        name:{type: String}
    },bargain:{//议价形式
        name:{type: String}
    },standard:{//商品标准
        name:{type: String}
    },delivery:{//交货方式
        name:{type: String}
    },payment:{//付款方式
        name:{type: String}
    },unit:{//单位
        name:{type: String}
    },buy_release:{//买家，发布需求信息
        uid:{ type: String },
        uname:{ type: String },
        uemail:{ type: String },
        company:{ type: String },
        hasBuy:{type:Number,default:0},
        type:{ type: String },
        kind:{ type: String },
        payment:{ type: String },
        packing:{ type: String },
        rank:{ type: String },
        brand:{ type: String },
        bargain:{ type: String },
        delivery:{ type: String },
        unit:{ type: String },
        transport:{ type: String },
        needVolume:{ type: Number },
        min_deal:{ type: Number },
        unit_price:{ type: Number },
        address:{ type: String },
        jiaohuo_start:{ type: Date },
        jiaohuo_end:{ type: Date },
        guadan_start:{ type: Date },
        guadan_end:{ type: Date },
        remarks:{ type: String },
        file1:{ type: String },
        date:{ type: Date }
    },buy_attention:{//买家关注
        uid:{ type: String },
        buy_id:{ type: String }
    },sell_release:{//卖家，发布供应信息
        uid:{ type: String },
        uname:{ type: String },
        type:{ type: String },
        kind:{ type: String },
        rank:{ type: String },
        packing:{ type: String },
        brand:{ type: String },
        unit:{ type: String },
        payment:{ type: String },
        bargain:{ type: String },
        delivery:{ type: String },
        min_deal:{ type: Number },
        unit_price:{ type: Number },
        volume:{ type: Number },
        hasSell:{type:Number,default:0},
        address:{ type: String },
        jiaohuo_start:{ type: Date },
        jiaohuo_end:{ type: Date },
        guadan_start:{ type: Date },
        guadan_end:{ type: Date },
        transport:{ type: String },
        standard:{ type: String },
        company:{ type: String },
        file1:{ type: String },
        remarks:{ type: String },
        date:{ type: Date },
        email:{ type: String }
    },sell_attention:{//买家关注
        uid:{ type: String },
        sell_id:{ type: String }
    },order:{//订单
        goods_id:{ type: String },
        buyer_id:{ type: String },
        seller_id:{ type: String },
        goods_kind:{ type: String },
        sell_company:{ type: String },
        buy_company:{ type: String },
        volume:{ type: Number },
        unit_price:{ type: Number },
        unit_price1:{ type: Number,default:0 },
        volume1:{ type: Number,default:0 },
        unit_price2:{ type: Number,default:0 },
        volume2:{ type: Number,default:0 },
        order_status:{ type: String,default:"洽谈中" },
        role:{ type: Number },   //0为buy_release，1为sell_release
        remarks:{ type: String },
        over:{ type: Number,default:0 },//0为未完成，1为订单已经完成，即作为合同
        order_date:{ type: Date }
    },contract:{
        buyCompany:{ type: String },
        sellCompany:{ type: String },
        kind:{ type: String },
        orderId:{ type: String },
        buyerId:{ type: String },
        sellerId:{ type: String }, 
        buyerTag:{ type: Number,default:0 }, //买家有没有签订合同，0未签，1签订
        sellerTag:{ type: Number,default:0 },//卖家有没有签订合同，0未签，1签订
        over:{ type: Number,default:0 },     //当俩家同时签订了，合同才生效，为1 
        date:{ type:Date }
    },chatRcord:{
        order_id: {type: String},
        who:{type: Number},          //who send this message,0 is buyer,1 is seller
        userName: {type: String},    //auther of message
        tag:{type: Number, default:0},//0 represent not been seen
        information:{type: String},
        time:{type: String}
    },cart:{
        uId: { type: String },
        cId: { type: String },
        cName: { type: String },
        cPrice: { type: String },
        cImgSrc: { type:String } ,
        cQuantity: { type: Number },
        cStatus : { type: Boolean, default: false  }
    }
};
