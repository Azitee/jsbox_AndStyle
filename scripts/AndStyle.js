const changedAttribute={button:{title:"text",titleColor:"textColor"}};const constants={changedAttribute}
const shadow=(view,opacity,shadowRadius,offset,color)=>{var layer=view.runtimeValue().invoke("layer");layer.invoke("setShadowOffset",offset);layer.invoke("setShadowColor",$color(color).runtimeValue().invoke("CGColor"));layer.invoke("setShadowOpacity",opacity);layer.invoke("setShadowRadius",shadowRadius);layer.invoke("setMasksToBounds",false);};const getId=(()=>{var time=0;return()=>{time++;return"andstyle_id_"+time;};})();const setId=(id,type)=>{window.id[id]=type;};const getTypeById=id=>{return window.id[id];};const changeValue={list:{data:value=>{return value.map(item=>{if(item.rows){item.rows=item.rows.map(t=>{if(typeof t==="string"){return{title:{text:t}};}else return t;});return item;}else{if(typeof item==="string"){return{title:{text:item}};}else return item;}});}}};const setAttribute=(view,attribute,value)=>{let type=getTypeById(view.id),attributes=constants.changedAttribute;if(type=="list"&&attribute=="data"){value=changeValue.list.data(value);}
if(attributes[type]){let changedKey=attributes[type][attribute];if(changedKey){view[changedKey]=value;return;}}
view[attribute]=value;};const utils={getId,setId,getTypeById,setAttribute,changeValue,shadow};class Ripple{constructor(){let obj=arguments[0]||{};this.type="canvas";this.props={id:utils.getId(),info:0,alpha:obj.alpha||0.5};this.events={draw:(view,ctx)=>{ctx.fillColor=obj.color||$color("white");ctx.beginPath();ctx.addArc(view.frame.width/2,view.frame.height/2,view.info/2,0,Math.PI*2,false);ctx.fillPath();}};this.addClearView=obj.addClearView;this.tappedHandler=obj.tappedHandler;this.longPressedHandler=obj.longPressedHandler;this.duration=obj.duration||0.8;this.longPressedStopDuration=obj.longPressedStopDuration||0.5;this.size=obj.size||4.1;this.index=obj.index||Infinity;this.completionHandler=obj.completionHandler||new Function();}
start(sourceView,location){this.props.frame=$rect(location.x,location.y,0,0);this.props.info=Math.sqrt((sourceView.frame.height*sourceView.frame.width)/Math.PI)*2*this.size;let views=sourceView.views;try{if(views[views.length-1].id!="ClearView"&&this.addClearView!=false)
throw null;}catch(error){sourceView.add({type:"view",props:{id:"ClearView"},layout:$layout.fill});}finally{sourceView.insertAtIndex($ui.create(this),!isFinite(this.index)?views.length-1+(views.length==0?1:0):this.index);}
this.sourceView=sourceView;$ui.animate({duration:this.duration,animation:()=>{$(this.props.id).frame=$rect(location.x-this.props.info/2,location.y-this.props.info/2,this.props.info,this.props.info);},completion:()=>{this.longPressed=true;if(!this.stopped&&this.longPressedHandler){this.stop();this.longPressedHandler(sourceView);}}});}
stop(cancel){if(this.stopped)return;let id=this.props.id;$ui.animate({duration:this.longPressed?this.longPressedStopDuration:this.duration,animation:()=>{$(id).alpha=0;},completion:()=>{$(id).remove();this.completionHandler();}});if(!cancel&&this.tappedHandler)this.tappedHandler(this.sourceView);this.stopped=true;}
moved(location){let frame=this.sourceView.frame;if(location.x>frame.width||location.x<0||location.y>frame.height||location.y<0){this.stop(true);this.stopped=true;}}}
module.exports.alert=obj=>{if(typeof obj=="string")
obj={message:obj,actions:[{title:$l10n("OK"),handler:()=>{module.exports.dismissAlert()}}]};$ui.window.super.super.super.super.add({type:"view",props:{id:"mask",alpha:0,bgcolor:$rgba(0,0,0,0.3)},layout:$layout.fill,views:[{type:"view",props:{bgcolor:obj.bgcolor||$color("white"),radius:20},layout:(make,view)=>{utils.shadow(view,0.7,10,$size(0,0),obj.shadowColor||"darkGray");make.center.equalTo(view.super);if($device.info.screen.width>500){make.width.equalTo(500);}else make.right.left.inset(20);make.height.equalTo(300);},views:[{type:"label",props:{text:obj.message,textColor:obj.textColor||$color("black"),lines:0,font:$font(18)},layout:(make,view)=>{make.left.right.inset(25);make.top.inset(20);},events:{ready:sender=>{sender.super.updateLayout((make,view)=>{make.height.equalTo($text.sizeThatFits({text:obj.message,width:sender.super.width-50,font:$font(18)}).height+85);});}}},{type:"button",props:{title:obj.actions[0].title,bgcolor:$color("clear"),font:obj.actions[0].font||$font("bold",17),titleColor:obj.actions[0].color||$color("tint")},layout:(make,view)=>{make.right.inset(25);make.bottom.inset(10);},events:{tapped:sender=>{try{obj.actions[0].handler(sender);}catch(err){console.warn(err.message);}}}}]}]});if(obj.actions[1])
$("mask").views[0].add({type:"button",props:{title:obj.actions[1].title,bgcolor:$color("clear"),font:obj.actions[1].font||$font(17),titleColor:obj.actions[1].color||$color("tint")},layout:(make,view)=>{make.right.equalTo(view.prev).offset(-60);make.bottom.inset(10);},events:{tapped:sender=>{try{obj.actions[1].handler(sender);}catch(err){console.warn(err.message);}}}});$ui.animate({duration:0.3,animation:()=>{$("mask").alpha=1;}});};module.exports.dismissAlert=()=>{$ui.animate({duration:0.3,animation:()=>{$("mask").alpha=0;},completion:()=>{$("mask").remove();}});};module.exports.startLoading=(color=$color("tint"),bgcolor=$color("white"))=>{var location=0;$ui.window.super.add({type:"",props:{id:"lodingView",alpha:0,bgcolor:$color("clear")},layout:$layout.fill,views:[{type:"view",props:{bgcolor:bgcolor,radius:20},layout:function(make,view){utils.shadow(view,0.7,10,$size(0,0),"gray");make.center.equalTo(view.super);make.size.equalTo(100);},views:[{type:"canvas",props:{id:"loadingCanvas"},layout:$layout.fill,events:{draw:function start(view,ctx){ctx.strokeColor=color;ctx.setLineWidth(5);ctx.addArc(view.frame.width/2,view.frame.height/2,20,location,Math.PI*2*0.8+location,false);ctx.strokePath();}}}]}]});let timer=$timer.schedule({interval:0.005,handler:()=>{location=location+0.06;if(!$("lodingView")){timer.invalidate();return;}
$("loadingCanvas").runtimeValue().invoke("setNeedsDisplay");}});$ui.animate({duration:0.4,animation:()=>{$("lodingView").alpha=1;}});};module.exports.stopLoading=()=>{$ui.animate({duration:0.4,animation:function(){$("lodingView").alpha=0;},completion:function(){$("lodingView").remove();}});};module.exports.hintView=async(title,buttonTitle,text,buttonTappedHandler,completionHandler)=>{window.hintView_buttonTapped=false;var label=$ui.create({type:"label",props:{text:text,font:$font("bold",17),lines:0}});var BaseHintView=$objc("BaseHintView").invoke("alloc.initWithText:buttonText",title,buttonTitle);var bgView=BaseHintView.invoke("subviews.objectAtIndex",1);var textView=bgView.invoke("subviews.objectAtIndex",1).jsValue();textView.font=$font("bold",23);textView.align=$align.center;textView.selectable=false;textView.add(label);return new Promise(resolve=>{BaseHintView.invoke("setButtonTappedHandler",$block("void",()=>{window.hintView_buttonTapped=true;buttonTappedHandler?buttonTappedHandler():void 0;return resolve("tapped");}));BaseHintView.invoke("setCompletionHandler",$block("void",()=>{window.hintView_buttonTapped||(completionHandler?completionHandler():void 0);return resolve("canceled");}));BaseHintView.invoke("show");var textViewFrame=textView.frame;var textHeight=$text.sizeThatFits({text:text,width:textView.frame.width-20,font:$font("bold",17)}).height;label.frame=$rect(10,50,textViewFrame.width-10,textHeight);textView.contentSize=$size(textViewFrame.width,textHeight+50);textView.frame=$rect(0,10,textViewFrame.width,textViewFrame.height-20);});};class Base{constructor(obj){this.type=obj.type;this.views=obj.views||[];if(obj.layout)this.layout=obj.layout;this.events={};if(obj.props){this.props=obj.props;this.props.id=obj.props.id||utils.getId();}else this.props={};let events=obj.events;if(events)
Object.keys(events).map(key=>{switch(obj.type){case"button":if(key!="tapped"&&key!="longPressed")
this.events[key]=events[key];break;default:this.events[key]=events[key];}});}}
class Input extends Base{constructor(obj){obj.type="input";super(obj);let view=$ui.create(obj),props=obj.props||{},events=obj.events||{};this.props.bgcolor=$color("clear");this.views.push({type:"view",props:{id:"line",bgcolor:props.lineColor||$color("#E3E3E3")},layout:function(make,view){make.right.left.inset(3);make.height.equalTo(props.lineWidth||1);make.bottom.inset(props.lineWidth||1);}});this.events.didBeginEditing=sender=>{if(events.didBeginEditing)events.didBeginEditing(sender);sender.views.forEach((item,index)=>{if(item.id=="line")
$ui.animate({duration:0.3,animation:function(){sender.views[index].bgcolor=props.selectedLineColor||$color("tint");}});});};this.events.didEndEditing=sender=>{if(events.didEndEditing)events.didEndEditing(sender);sender.views.forEach((item,index)=>{if(item.id=="line")
$ui.animate({duration:0.3,animation:function(){sender.views[index].bgcolor=props.lineColor||$color("#E3E3E3");}});});};}}
class ViewPager extends Base{constructor(obj){(obj.type="scroll"),super(obj);let view=$ui.create(obj),props=obj.props||{},events=obj.events||{};Object.assign(this.props,{alwaysBounceVertical:false,showsVerticalIndicator:false,showsHorizontalIndicator:false,pagingEnabled:true});this.events.ready=sender=>{if(events.ready)events.ready(sender);let frame=sender.frame;props.pages.forEach((item,index)=>{if(item.layout)delete item.layout;item.type="view";item.props.frame=$rect(index*frame.width,0,frame.width,frame.height);sender.add(item);});sender.contentSize=$size(frame.width*props.pages.length,frame.height);if(props.index)
sender.scrollToOffset($point(props.index*frame.width,0));};if(props.setupWithTabLayout)
this.events.didScroll=sender=>{if(events.didScroll)events.didScroll(sender);let offset=sender.contentOffset.x,frame=sender.frame,TabLayout=$(props.setupWithTabLayout).info;if(offset<0||offset/-1>frame.width)return;TabLayout.tabsId.forEach((id,index)=>{$(id).textColor=TabLayout.tabTextColor;if(offset==index*frame.width)
$(id).textColor=TabLayout.tabSelectedTextColor;});$(TabLayout.indicatorId).updateLayout(make=>{make.left.equalTo(offset/props.pages.length);});};utils.setId(this.props.id,"viewpager");}}
class TabLayout extends Base{constructor(obj){obj.type="view";super(obj);let view=$ui.create(obj),props=obj.props||{},events=obj.events||{},indicatorId=utils.getId();this.props.info={tabSelectedTextColor:props.tabSelectedTextColor||$color("white"),tabTextColor:props.tabTextColor||$rgba(255,255,255,0.5),indicatorId:indicatorId,tabsId:[utils.getId(),utils.getId(),utils.getId()]};this.index=props.index||0;this.views=obj.views||[];props.tabs.forEach((item,index)=>{this.views.push({type:"label",props:{id:this.props.info.tabsId[index],text:item,textColor:index==this.index?this.props.info.tabSelectedTextColor:this.props.info.tabTextColor,bgcolor:$color("clear"),align:$align.center,font:props.tabTextFont||$font(18),userInteractionEnabled:true,clipsToBounds:true},layout:(make,view)=>{make.top.inset(0);make.bottom.inset(0);make.left.equalTo(index==0?0:view.prev.right);make.width.equalTo(view.super).dividedBy(props.tabs.length);},events:{touchesBegan:(sender,location)=>{window.ripple=new Ripple({duration:0.5,alpha:0.5});window.ripple.start(sender,location);},touchesMoved:(sender,location)=>{window.ripple.moved(location);},touchesEnded:()=>{window.ripple.stop();},tapped:sender=>{try{this.events.onTabSelected(index,sender.text);}catch(error){console.error(err.message);}
if(props.setupWithViewPager){$(props.setupWithViewPager).scrollToOffset($point(index*$(props.setupWithViewPager).frame.width,0));}else
$(indicatorId).updateLayout((make,view)=>{make.left.inset(index*(view.super.frame.width/this.props.tabs.length));});window.ripple.stop();}}});});this.views.push({type:"view",props:{id:indicatorId,bgcolor:props.tabIndicatorColor||$color("white")},layout:(make,view)=>{make.bottom.left.equalTo(0);make.width.equalTo(view.super).dividedBy(props.tabs.length);make.height.equalTo(props.tabIndicatorHeight||3);},events:{ready:sender=>{sender.updateLayout((make,view)=>{make.left.inset(this.index?this.index*view.frame.width:0);});}}});utils.setId(this.props.id,"tablayout");}}
class Slider extends Base{constructor(obj){obj.type="slider";super(obj);let view=$ui.create(obj),props=obj.props||{},events=obj.events||{},color=props.thumbColor||$color("tint");let thumbImage=$imagekit.circular($imagekit.render({size:$size(10,10),color:color}));this.props.thumbImage=thumbImage;this.events.touchesBegan=(sender,location)=>{if(events.touchesBegan)events.touchesBegan(sender,location);sender.thumbImage=$imagekit.circular($imagekit.render({size:$size(15,15),color:color}));};this.events.touchesEnded=(sender,location)=>{if(events.touchesEnded)events.touchesEnded(sender,location);sender.thumbImage=thumbImage;};utils.setId(this.props.id,"slider");}}
class SettingList extends Base{constructor(obj){obj.type="list";super(obj);let view=$ui.create(obj),props=obj.props||{},events=obj.events||{};if(!props.template){this.props.template=[{type:"label",props:{id:"title",font:$font(16)},layout:function(make,view){make.left.inset(15);make.centerY.equalTo(view.super);}},{type:"canvas",layout:function(make,view){make.right.inset(10);make.centerY.equalTo(view.super);make.width.equalTo(8);make.height.equalTo(13);},events:{draw:function(view,ctx){var X=view.frame.width-2;var Y=view.frame.height;ctx.strokeColor=$color("#C7C7CC");ctx.moveToPoint(0,0);ctx.setLineWidth(2);ctx.addLineToPoint(X,Y*0.5);ctx.addLineToPoint(0,Y);ctx.strokePath();}}}];this.props.data=props.data?utils.changeValue.list.data(props.data):[];}
utils.setId(this.props.id,"list");}}
class Spinner extends Base{constructor(obj){obj.type="spinner";let view=$ui.create(obj);super(obj,view);let props=obj.props||{},events=obj.events||{};this.type="canvas";this.props.info={location:3,y:0.1};this.events.draw=(canvas,ctx)=>{let lineWidth=props.lineWidth||3;ctx.strokeColor=props.color||$color("black");ctx.setLineWidth(lineWidth);ctx.addArc(canvas.frame.width/2,canvas.frame.height/2,canvas.frame.width/2-lineWidth,canvas.info.location,Math.PI*2*canvas.info.y+canvas.info.location,false);ctx.strokePath();};this.events.ready=async sender=>{if(events.ready)events.ready(sender);let location=3,length=0.1,x=length,y=length,mode=0,b=0,a,timer;function createTimer(){timer=$timer.schedule({interval:props.speed||0.01,handler:()=>{location+=0.05;if(mode==0){x+=0.05;a=spinnerFunction(x);if(a<length)a=length;y=a;}else{x+=0.05;a=spinnerFunction(x);if(a<0)a=0;y-=a-b;location+=(a-b)*2+0.047;b=a;}
if(mode==0&&1-length-y<=0.08){x=length;mode=1;b=0;}
if(mode==1&&y-length<=0.01){x=length;mode=0;}
if(!sender.super)timer.invalidate();sender.info={location:location,y:y};sender.runtimeValue().invoke("setNeedsDisplay");}});}
function spinnerFunction(x){return((Number((-1/Math.pow(Math.sqrt(2),x+(-2*Math.log(7))/Math.log(2))).toFixed(2))+
7)/7-
length);}
createTimer();};utils.setId(this.props.id,"spinner");}}
class Button extends Base{constructor(obj){obj.type="button";let view=$ui.create(obj);if(obj.props.icon)return obj;super(obj,view);let props=obj.props||{},events=obj.events||{};this.type="label";Object.assign(this.props,{text:props.title||"",radius:view.radius,align:props.align||$align.center,textColor:view.titleColor,bgcolor:view.bgcolor,clipsToBounds:true,userInteractionEnabled:true});let ripple_attributes={tappedHandler:events.tapped,longPressedHandler:events.longPressed};Object.keys(props).map(key=>{if(key.indexOf("ripple_")==0)
ripple_attributes[key.replace("ripple_","")]=props[key];});Object.assign(this.events,{touchesBegan:(sender,location)=>{window.ripple=new Ripple(ripple_attributes);window.ripple.start(sender,location);if(events.touchesBegan)events.touchesBegan();},touchesMoved:(sender,location)=>{window.ripple.moved(location);if(events.touchesMoved)events.touchesMoved();},touchesEnded:()=>{window.ripple.stop();if(events.touchesEnded)events.touchesEnded();}});if(events.doubleTapped)
this.events.doubleTapped=sender=>{events.doubleTapped();window.ripple.stop();};utils.setId(this.props.id,"button");}}
const components={Button,Spinner,SettingList,Slider,TabLayout,ViewPager,Input};window.ripple=window.ripple||null;window.id=window.id||{};const changeStyle=(views=[])=>{let oldView=views;if(views.rows)views=views.rows;if(typeof views==="object")
for(i in views){var item=views[i];if(item.views)item.views=changeStyle(item.views);if(item.props){if(item.props.data)
for(i in item.props.data){item.props.data[i]=changeStyle(item.props.data[i]);}
if(item.props.template)
for(i in item.props.template){item.props.template[i]=changeStyle(item.props.template[i]);}}
if(item.rows)item.rows=changeStyle(item.rows);if(item.type&&item.type.indexOf("andstyle_")==0){switch(item.type.replace("andstyle_","")){case"button":item=new components.Button(item);break;case"spinner":item=new components.Spinner(item);break;case"slider":item=new components.Slider(item);break;case"input":item=new components.Input(item);break}}
switch(item.type){case"SettingList":item=new components.SettingList(item);break;case"TabLayout":item=new components.TabLayout(item);break;case"ViewPager":item=new components.ViewPager(item);break;}
views[i]=item;}
if(oldView.rows)oldView.rows=views;return oldView;};const renderObjToViews=obj=>{let views=obj.views;if(views)obj.views=changeStyle(views);return obj;};const render=obj=>{$ui.render(renderObjToViews(obj));},push=obj=>{$ui.push(renderObjToViews(obj));};Object.assign(module.exports,{Ripple,render,push,changeStyle,Button:components.Button,Spinner:components.Spinner,Slider:components.Slider,SettingList:components.SettingList,TabLayout:components.TabLayout,ViewPager:components.ViewPager,Input:components.Input,setAttribute:utils.setAttribute})
/* v1.0.0   by Azite */
