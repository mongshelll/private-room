/*
    window load
*/
$(window).on('load',function(){
    deviceSet.init();
    modeSet.init();
    maxViewSize()
    
});


/*
    window resize
*/
$(window).on('resize',function(){    
    maxViewSize()    
});


/*
    global variable
*/ 
var svDeviceMbData = ['iPhone SE','iPhone 5','iPhone 11','iPhone 13','iPhone X','iPhone 13 Pro Max','Galaxy S10','Galaxy S20+','Galaxy Note20','Galaxy Fold'];
var svDeviceTabData = ['iPad mini','iPad','iPad Air 3','iPad Air 4','iPad Pro','Galaxy Tab S7'];
var svDeviceDetailData = [
    {
        type: 'mobile', 
        os: 'ios',   
        name: svDeviceMbData[0],       
        width: 375,
        height: 667,        
    },
    {
        type: 'mobile',
        os: 'ios',        
        name: svDeviceMbData[1],       
        width: 320,
        height: 568, 
    },
    {
        type: 'mobile',
        os: 'ios',        
        name: svDeviceMbData[2],       
        width: 414,
        height: 896, 
    },
    {
        type: 'mobile',
        os: 'ios',        
        name: svDeviceMbData[3],       
        width: 390,
        height: 844, 
    },
    {
        type: 'mobile',
        os: 'ios',        
        name: svDeviceMbData[4],       
        width: 375,
        height: 812, 
    },
    {
        type: 'mobile',
        os: 'ios',        
        name: svDeviceMbData[5],       
        width: 428,
        height: 926, 
    },
    {
        type: 'mobile',
        os: 'android',        
        name: svDeviceMbData[6],       
        width: 360,
        height: 760, 
    },
    {
        type: 'mobile',
        os: 'android',        
        name: svDeviceMbData[7],       
        width: 384,
        height: 854, 
    },
    {
        type: 'mobile',
        os: 'android',        
        name: svDeviceMbData[8],       
        width: 412,
        height: 915, 
    },
    {
        type: 'mobile',
        os: 'android',        
        name: svDeviceMbData[9],       
        width: 280,
        height: 653, 
    },
    {
        type: 'tablet',
        os: 'ios',        
        name: svDeviceTabData[0],       
        width: 768,
        height: 1024, 
    },
    {
        type: 'tablet',
        os: 'ios',        
        name: svDeviceTabData[1],       
        width: 810,
        height: 1080, 
    },
    {
        type: 'tablet',
        os: 'ios',        
        name: svDeviceTabData[2],       
        width: 834,
        height: 1112, 
    },
    {
        type: 'tablet',
        os: 'ios',        
        name: svDeviceTabData[3],       
        width: 820,
        height: 1180, 
    },
    {
        type: 'tablet',
        os: 'ios',        
        name: svDeviceTabData[4],       
        width: 1024,
        height: 1366, 
    },
    {
        type: 'tablet',
        os: 'android',        
        name: svDeviceTabData[5],       
        width: 800,
        height: 1280, 
    },
];


/*
    device function
*/ 
var deviceSet = (function(){
    return {
        init: function(){     
            deviceSet.optionAppend();
            deviceSet.optionInit(svDeviceDetailData[0])
            
        },  
        optionInit: function(value){ // 초기 옵션값 설정
            var $option = $('[data-option="device"]').find('option');
            var model = value.name;            

            for ( var i in $option ){
                if ( $option.eq(i).attr('data-model') == model ){
                    $option.eq(i).prop('selected',true)
                }
            };                       
        },    
        optionAppend: function(){ // 디바이스 셀렉트 옵션 생성
            var $selectOp = $('[data-option="device"]');

            var mbOptGroup = $('<optgroup>',{
                label : 'Mobile'
            }).appendTo($selectOp);
            var TbOptGroup = $('<optgroup>',{
                label : 'Tablet'
            }).appendTo($selectOp); 
            
            for ( var i in svDeviceDetailData ){
                var deviceType = svDeviceDetailData[i].type;                
                var deviceName = svDeviceDetailData[i].name;
                var deviceSize = svDeviceDetailData[i].width+'*'+svDeviceDetailData[i].height;

                if ( deviceType == 'mobile' ){
                    $option = $('<option>',{
                        value : deviceName,
                        'data-model': deviceName,
                        'data-size': deviceSize,
                        'data-type': deviceType,
                        text: deviceSize+'/'+deviceName,
                    }).appendTo(mbOptGroup);                    

                } else if ( deviceType == 'tablet' ){
                    var $option = $('<option>',{
                        value : deviceName,
                        'data-model': deviceName,
                        'data-size': deviceSize,
                        'data-type': deviceType,
                        text: deviceSize+'/'+deviceName,
                    }).appendTo(TbOptGroup);
                };
            };            
        },
    };    
})();


/*
    frame mode
*/ 
var modeSet = (function(){   
    return {
        init: function(){  
            var $frameView = $('.eb-frame-view');        
            var activeMode = $frameView.attr('data-active-mode')
            
            if ( activeMode == 'default'){
                modeSet.check($frameView, 'default')
            }else if ( activeMode == 'device'){
                modeSet.check($frameView, 'device')               
            }
        },
        check: function(target, mode){            
            var $btnMode = $('[data-func="mode"]');

            if ( mode == 'default'){
                $(target).removeClass('active');
                $btnMode.attr('data-mode','default').removeClass('active');
                defaultViewSet.init(); 
            } else if ( mode == 'device' ){                
                $(target).addClass('active');
                $btnMode.attr('data-mode','device').addClass('active');
                deviceViewSet.init(); 
            }            
        },
        toggle: function(ev){
            var $frameView = $('.eb-frame-view');
            var $ev = $(ev);
            var evMode = $ev.attr('data-mode');
            
            if (evMode == 'default'){
                modeSet.check($frameView, 'device')    
            } else if ( evMode == 'device'){
                modeSet.check($frameView, 'default')    
            }                   
        }        
    };    
})();


