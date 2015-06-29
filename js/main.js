/**
 * 显示菜单菜单
 */
function openMenu() {
		if (!showMenu) {
			//侧滑菜单处于隐藏状态，则立即显示出来；
			//显示完毕后，根据不同动画效果移动窗体；
			menu.show('none', 0, function() {
				switch (mode) {
					case 'main-move':
						//主窗体开始侧滑；
						main.setStyle({
							left: '70%',
							transition: {
								duration: 150
							}
						});
						break;
					case 'menu-move':
						menu.setStyle({
							left: '0%',
							transition: {
								duration: 150
							}
						});
						break;
					case 'all-move':
						main.setStyle({
							left: '70%',
							transition: {
								duration: 150
							}
						});
						menu.setStyle({
							left: '0%',
							transition: {
								duration: 150
							}
						});
						break;
				}
			});
			//显示遮罩
			mask.show();
			showMenu = true;
		}
	}
	/**
	 * 关闭侧滑菜单
	 */

function closeMenu() {
	_closeMenu();
	//关闭遮罩
	mask.close();
}

/**
 * 关闭侧滑菜单（业务部分）
 */
function _closeMenu() {
	if (showMenu) {
		//关闭遮罩；
		switch (mode) {
			case 'main-move':
				//主窗体开始侧滑；
				main.setStyle({
					left: '0',
					transition: {
						duration: 150
					}
				});
				break;
			case 'menu-move':
				//主窗体开始侧滑；
				menu.setStyle({
					left: '-70%',
					transition: {
						duration: 150
					}
				});
				break;
			case 'all-move':
				//主窗体开始侧滑；
				main.setStyle({
					left: '0',
					transition: {
						duration: 150
					}
				});
				//menu页面同时移动
				menu.setStyle({
					left: '-70%',
					transition: {
						duration: 150
					}
				});

				break;
		}

		//等窗体动画结束后，隐藏菜单webview，节省资源；
		setTimeout(function() {
			menu.hide();
		}, 200);
		//改变标志位
		showMenu = false;
	}
}

//变换侧滑动画移动效果；
mui('.mui-input-group').on('change', 'input', function() {
	if (this.checked) {
		switch (this.value) {
			case 'main-move':
				//仅主窗口移动的时候，menu页面的zindex值要低一点；
				menu.setStyle({
					left: '0',
					zindex: 9997
				});
				if (mode == 'all-move') {
					menu.setStyle({
						left: '0%'
					});
				}
				mode = 'main-move';
				break;
			case 'menu-move':
				menu.setStyle({
					left: '-70%',
					zindex: 9999
				});
				if (mode == 'all-move') {
					menu.setStyle({
						left: '0%'
					});
				}
				mode = 'menu-move';
				break;
			case 'all-move':
				//切换为整体移动
				//首先改变移动标志
				slideTogether = true;
				//变换menu界面初始化位置，整体移动时，Menu界面left需要在-70%的地方；
				menu.setStyle({
					left: '-70%'
				});
				mode = 'all-move';
				break;
		}
	}
});