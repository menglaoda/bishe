$(function(){
	            $(".denglu").show();
	            $(".box").hide();
	            $(".yun").hide();
	            $(".yuner").hide();
	            $(".denglu_btn").on("click",function(){//点击用户登录
	            	$(".denglu_btn").css({"background":"#666666","-webkit-box-shadow":"3px 5px 5px 1px #ccc"});
	            	setTimeout(function(){
	            		$(".denglu_btn").css({"background":"aqua","-webkit-box-shadow":"0px 0px 0px 0px #ccc"});
	            	},100)
	            	var $yonghu = $("#yonghu").val();
	            	var $mima = $("#mima").val();
	            	if($yonghu=="鹿山学院" && $mima=="666666"){//判断用户名密码是否正确
	            		$(".denglu").hide();
	            		$(".box").fadeIn();
	            		$(".yun").show();
	            		$(".yuner").show();
	            	}else{
	            		$(".denglu_tishi").show();
	            	}
	            })
				var i=0;//限制系别的请求次数
				var j=0;//限制班级的请求次数
				var time;
				var arr = [];//用来储存名单
				var luckys = [];//幸运名单
				var shuzhi=0;//输入框里的数值
				var $button_baocun = $(".button_baocun");//保存按钮
				var $textarea = $(".mingdan_2 .textarea");//文本域
				$(".header_you").on("mouseout",function(){//鼠标移出系别倒三角时，
					$(".xibie_liebiao").hide();//下级菜单隐藏
				})
				$(".xibie_liebiao").on("mouseout",function(){
					$(".xibie_liebiao").hide();
				})
				$(".xibie_liebiao").on("mousemove",function(){
					$(".xibie_liebiao").show();
				})
				$(".header_you").on("mousemove",function(){//鼠标经过系别倒三角时
					$(".xibie_liebiao").show();//下级菜单显示
					$(".xibie_liebiao_2").hide();//班级的下级菜单隐藏						
					if(i==0){//只请求一次
						i++;						
						$.ajax({
							url:"js/lushan.json",
							dataType:"json",
							success:function(res){
								var $ul = $("<ul></ul>");
								$.each(res,function(idx,item) {
										var $li = $("<li></li>");
										var $span = $("<span></span>");
			                            $span.addClass("ospan").html(item.name).appendTo($li);
										$li.addClass("oli").appendTo($ul);
										$li.on("click",function(){
											$(".banji_tishi").hide();
											$(".textarea").val("");
											$(".header_zuo").html($li.eq(0).html());
											$li.eq(0).css("color","red");
											$li.eq(0).siblings($li).css("color","black")
											console.log($li.eq(0).html());
											$(".xibie_liebiao").hide();
											$(".header_zuo_2 span").html("--");
											$(".header_banji").css("width","90px");
											$(".xibie_liebiao_2").css("width","90px");
											$(".xibie_liebiao_2").html("");
											j=0;
											$(".mingdan ul").html("");
										})
								});
								$ul.appendTo($(".xibie_liebiao"));	
							}
						})
					}
					
				})
				$(".header_you_2").on("mouseout",function(){
					$(".xibie_liebiao_2").hide();
					$(".banji_tishi").hide();
				})
				$(".xibie_liebiao_2").on("mouseout",function(){
					$(".xibie_liebiao_2").hide();
					$(".banji_tishi").hide();
				})
				$(".xibie_liebiao_2").on("mouseover",function(){
					$(".xibie_liebiao_2").show();
				})
				$(".header_you_2").on("mouseover",function(){//点击班级
					$(".xibie_liebiao_2").fadeToggle();//若下级菜单隐藏则显示，反之，淡入淡出效果
					$(".xibie_liebiao").hide();//系别列表隐藏
					var $header_zuo_span = $(".header_zuo span");
					function compare(){//返回一个数，好给下面的ajax判断请求哪一类数据
						if($header_zuo_span.html()=="电计系"){
							return 0;
						}else if($header_zuo_span.html()=="汽车系"){
							return 1;
						}else if($header_zuo_span.html()=="英语系"){
							return 2;
						}else if($header_zuo_span.html()=="机械系"){
							return 3;
						}else if($header_zuo_span.html()=="土木系"){
							return 4;
						}else if($header_zuo_span.html()=="经管系"){
							return 5;
						}else if($header_zuo_span.html()=="食化系"){
							return 6;
						}else if($header_zuo_span.html()=="艺术系"){
							return 7;
						}
					}
					console.log(compare());
					if(compare()==undefined){
						$(".banji_tishi").show();
					}
						while(j==0){
							j++;
							$.ajax({
								type:"get",
								url:"js/lushan.json",
								dataType:"json",
								success:function(res){
									var $ul = $("<ul></ul>");
									$.each(res, function(idx,item) {
										if(idx==compare()){//关键的一步，节省了很多代码
											
											$.each(item.banji,function(idx,item2){
												var $li = $("<li></li>");
												var $span = $("<span></span>");
					                            $span.addClass("ospan").html(item2.name).appendTo($li);
												$li.addClass("oli").appendTo($ul);
												$li.on("click",function(){	
													$(".textarea").val("");
													$(".header_zuo_2").html($li.eq(0).html());
													$li.eq(0).css("color","red");
													$li.eq(0).siblings($li).css("color","black")
													$(".xibie_liebiao_2").hide();
													if($(".header_zuo_2 span").html().length<6){
														$(".header_banji").css("width","90px");
														$(".xibie_liebiao_2").css("width","90px");
													}else{
														$(".header_banji").css("width","100px");
														$(".xibie_liebiao_2").css("width","100px");
													}
													if($(".header_zuo_2 span").html()=="物联网131"){//确定班级名称后下一步请求
														$(".mingdan ul").html("");//先清空数据在进行请求
														    arr=[];
															$.ajax({
																type:"get",
																url:"js/lushan.json",
																dataType:"json",
																success:function(res){			
																    var $ul = $(".mingdan ul");
																	$.each(res, function(idx,item) {
																		if(idx==0){
																			$.each(item.banji, function(idx,item) {
																				$.each(item.mingdan, function(idx,item) {
																					var $li = $("<li></li>");
																					$li.html(item);
																					arr.push(item);
																					var arr2 = arr.join("，");//以中文逗号分割
																					$(".textarea").val(arr2);
																					$li.addClass("mingdan_li").appendTo($ul);
																					console.log(arr2);
																					$(".people_num i").html(arr.length);
																				});
																			});
																		}
																	});
																	$ul.addClass("mingdan_ul").appendTo($(".mingdan"));		
															}
														});
													}else{
														arr=[];
														$(".people_num i").html(arr.length);
														$(".mingdan ul").html("名单未收录");
														$(".textarea").val("");
														$(".textarea").val("请手动添加名单，名字之间用中文逗号隔开。");
													}
												})
											})
										}
									});
									$ul.appendTo($(".xibie_liebiao_2"));	
								}
							});
						}	
				})
				//点击保存
				
				$button_baocun.on("click",function(){
					var sstring = $textarea.val();
					arr = sstring.split("，");//以中文逗号拆分成字符串数组
					var $ul = $(".mingdan ul");
					$ul.html("");
					var k =0;
					$.each(arr,function(idx,item){
						var $li = $("<li></li>");
						$li.html(item);
						$li.addClass("mingdan_li").appendTo($ul);
					})
					$(".people_num i").html(arr.length);
				})
				//操作菜单
				var $menuKey_btn = $(".menuKey_btn");//操作菜单
				var $menuKey_liebiao = $(".menuKey_liebiao");//操作菜单下的列表
				var $menuKey_qd = $(".menuKey_qd");//确定按钮
				var $menuKey_li = $(".menuKey_liebiao li");//操作菜单下的列表中的li
				$menuKey_btn.on("click",function(){
					$menuKey_liebiao.fadeToggle();	
					$(".menu_tishi").hide();
				})
				function Sudoku(data,quanshu){//抽奖过程动画函数，随机数，基础步数
					this.data = data;
					this.qushu = quanshu*2;
					this.i =0;//初始下标
					this.j =0;
					this.speed =100;
					this.sum = this.data+this.qushu;
					this.running=0;//0代表不运行
					this.run = function(){
						var that = this;
						this.running=1;
						if(this.i>(this.qushu/2-1)){
							this.i=0;
						}
						if(this.sum>=0){
							this.sum--;
							$(".mingdan li").eq(this.i).css({"color":"red","background":"blue"});
	                        $(".mingdan li").eq(this.i).siblings($(".mingdan li")).css({"color":"black","background":"#eaeaea"});
	                        this.i++;
	                        this.j++;
	                        if(this.sum<=10){
	                        	this.speed*=1.2; 
	                        }
							setTimeout(function(){
								that.run();
							},this.speed)
						}else{
                           $(".mingdan li").eq(that.data).addClass("background");
//                         var a=0;
//							while(shuzhi>0){
//									arr[luckys[a]];
//									console.log(arr[luckys[a]]);
//									console.log(1221);
//									a++;
//									shuzhi--;	
//							}
						}				
					}
					
				}
				var ss=[];
				$menuKey_qd.on("click",function(){//点击确定按钮 	
					var $mingdan_li = $(".mingdan li");
					var arr_length = arr.length;
                    shuzhi = $("#menuKey_val").val();//输入框里的数值
                    var k = $("#menuKey_val").val();//输入框里的数值
                    var $lucky = $(".lucky");
                    var $lucky_ul = $(".lucky_ul");//幸运框模块ul
                    ss.push(shuzhi);
                    	if(k>0 && k<arr_length){//输入框里的数字输入合理
                    		$(".menu_tishi").hide();//把提示框隐藏起来
                    		$menuKey_liebiao.hide();//把菜单列表隐藏起来
                    		$(".pingfen").remove();//清除评分、找帮手
	                    	$(".pingfen_2").remove();//清除十分满意、满意、一般、不满意
                    		$(".mingdan li").removeClass("background");//开始运动前先清除掉上一次的背景动画
                    		luckys = [];//清除幸运名单
                    		$(".lucky_ul li").remove();//清除幸运名字
                    		$(".xuanzhuan").show();//旋转图标
                    		function suijishu(){				 
								// 循环N次生成随机数 
								for(var i = 0 ; ; i++){ 
								    // 只生成10个随机数 
								    if(luckys.length<shuzhi){ 
								          generateRandom(shuzhi); 
								    }else{ 
								      break; 
								   } 
								} 
								console.log(luckys); 
								// 生成随机数的方法 
								function generateRandom(count){
									var num = Math.round(Math.random()*arr.length);
								     for(var i = 0 ; i < luckys.length; i++){ 
								          if(luckys[i] == num){ 
								               return false; 
								          }      
								     } 
								     luckys.push(num); 
								} 
								
                    		}
                    		suijishu();
                    		var n =0;
	                    	function runing(){	                    
	                    		if(luckys.length>=0){
	                    			//var c =luckys.length;//用来判断需要对象实例化几次？
	                    			while(k>0){
	                    				var sudoku = new Sudoku(luckys[n],arr_length);//对象实例化
									    sudoku.run();
									    n++;
									    k--;
	                    			}
                    				
	                    		}	                    	
							    setTimeout(function(){
							    	if(k>0){
							    	  runing();
							   		 }
							    },2000)
	                    	}
	                    	runing();
	                    	
	                    	
	                    	var timer = setInterval(function(){//定时器判断是否名单已产生
	                    		var $background = $(".background");
	                    		var back_length = $background.length;
	                    	//	console.log(back_length);
	                    	//	console.log(shuzhi);
	                    		var a=0;
	                    		if($background.length<=shuzhi && $background.length>0){
	                    			$(".lucky_ul li").remove();//清除幸运名字
	                    			$(".pingfen").remove();//清除评分、找帮手
	                    			$(".pingfen_2").remove();//清除十分满意、满意、一般、不满意
	                    	//		console.log($background.length);
	                    			
	                    			for(var i =0;i<=back_length-1;i++){
	                    				//while(shuzhi>0){
										   var $li = $("<li></li>");
										   $li.html(arr[luckys[a]]).addClass("luckyli");
										   $li.appendTo($lucky_ul);
//										   <div class="pingfen">
//												<ul>
//													<li class="pingfen_li">找帮手</li>
//													<li>评分</li>
//												</ul>
//											</div>
                                    
                                            var $pingfen = $("<div></div>");
                                            var $pingfen_ul = $("<ul></ul>");
                                            var $pingfen_li_1 = $("<li></li>");
                                            var $pingfen_li_2 = $("<li></li>");
                                            $pingfen_li_1.addClass("pingfen_li").html("找帮手").appendTo($pingfen_ul);
                                            $pingfen_li_2.addClass("pingfen_li_2").html("评分").appendTo($pingfen_ul);
                                            $pingfen_ul.appendTo($pingfen);
                                            $pingfen.addClass("pingfen").appendTo($lucky);
											
//											<div class="pingfen_2">
//												<span>十分满意</span><span>满意</span><span>一般</span><span>不满意</span>
//											</div>
                                            var $pingfen_2 = $("<div></div>");
                                            var $span_1 = $("<span></span>");
                                            var $span_2 = $("<span></span>");
                                            var $span_3 = $("<span></span>");
                                            var $span_4 = $("<span></span>");
                                            $span_1.html("十分满意").appendTo($pingfen_2);
                                            $span_2.html("满意").appendTo($pingfen_2);
                                            $span_3.html("一般").appendTo($pingfen_2);
                                            $span_4.html("不满意").appendTo($pingfen_2);
                                            $pingfen_2.addClass("pingfen_2").appendTo($lucky);
                                           
                                       
											arr[luckys[a]];
							//				console.log(arr[luckys[a]]);
											
											a++;
											//shuzhi--;	
									    //}
	                    			}
							//		console.log("定时器在检车");
	                    			
	                    		}
	                    		if(back_length==shuzhi){//判断名单是否生成完毕
	                    			clearInterval(timer);
	                    	//		console.log("关闭定时器");
	                    	      //幸运儿模块名单已准备完毕
	                    	      $(".xuanzhuan").hide();//旋转图标
	                    	      var $luckyli = $(".luckyli");//名字
	                    	      var $pingfen_li_2 = $(".pingfen_li_2");//评分
	                    	      var $pingfen_li = $(".pingfen_li");//找帮手
	                    	      $luckyli.on("click",function(){//点击名字
	                    	      	  var idx =$(this).index();
	                    	      	  console.log(idx);
	                    	      	  $luckyli.eq(idx).css("background","#00FFFF");
	                    	      	  var top = $luckyli.eq(idx).offset().top;
	                    	      	  var left = $luckyli.eq(idx).offset().left;
	                    	      	  console.log(top);
	                    	      	  $(".pingfen").eq(idx).show();//显示对应的评分、找帮手
	                    	      	  $(".pingfen_2").hide();//隐藏抽取名字后生成的十分满意、满意、一般、不满意
	                    	      	  $(".pingfen_2_hou").hide();//隐藏找帮手后生成的十分满意、满意、一般、不满意
	                    	      	  $(".pingfen").eq(idx).siblings(".pingfen").hide();
	                    	      	  $(".pingfen").eq(idx).css("top",top+"px");
	                    	      	  $(".pingfen").eq(idx).css("left",(left+102)+"px");
	                    	      	  
	                    	      	  $pingfen_li_2.on("click",function(){//点击评分
		                    	      	  console.log($pingfen_li_2.length);
		                    	      	  $pingfen_li_2.eq(idx).css("background","#00FFFF");	                   
		                    	      	  $(".pingfen_2").eq(idx).show();
		                    	      	  $(".pingfen_2").eq(idx).siblings(".pingfen_2").hide();
		                    	      	  $(".pingfen_2").eq(idx).css("top",(top+20)+"px");
		                    	      	  $(".pingfen_2").eq(idx).css("left",(left+185)+"px");
		                    	      	  var $pingfen_2_span = $(".pingfen_2").eq(idx).children("span");
		                    	      	  $pingfen_2_span.on("click",function(){//点击十分满意、满意、一般、不满意
			                    	      	  var idx2 =$(this).index();
			                    	      	  $pingfen_2_span.eq(idx2).css("background","#00FFFF");
			                    	      	  $pingfen_2_span.eq(idx2).parent(".pingfen_2").hide();
			                    	      	  $(".pingfen").eq(idx).hide();
			                    	      	  $pingfen_2_span.eq(idx2).siblings(".pingfen_2 span").css("background","#eaeaea");
		                    	              $luckyli.eq(idx).css("background","wheat");
		                    	      	  })
	                    	          })
	                    	      	  $pingfen_li.eq(idx).on("click",function(){//点击找帮手
	                    	      	  	if($pingfen_li.eq(idx).css("background-color")=='rgb(255, 0, 0)'){
	                    	      	  		console.log("已找过帮手");
	                    	      	  		 $(".pingfen").eq(idx).hide();//隐藏对应的评分、找帮手
	                    	      	  		 $(".pingfen_2").hide();//隐藏全部十分满意、满意、一般、不满意
	                    	      	  	}else{
	                    	      	  		$pingfen_li.eq(idx).css("background","#ff0000");
		                    	      	  	 $pingfen_li.eq(idx).unbind("click");
		                    	      	  	 $luckyli.eq(idx).css("background","#ff0000");
		                    	      	  	 $(".xuanzhuan").show();//旋转图标
		                    	      	  	 $(".pingfen").eq(idx).hide();//隐藏对应的评分、找帮手
		                    	      	  	 $(".pingfen_2").hide();//隐藏全部十分满意、满意、一般、不满意
		                    	      	  	 var num = Math.round(Math.random()*arr.length);
		                    	      	  	 var sudoku = new Sudoku(num,arr_length);//对象实例化
										     sudoku.run();
										    // luckys.push(num);
										     var $li = $("<li></li>");
											 $li.html(arr[num]).addClass("luckyli_hou");
											 setTimeout(function(){
											 	$li.appendTo($lucky_ul);
											    $(".xuanzhuan").hide();//旋转图标
											 },15000)
											 setTimeout(function(){
											 	 var $luckyli_hou =$(".luckyli_hou");
												 $luckyli_hou.on("click",function(){//点击找帮手后生成的名字
												 	var idx3 = $(this).index();
												    console.log(idx3);
												    $(".pingfen_2_hou").remove();//清除十分满意、满意、一般、不满意
												    $(".pingfen_2").hide();//隐藏全部十分满意、满意、一般、不满意
												    var $pingfen_2_hou = $("<div></div>");
		                                            var $span_1 = $("<span></span>");
		                                            var $span_2 = $("<span></span>");
		                                            var $span_3 = $("<span></span>");
		                                            var $span_4 = $("<span></span>");
		                                            $span_1.html("十分满意").appendTo($pingfen_2_hou);
		                                            $span_2.html("满意").appendTo($pingfen_2_hou);
		                                            $span_3.html("一般").appendTo($pingfen_2_hou);
		                                            $span_4.html("不满意").appendTo($pingfen_2_hou);
		                                            $pingfen_2_hou.addClass("pingfen_2_hou").appendTo($lucky);
		                                            var top = $luckyli_hou.offset().top;
			                    	      	        var left = $luckyli_hou.offset().left;
			                    	      	        console.log(top);
			                    	      	        console.log(left);
			                    	      	        $(".pingfen").hide();//隐藏全部评分、找帮手
			                    	      	        $(".pingfen_2_hou").show();//显示十分满意、满意、一般、不满意
			                    	      	        $(".pingfen_2_hou").siblings(".pingfen_2_hou").hide();
		                                            $(".pingfen_2_hou").css("top",(top+(idx3-shuzhi)*20)+"px");
				                    	      	    $(".pingfen_2_hou").css("left",(left+85)+"px");
				                    	      	    $(".pingfen_2_hou span").on("click",function(){//点击十分满意、满意、一般、不满意
				                    	      	    	var idx4 = $(this).index();
				                    	      	    	$(".pingfen_2_hou span").eq(idx4).css("background","#00FFFF");
				                    	      	    	$(".pingfen_2_hou span").eq(idx4).siblings(".pingfen_2_hou span").css("background","#eaeaea");
				                    	      	    	$luckyli_hou.eq(idx3-shuzhi).css("background","#00FFFF");
				                    	      	    	setTimeout(function(){
				                    	      	    		$(".pingfen_2_hou").hide();//隐藏十分满意、满意、一般、不满意
				                    	      	    	},1000)
				                    	      	    })
												 })
											 },16000)
											 
											 
	                    	      	  	}
	                    	      	  	 
	                    	      	  })	
	                    	      	
	                    	      })
	                    	      
	                    		}                   		
	                    	},100)
						    
	                    }else if(k==""){
	                    	console.log(k)
	                    	$(".menu_tishi").show();
	                    	$(".menu_tishi span").html("请确定人数！");
	                    }else if(k<=0||k>arr_length){
	                    	$(".menu_tishi").show();
	                    	$(".menu_tishi span").html("请填入合理的数字！");
	                    }else{
	                    	$(".menu_tishi").show();
	                    	$(".menu_tishi span").html("居然如此傻，皮皮虾，我们走！-_-");
	                    }
				})
				$menuKey_li.eq(1).on("click",function(){//操作菜单里的其他
					$menuKey_liebiao.hide();
					$(".menu_tishi").hide();
				})
				$(".baocun").on("click",function(){//点击幸运儿下的保存按钮
					$(".baocun").css("background","wheat");
				})
				
				//云朵是出太阳还是下雨
					var date = new Date();
					var a = date.getHours();
					console.log(a);
					if(a<=12){
						$(".sun").show();
						$(".yudi").hide();
					}else{
						$(".sun").hide();
						$(".yudi").show();
						$(".yunduo").css("-webkit-box-shadow","3px 5px 5px 1px #ccc");
					}
	
				
			});