//未找到可以使用的地方

function EventTarget(){
	this.handlers={};
}
        
EventTarget.prototype={
	constructor:EventTarget,
    
	addHandler:function(type,handler){
    	if(typeof this.handlers[type]=='undefined'){
    	    this.handlers[type]=new Array();
        }
        this.handlers[type].push(handler);
        },
        
	removeHandler:function(type,handler){
		if(this.eventHandlers[type] instanceof Array){
			var eventHandlers=this.eventHandlers[type];
			for(var i=0,len=eventHandlers.length;i<len;i++){
				if(eventHandlers[i]==handler){
					eventHandlers.splice(i,1);
					break;
				}
			}
		}
	},
	trigger:function(e){
		if(!e.target){
			e.target=this;
		}
		if(this.handlers[e.type] instanceof Array){
			var eventHandlers=this.handlers[e.type];
			for(var i=0,len=eventHandlers.length;i<len;i++){
				eventHandlers[i](e);
			}
		}
	}
}
