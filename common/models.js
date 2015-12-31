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
    },sell_release:{
        uid:{ type: String },
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
        date:{ type: Date }
    },
    cart:{
        uId: { type: String },
        cId: { type: String },
        cName: { type: String },
        cPrice: { type: String },
        cImgSrc: { type:String } ,
        cQuantity: { type: Number },
        cStatus : { type: Boolean, default: false  }
    }
};
