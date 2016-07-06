(function (dc, wd) {
    function Dialog(setting){
        var config = {
            'type':'alert', //alert | confirm | delay
            'title':'默认标题',
            'content':'这是一段默认的内容啊,这是一段默认的内容啊,这是一段默认的内容啊,这是一段默认的内容啊,这是一段默认的内容啊!'
        };

        if(setting){
            for(var i in setting){
                config[i] = setting[i];
            }
        }

        this.init(config);
    }

    Dialog.prototype = {
        tpl: 
            '<div id="jw-dialog" class="jw-dialog-main">' +
                '<p class="jw-dialog-title">{{title}}</p>' +
                '<p class="jw-dialog-content">{{content}}</p>' +
                '<p id="jw-dialog-footer" class="jw-dialog-footer">' +
                    '<span id="btn-ok" class="btn-ok">确定</span>' +
                    '<span id="btn-cancel" class="btn-cancel">取消</span></p>' +
            '</div>',
        
        init: function(config){
            if(!dc.getElementById('jw-dialog')){
                var div = dc.createElement('div');
                div.innerHTML = this.wrap(this.tpl, config);
                div.classList.add('jw-dialog-wrapper');
                dc.body.appendChild(div);
            }

            this.dialog = dc.getElementById('jw-dialog');
            this.wrapper = this.dialog.parentNode;
            this.footer = dc.getElementById('jw-dialog-footer');
            this.btnOk = dc.getElementById('btn-ok');
            this.btnCancel = dc.getElementById('btn-cancel');
            this.dialogResult = false;

            this.switchType(config.type);
            this.addEvents();
        },

        wrap: function(html, data){
            return html.replace(/{{(\w+)}}/g, function(item, a){
                return data[a];
            });
        },

        switchType: function(type){
            if(type){
                if(type === 'alert'){
                    this.footer.classList.remove('no');
                    this.btnCancel.classList.add('no');
                }else if(type === 'confirm'){
                    this.footer.classList.remove('no');
                    this.btnCancel.classList.remove('no');
                }else if(type === 'delay'){
                    this.footer.classList.add('no');
                    var that = this;
                    setTimeout(function(){
                        that.close();
                    }, 1000);
                }
            }

            this.wrapper.classList.remove('no');
        },

        close: function(){
            dc.getElementById('jw-dialog').parentNode.classList.add('no');
        },

        addEvents: function(){
            var that = this;
            this.wrapper.onclick = function(){
                that.close();
            };
            this.btnOk.onclick = function(){
                that.close();
                that.dialogResult = true;
            };
            this.btnCancel.onclick = function(){
                that.close();
            };
        },
    }

    wd.Dialog = Dialog;
})(document, window);