/*
    default view
*/ 
var defaultViewSet = (function(){
    return {
        init: function(){    
            var $frame = $('[data-device="target"]'),
                $iframe = $('[data-device="frame"]');

            $frame.css({
                'width': '100%',
                'height': '100%'
            });

            $iframe.css({
                'width': '100%',
                'height': '100%'
            })            
        },
       
    };    
})();


/*
    device view
*/ 
var deviceViewSet = (function(){   
    return {
        init: function(){ 
            var $option = $('[data-option="device"]').find('option:selected'),
                $rotate = $('[data-func="rotate"]')  
            
            var type = $option.attr('data-type'),
                model = $option.attr('data-model'),
                size = $option.attr('data-size'); 
            
            deviceViewSet.frameChange(type,model,size);                        
        },                          
        frameChange: function(type, model, size){ // 디바이스 교체
            var $frame = $('[data-device="target"]'),
                $rotateBtn = $('[data-func="rotate"]');            

            var sizeW =  size.split('*')[0],
                sizeH = size.split('*')[1];

            if ( $rotateBtn.hasClass('active') ){                
                $rotateBtn.trigger('click');
            };            

            if ( type == 'custom'){
                $('.option-size').addClass('active')
                $('.option-size').find('.custom-size .btn-confirm').prop('disabled',false)  
                $('.option-size').find('.custom-size input').prop('disabled',false)   
                $('input[data-custom="width"]').val($frame.attr('data-width'))
                $('input[data-custom="height"]').val($frame.attr('data-height'))                
            }else {
                $('.option-size').removeClass('active')
                $('.option-size').find('.custom-size .btn-confirm').prop('disabled',true)  
                $('.option-size').find('.custom-size input').prop('disabled',true)                    
                
                $frame.attr({    
                    'data-type': type, 
                    'data-model': model,       
                    'data-width': sizeW,
                    'data-height': sizeH,                              
                });               
            };            

            deviceViewSet.changeSize()            
        },
        changeSize: function(){ // 디바이스 사이즈 변경
            var $target = $('[data-device="target"]'),
                $iframe = $target.find('[data-device="frame"]')

            var w = $target.attr('data-width'),
                h = $target.attr('data-height'),                
                idcH = $target.find('.indicator').height();

            $target.css({
                'width': w + 'px',
                'height': h + 'px',                
            });
            $iframe.css({
                'width' : w + 'px',
                'height' : (h - idcH) + 'px',
            });           
        },       
        frameRotate: function(ev){ // 디바이스 프레임 회전
            var $rotateBtn = $(ev),
                $frame = $('[data-device="target"]'),
                $iframe = $frame.find('iframe'),
                isRotated = $rotateBtn.hasClass('active');

            var idcH = $frame.find('.indicator').height();

            if ( isRotated ){
                $rotateBtn.removeClass('active')
                $frame.removeClass('rotate')
                var sizeW = $frame.attr('data-width'),
                    sizeH = $frame.attr('data-height');
            }else {
                $rotateBtn.addClass('active')
                $frame.addClass('rotate')
                var sizeW = $frame.attr('data-height'),
                    sizeH = $frame.attr('data-width');
            };

            $frame.css({
                'width': sizeW + 'px',
                'height': sizeH + 'px'
            })
            $iframe.css({
                'width': sizeW + 'px',
                'height': (sizeH - idcH) + 'px',
            });
        },        
    }   
    
})();

function customSize(){
    var $target = $('[data-device="target"]');

    var width = $('[data-custom="width"]').val(),
        height = $('[data-custom="height"]').val(),
        size = width +'*'+ height;
    
    $target.attr({
        'data-type': 'custom',
        'data-model': 'custom',
        'data-width': width,
        'data-height': height,
    })

    deviceViewSet.frameChange('custom','custom',size);
}



/*
    event
*/
$(document).on('click','[data-func="mode"]',function(){    
    modeSet.toggle($(this))    
});

$(document).on('click','[data-option="custom"]',function(){
    customSize();
});

$(document).on('click','[data-func="rotate"]',function(){    
    deviceViewSet.frameRotate($(this))
});

$(document).on('change','[data-option="device"]',function(){    
    var $option = $(this).find("option:selected");

    var dataType = $option.attr('data-type'),        
        dataModel = $option.attr('data-model'),
        dataSize = $option.attr('data-size');

    deviceViewSet.frameChange(dataType,dataModel,dataSize);       
});

function maxViewSize(){
    var $max = $('.eb-frame-view .max-val');
    var viewW = $('.eb-frame-view').outerWidth();

    $max.text('최대: '+viewW)

    return viewW;
}

$(document).on('change','[data-func="viewSize"] input',function(){    
    var val = $(this).val();    

    if ( maxViewSize() >= val ){
        $('.eb-frame-view > .inner').css({
            'width': val+'px'
        })
    } else {
        alert('최대 크기를 확인해주세요')
    }    
});



