$(document).ready(function() {
	//定义函数
	var Jrole; //当前角色
	var Jtpa = 0; //当前啪数总数
	var JpaSpeed = 1; //当前啪速率
	var Jtool1 = 0; //道具1数量
	var Jtool2 = 0; //道具2数量
	var Jtool3 = 0; //道具3数量
	var Jpass = 0; //当前关数
	var Jp = [
		['1', '60', '60', '2'],
		['2', '60', '120', '2'],
		['3', '60', '360', '2'],
		['4', '70', '500', '2'],
		['5', '80', '800', '2']
	]; //关数配置(关数，时间，总数，按钮数)
	var timer;
	var Toolt;

	//mui初始化
	mui.init({});

	//初始化
	function init() {
		selRole();
	}
	init();

	//选择角色
	function selRole() {
		$(".start").off("tap").on("tap", function() {
			var selH = '<select class="mui-btn mui-btn-block mui-text-center srsel">\
					<option value="0">请选择角色</option>\
					<option value="1">菜 鸡 坑 坑</option>\
					<option value="2">蘑 菇 宝 宝</option>\
					<option value="3">顾 小 萌 萌</option>\
					<option value="4">花 花 宝 宝</option>\
					<option value="5">请叫我大哥</option>\
				</select>';
			mui.alert(selH, '点击选择角色', function() {
				Jrole = $(".srsel option:selected").attr("value");
				if(Jrole == 0) {
					layer.msg("大兄弟,不选角色,你想上天啊?")
				} else {
					$(".startBox").addClass("mui-hidden");
					$(".gameBox").removeClass("mui-hidden");
					JpaF();
				}
			});
		})
	}

	//游戏界面
	function JpaF() {
		//显示角色
		if(Jrole == 1) {
			$(".userName").text("菜鸡坑坑")
		};
		if(Jrole == 2) {
			$(".userName").text("蘑菇宝宝")
		};
		if(Jrole == 3) {
			$(".userName").text("顾小萌萌")
		};
		if(Jrole == 4) {
			$(".userName").text("花花宝宝")
		};
		if(Jrole == 5) {
			$(".userName").text("请叫我大哥")
		};
		startBtn();
	}

	//开始游戏
	function startBtn() {
		//获取道具
		var toolArr = ['1', '1', '1', '2', '2', '3', '3'];
		var toollength = toolArr.length;
		var toolinit = toolArr[Math.floor(Math.random() * toollength)];
		var tn;
		var go = true;
		Jpass += 1; //下一关数
		$(".userJtpa span").text(Jtpa);

		if(toolinit == 1) {
			Jtool1 += 1;
			tn = "恭喜获得 菜鸡啪啪啪 X 1";
		} else if(toolinit == 2) {
			Jtool2 += 1;
			tn = "恭喜获得 蘑菇变身术 X 1";
		} else if(toolinit == 3) {
			Jtool3 += 1;
			tn = "恭喜获得 萌宝卖萌术 X 1";
		}
		$(".tool li").eq(0).find(".mui-badge").text(Jtool1);
		$(".tool li").eq(1).find(".mui-badge").text(Jtool2);
		$(".tool li").eq(2).find(".mui-badge").text(Jtool3);

		mui.alert(tn, ' ', '开始第' + Jpass + '关', function() {
			var j;
			for(i = 0; i < Jp.length; i++) {
				if(Jpass == Jp[i][0]) {
					console.log(Jp[i][0], Jp[i][1], Jp[i][2], Jp[i][3]);
					j = i;
					$("#Jpass").text(Jp[i][0]);
					$("#Jtime").text(Jp[i][1]);
					$("#Jnum").text(Jp[i][2]);
					timeDown(Jp[i][1], Jp[i][2]);
					useTool();
					if(Jp[i][3] == "1") {
						$(".mode1").removeClass("mui-hidden");
					} else {
						$(".mode2").removeClass("mui-hidden");
					}
					$(".Jpa").off("tap").on("tap", function() {
						if(go) {
							setTimeout(function() {
								go = true;
								var arr = ['啪啪大神，请赐予我力量吧', '世界那么大，我想啪一啪', '憋说话，啪我', '一起扭着啪一啪！扭着！扭着！', '啪啪啪啪，鸡鸭鱼肉', '左手再来一个慢动作，啪着', '重要的事说三遍：啪我，啪我，啪我', '换个姿势继续啪一啪', '让我们红尘作伴，啪得潇潇洒洒'];
								var length = arr.length;
								var txt = arr[Math.floor(Math.random() * length + 1)];
								$(".Jpatxt").text(txt);
							}, 1500);
							go = false;
						}
						Jtpa += JpaSpeed;
						$(".userJtpa span").text(Jtpa);
						if(Jtpa >= Jp[j][2]) {
							Jreset();
							mui.alert('恭喜过关', ' ', '去获取道具', function() {
								startBtn();
							})
						}
					})
				}
			}
		});
	}

	//倒计时
	function timeDown(wait, total) {
		var progressbar1 = mui('#progress');
		mui(progressbar1).progressbar().setProgress(100);
		var waitT = wait;
		timer = setInterval(function() {
			if(wait) {
				wait--;
				mui(progressbar1).progressbar().setProgress(100 * wait / waitT);
			} else {
				clearInterval(timer);
			}
		}, 1000);
	}

	//使用道具
	function useTool() {
		var Twait = 5;
		$(".tool li").off("tap").on("tap", function() {
			if($(this).find(".mui-badge").text() > 0) {
				var ind = $(this).index();
				console.log(ind)
				if(ind == 0) {
					JpaSpeed = 2;
					Jtool1 -= 1;
				} else if(ind = 1) {
					JpaSpeed = 3;
					Jtool2 -= 1;
				} else if(ind = 2) {
					JpaSpeed = 5;
					Jtool3 -= 1;
				}
				$(this).find(".mui-badge").text($(this).find(".mui-badge").text() - 1);
				$(".userJtpa span").addClass("cur");
				Toolt = setInterval(function() {
					if(Twait) {
						Twait--;
					} else {
						JpaSpeed = 1;
						$(".userJtpa span").removeClass("cur")
						clearInterval(Toolt);
					}
				}, 1000);
			}
		})
	}
	
	//重置
	function Jreset(){
		$(".mode").addClass("mui-hidden");
		clearInterval(timer);
		clearInterval(Toolt);
		Jtpa = 0;
		JpaSpeed == 1;
		$(".userJtpa span").removeClass("cur")
	}

})