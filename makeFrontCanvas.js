function makeTextSprite( message,message_zw, parameters )
{
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Arial";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 30;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    //
    // var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
    //     parameters["backgroundColor"] : { r:0, g:0, b:0, a:1.0 };

//	var spriteAlignment = THREE.SpriteAlignment.topLeft;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;

    // get size data (height depends only on font size)
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    //var metrics_zw = context.measureText( message_zw);

    // background color
    // context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
    //     + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
        + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    //roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness + 5, fontsize * 1.4 + borderThickness + 100 , 6);
  //  roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness + 10, fontsize * 1.4 + borderThickness + 100 , 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = "#ffffff";

    context.fillText( message, borderThickness, fontsize + borderThickness);
    context.font =  40 + "px " + fontface;
    context.fillText( message_zw, borderThickness, fontsize + borderThickness+40);
   // canvasTextAutoLine(message_zw,context,borderThickness+40,fontsize + borderThickness+50,40);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial(
        { map: texture, useScreenCoordinates: false} );
    var sprite = new THREE.Sprite( spriteMaterial );
    //sprite.scale.set(20,10,0.2);
    return sprite;
}



/*
 str:要绘制的字符串
 canvas:canvas对象
 initX:绘制字符串起始x坐标
 initY:绘制字符串起始y坐标
 lineHeight:字行高，自己定义个值即可
 */
function canvasTextAutoLine(str,canvas,initX,initY,lineHeight){
    var ctx = canvas;
    var lineWidth = 0;
    var canvasWidth = 10;
    var lastSubStrIndex= 0;
    for(var i=0;i<str.length;i++){
        lineWidth+=ctx.measureText(str[i]).width;
        if(lineWidth>canvasWidth-initX){//减去initX,防止边界出现的问题
            ctx.fillText(str.substring(lastSubStrIndex,i),initX,initY);
            initY+=lineHeight;
            lineWidth=0;
            lastSubStrIndex=i;
        }
        if(i==str.length-1){
            ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
        }
    }
}