/*
* EXERoom.js 用来给web和本地exe进行通信的类库。
*/

var EXEStarter = {
    /**
     * 以房间方式打开EXE应用进程:
     * @param object
     * {
     *  userdata: {
     *      userID        String    用户ID
     *      userName      String    用户昵称
     *      sdkAppID      String    IM登录凭证
     *      accType       Int       账号集成类型
     *      userSig       String    IM签名
     *  },
     *  roomdata: {
     *     serverDomain String  roomserver域，eg:https://room.qcloud.com/
     *     roomAction:  String  支持：createRoom | enterRoom
     *     roomId:      Int     房间号
     *     roomName:    String  房间名称
     *     roomTitle:   String  房间Title
     *     roomLogo:    String  图标URL
     *     type:        String  默认RTCRoom。视频窗口摆放样式，默认1V1。更多参考Template定义
     *     template:    String  视频窗口摆放样式，默认1V1。更多参考StyleType定义
     *  },
     *  custom: {   //可选参数
     *     userList:    bool    用户列表模块，可以不设置，默认true
     *     IMList :     bool    IM聊天模块，可以不设置，默认true
     *     whiteboard:  bool    白板模块，可以不设置，默认true
     *     screenShare: bool    本地屏幕采集作为视频源，可以不设置，默认true
     *     record:      bool    后台录制当前视频流，可以不设置，默认false
     *     exeUrl:      String  指定自定义EXE的下载URL
     *     proxy_ip:    String  代理IP，可以不设置，默认不开启代理
     *     proxy_port:  Int     代理端口，可以不设置，默认不开启代理
     *  },
     * success       function  成功回调
     * fail          function  失败回调  errCode == -1时,检测本地未安装EXE，需要处理未安装逻辑。
     * }
     */
    createExeAsRoom: function (object) { },

    /**
     * 关闭EXE房间:
     * @param object
     * {
     *  data: {
     *      roomID:     String  房间号
     *  }
     * success       function  成功回调
     * fail          function  失败回调
     * }
     */
    closeExeAsRoom: function (object) { },

    /**
    *  @param object
    *  {
    *      onRoomClose            function //房间关闭
    *          {
    *              roomID          String  房间号
    *              msg				String  关闭原因
    *          }
    * /////可选的扩展事件监听（成员变更、IM消息、流状态信息）
    *      onMemberChange            function //房间成员列表变更,群量数据
    *          [
    *              {
    *                 userID          String  用户ID
    *                 userName        String  用户昵称
    *                 userAvatar      String  用户头像
    *                 role		   	   String  角色|如：游客、主播   
    *             }
    *          ]
    *      onRecvRoomIMMsg       fuction  //房间IM信息
    *          {
    *              roomID          String  房间号
    *              userID          String  用户ID
    *              userName        String  用户昵称
    *              userAvatar      String  用户头像
    *              message         String  文本消息
    *          }
    *      onRecvData           function  //透传流状态信息
    *          {
    *              roomID            String 
    *              cmdJson           String
    *          }
    *  }
    */
    setListener: function (object) { },

    /**
     * 页面时调用
     */
    unload: function () { },
}

// 供room使用，用于和exe通信：
var ExeMsgChannel = {
    startConnect: function (object) { },
    stopConnect: function (object) { },
    setListener: function (object) { },
    sendCmd: function (object) { },  // 发送字符串信令：http://localhost:500001/leaveRoom
    onRecvExeMsg: function (ret) { },
}

EXEStarter = (function () {
    var EXEUrl = "http://img.qcloud.com/open/qcloud/video/act/liteavWeb/webexe/exe/TXCloudRoomSetup.exe";
    var StyleType = {
        LiveRoom: 'LiveRoom',  //视频连麦模式 [LiveRoom: 1V2 | 1V3 | 1V4]
        RTCRoom: 'RTCRoom',    //视频通话模式 [RTCRoom: 1V1 | 1V2 | 1V3 | 1V4]
        //NormalLive: 'NormalLive', //预留模式
        //CustomServiceLive: 'CustomServiceLive', //预留模式
    }
    var RoomAction = {
        CreateRoom: 'createRoom',  //创建房间
        EnterRoom: 'enterRoom',   //视频通话模式
    }
    var Template = {
        Template1V1: '1v1',
        Template1V2: '1v2',
        Template1V3: '1v3',
        Template1V4: '1v4',
    }
    var accountInfo = {
        userID: '',			// 用户ID
        userName: '',		   // 用户昵称
        userAvatar: '',		// 用户头像URL
        userSig: '',		// IM登录凭证
        sdkAppID: '',		// IM应用ID
        accountType: '',	// 账号集成类型
        accountMode: 0,		//帐号模式，0-表示独立模式，1-表示托管模式
    };
    var custom = {
        userList: true,
        IMList:  true,
        whiteboard: true,
        screenShare: true,
        record: false,
        exeUrl: EXEUrl,
        ip: '',
        port: 0,
    };
    //exe房间列表
    var arrExeRoom = []; var bSetChannelListener = false;
    // 回调事件
    var event = {
        onRoomClose: function () { },
        onMemberChange: function () { },		        // 收到命令
        onRecvRoomIMMsg: function () { },
        onRecvData: function () { },
    };

    function createExeAsRoom(object) {
        if (!object || !object.roomdata.serverDomain) {
            console.error("createExeAsRoom参数错误");
            object.fail && object.fail(-9999, "init参数错误");
            return;
        }
        if (bSetChannelListener == false)
            setChannelListener(true);

        accountInfo.userID = object.userdata.userID;
        accountInfo.userSig = object.userdata.userSig;
        accountInfo.sdkAppID = object.userdata.sdkAppID;
        accountInfo.accountType = object.userdata.accType;
        accountInfo.userName = object.userdata.userName || accountInfo.userID;
        accountInfo.userAvatar = object.userAvatar || "123";

        // 房间信息
        var roomInfo = {
            roomAction: 'createRoom',   
            roomID: '',			                    // 房间ID
            roomName: '',		                    // 房间名称
            roomTitle: 'Demo',                  // 房间titile
            roomLogo: '',
            httpPort: 0,
            roomCB: null,
            serverDomain: '',
            type: StyleType.RTCRoom,
            template: Template.Template1V1,
        };
        roomInfo.roomAction = object.roomdata.roomAction;
        roomInfo.roomID = object.roomdata.roomID;
        roomInfo.roomName = object.roomdata.roomName;
        roomInfo.roomTitle = object.roomdata.roomTitle;
        roomInfo.roomLogo = object.roomdata.roomLogo;
        roomInfo.httpPort = randomPort();
        roomInfo.roomCB = object;
        roomInfo.serverDomain = parseServerDomain(object.roomdata.serverDomain, object.roomdata.type, object.roomdata.template);
        roomInfo.type = object.roomdata.type;
        roomInfo.template = object.roomdata.template;
        arrExeRoom.push(roomInfo);

        custom.userList = (object.custom && object.custom.userList) || true;
        custom.IMList = (object.custom && object.custom.IMList) || true;
        custom.whiteboard = (object.custom && object.custom.whiteboard) || true;
        custom.screenShare = (object.custom && object.custom.screenShare) || true;
        custom.record = (object.custom && object.custom.record) || false;
        custom.exeUrl = (object.custom && object.custom.exeUrl) || EXEUrl;
        custom.ip = (object.custom && object.custom.proxy_ip) || "";
        custom.port = (object.custom && object.custom.proxy_port) || 0;

        //在此处拉起为协议：
        var params = swapToJsonStr(roomInfo);
        var urlStr = "TXCloudRoom://liteav/params?json=" + params;
        console.log(urlStr);
        if (doCheckIE() == true) {
            window.open(urlStr);
        }
        else {
            self.location.href = urlStr;
        }
        //window.open(urlStr);

        console.log("openRoom-roomID:" + roomInfo.roomID + ", port:" + roomInfo.httpPort);
        ExeMsgChannel.startConnect({
            data: {
                serverDomain: "http://localhost:" + roomInfo.httpPort.toString() + "/query",
                httpPort: roomInfo.httpPort,
            }
        })
    }

    function closeExeAsRoom(object) {
        var index = -1;
        for (var i = 0; i < arrExeRoom.length; i++) {
            if (arrExeRoom[i].roomID == object.data.roomID) {
                index = i;
                break;
            }
        }
        if (index == -1) { return; }
        //通知断开连接：
        var cmdUrl = "http://localhost:" + arrExeRoom[index].httpPort.toString() + "/quit";
        console.log("[" + arrExeRoom[index].httpPort + "]" + 'closeRoom: url:' + cmdUrl);
        ExeMsgChannel.sendCmd({
            data: {cmdUrl: cmdUrl,},
        });
       
        ExeMsgChannel.stopConnect({
            data: { port: arrExeRoom[index].httpPort }
        });
        arrExeRoom.splice(index, 1);
    }

    function unload() {
        //清空所有的exe：
        ExeMsgChannel.setListener({});
        for (var i = 0; i < arrExeRoom.length; i++) {
            closeRoom({ data: { roomID: arrExeRoom[i].roomID } });
        }
    }

    function setListener(object) {
        
        console.log('-----setExeRoomListener------');
        if (!object) {
            console.error('setExeRoomListener参数错误', object);
            return;
        }
        event.onRecvData = object.onRecvData || function () { };
        event.onRoomClose = object.onRoomClose || function () { };
        if (typeof (object.onRoomClose) == "undefined") {
            setChannelListener(false);
        }
        else {
            if (bSetChannelListener == false)
                setChannelListener(true);
        }
    }
    function setChannelListener(bListener) {
        if (bListener == false) {
            ExeMsgChannel.setListener({});
            bSetChannelListener = false;
        }
        else {
            bSetChannelListener = true;
            ExeMsgChannel.setListener({
                onRecvCmd: function (cmd, port) {
                    var room = null;
                    for (var i = 0; i < arrExeRoom.length; i++) {
                        if (arrExeRoom[i].httpPort == port) {
                            room = arrExeRoom[i];
                            break;
                        }
                    }
                    if (room == null) return;
                    if (cmd == null || typeof (cmd) == "undefined") { return; }
                    if (cmd.event != null && typeof (cmd.event) != "undefined") {
                        if (cmd.event == "roomStatus") {
                            console.log("[" + room.httpPort + "]" + "createRoom cmd-result:" + cmd.code);
                            if (cmd.code == 0) {

                            }
                            else if (cmd.code == -1) {
                                event.onRoomClose && event.onRoomClose({
                                    data: {
                                        roomID: room.roomID, roomName: room.roomName,
                                        code: cmd.code, msg: cmd.msg
                                    }
                                });
                            }
                            else if (cmd.code == -1 || cmd.code == -1001 || cmd.code == -1002 || cmd.code == -1003
                                || cmd.code == -1004 || cmd.code == -1006 || cmd.code == -1007) {
                                event.onRoomClose && event.onRoomClose({
                                    data: {
                                        roomID: room.roomID, roomName: room.roomName,
                                        code: cmd.code, msg: cmd.msg
                                    }
                                });
                            }
                        }
                        else if (cmd.event == "roomTextMsg" && port == room.httpPort) {
                            console.log("[" + room.httpPort + "]" + "roomTextMsg");
                            event.onRecvRoomIMMsg && event.onRecvRoomIMMsg(room.roomID, cmd);

                            var str = JSON.stringify(cmd);
                            console.log(str);
                        }
                        else if (cmd.event == "memberChange" && port == room.httpPort) {
                            console.log("[" + room.httpPort + "]" + "memberChange");
                            event.onMemberChange && event.onMemberChange(room.roomID, cmd.list);
                            var str = JSON.stringify(cmd.list);
                            console.log(str);
                        }
                        else if (cmd.event == "sdkEventCallback" && port == room.httpPort) {
                            console.log("[" + room.httpPort + "]" + "sdkEventCallback");
                            event.onRecvData && event.onRecvData(room.roomID, cmd);
                        }
                        else if (port == room.httpPort) {
                            event.onRecvData && event.onRecvData(room.roomID, cmd);
                        }
                    }
                },
                onConnectStatus: function (ret) {
                    //to do 
                    var room = null; var index = -1;
                    for (var i = 0; i < arrExeRoom.length; i++) {
                        if (arrExeRoom[i].httpPort == ret.port) {
                            room = arrExeRoom[i];
                            index = i;
                            break;
                        }
                    }
                    if (room == null) return;
                    if (ret.code == 0 && ret.port == room.httpPort) {
                        room.roomCB && room.roomCB.success && room.roomCB.success({ data: { httpPort: room.httpPort } });
                        //arrExeRoom[index].roomCB = null;
                    }
                    else if (ret.code == -1 && ret.port == room.httpPort) {
                        console.log("[" + room.httpPort + "]" + "onConnectStatus : ret.code = -1");
                        room.roomCB && room.roomCB.fail && room.roomCB.fail({ errCode: -1, errMsg: "检测EXE未安装，正在下载EXE! 下载完成请安装" });
                        //arrExeRoom[index].roomCB = null;
                    }
                    else if (ret.code == -2 && ret.port == room.httpPort) {
                        console.log("[" + room.httpPort + "]" + "onConnectStatus : ret.code = -2");
                        event.onRoomClose && event.onRoomClose({
                            data: {
                                roomID: room.roomID, roomName: room.roomName,
                                code: -2000, msg: "HTTP链接超时断开!"
                            }
                        });
                    }
                },
            });
        }
    }

    function doCheckIE() {
        var bIE = false;
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            bIE = true;
        else if (window.navigator.userAgent.indexOf("MSIE") >= 1)
            bIE = true;
        else
            bIE = false;
        return bIE;
    }

    function parseServerDomain(serverDomain, type, template) {
        if (type == StyleType.LiveRoom)
            return serverDomain + "weapp/live_room/";
        else if (type == StyleType.RTCRoom)
        {
            if (template == Template.Template1V1)
                return  serverDomain + "weapp/double_room/";
            else
                return serverDomain + "weapp/multi_room/";
        }
        return serverDomain + "weapp/live_room/";
    }

    function swapToJsonStr(roomInfo) {

        if (custom.ip == "")
            return formatParamsToJson({
                type: roomInfo.type,
                action: roomInfo.roomAction,
                serverDomain: roomInfo.serverDomain,
                template: roomInfo.template,
                userList: custom.userList,
                IMList: custom.IMList,
                whiteboard: custom.whiteboard,
                screenShare: custom.screenShare,
                record: custom.record,
                sdkAppID: accountInfo.sdkAppID,
                accountType: accountInfo.accountType,
                userID: accountInfo.userID,
                userSig: accountInfo.userSig,
                userName: accountInfo.userName,
                userAvatar: accountInfo.userAvatar,
                roomID: roomInfo.roomID,
                roomInfo: roomInfo.roomName,
                title: roomInfo.roomTitle,
                logo: roomInfo.roomLogo,
                port: roomInfo.httpPort,
            });
        else
            return formatParamsToJson({
                type: roomInfo.type,
                action: roomInfo.roomAction,
                serverDomain: roomInfo.serverDomain,
                template: roomInfo.template,
                userList: custom.userList,
                IMList: custom.IMList,
                whiteboard: custom.whiteboard,
                screenShare: custom.screenShare,
                record: custom.record,
                sdkAppID: accountInfo.sdkAppID,
                accountType: accountInfo.accountType,
                userID: accountInfo.userID,
                userSig: accountInfo.userSig,
                userName: accountInfo.userName,
                userAvatar: accountInfo.userAvatar,
                roomID: roomInfo.roomID,
                roomInfo: roomInfo.roomName,
                title: roomInfo.roomTitle,
                logo: roomInfo.roomLogo,
                port: roomInfo.httpPort,
                'proxy': { 'ip': custom.ip, 'port': custom.port },
            });
        return "";
    }

    function randomPort(lowerValue, upperValue) {
        var lowerValue = 50000;
        var upperValue = 65535;
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }

    return {
        createExeAsRoom: createExeAsRoom,
        closeExeAsRoom: closeExeAsRoom,
        setListener: setListener,
        unload: unload,

        //枚举定义
        StyleType: StyleType,
        RoomAction: RoomAction,
        Template: Template,
        EXEUrl: EXEUrl,
    }
})()

function OnRecvServerCmd(data) {
    ExeMsgChannel.onRecvExeMsg(data);
}

ExeMsgChannel = (function () {

    var event = {
        onRecvCmd: function () { },		        // 收到命令
        onConnectStatus: function () { },	    // 联通失败超时被动断开
    };

    var bStart = false;
    var arrConnects = [];

    function startConnect(object) {

        if (!object || !object.data.serverDomain) {
            console.error("startConnect参数错误");
            object.fail && object.fail({
                errCode: -9999,
                errMsg: "startConnect参数错误"
            });
            return;
        }

        if (object.data.serverDomain == "")
        {
            console.error("startConnect:serverDomain参数错误");
            return;
        }
        console.log("startConnect-port:" + object.data.httpPort + ', url:' + object.data.serverDomain);

        var conObject = {
            httpPort: 0,
            localHttpDomain: '',
            bConnecting: true,  //判断
            nSendCnt: 0,
            nRecvCnt: 0,
            nDisConnectCnt: 0,
        };
        conObject.httpPort = object.data.httpPort;
        conObject.localHttpDomain = object.data.serverDomain;
        arrConnects.push(conObject);
        if (bStart == false) {
            bStart = true;
            startConnectHttpChannel();
        }
    }
    function stopConnect(object) {

        console.log('stopConnect-prot:' + object.data.port);
        var index = -1;
        for(var i = 0; i < arrConnects.length; i++ ){
            if (arrConnects[i].httpPort == object.data.port) {
                index = i;
                break;
            }
        }
        if(index == -1) {return;}
        arrConnects.splice(index, 1);
        if (arrConnects.length <= 0)
        {
            bStart = false;
        }
    };

    function sendCmd(object) {
        if (bStart == false) { return; }
        if (object && object.data && object.data.cmdUrl)
        {
            console.log('sendCmd:' + object.data.cmdUrl);
            $.ajax({
                type: "GET",
                cache: false,
                url: object.data.cmdUrl,
                data: { strCparent: $("#Equipment_ID").val() },
                dataType: "jsonp"
            })
		    .done(function (ret) {
		        console.log("sendCmd sucess");
		    })
		    .fail(function (res) {
		        console.log("sendCmd failed");
		    })
        }
    };

    function setListener(object) {
        if (!object) {
            console.error('setHttpIPCListener参数错误', object);
            return;
        }
        event.onRecvCmd = object.onRecvCmd || function () { };
        event.onConnectStatus = object.onConnectStatus || function () { };
    }

    function onRecvExeMsg(ret) {

    }

    /************************************
     * 本地http服务器定时器
     ***********************************/
    function startConnectHttpChannel() {
        for(var i = 0; i < arrConnects.length; i++ ){
            jsonpHttpRequest(i);
        }
        if (bStart) {
            setTimeout(function () {
                startConnectHttpChannel();
            }, 500);
        }
    }

    function jsonpHttpRequest(index, url) {
        var i = index;

        var bConnecting = arrConnects[i].bConnecting;
        var timeoutcnt = 3;
        if (bConnecting == true)
            timeoutcnt = 12;
        if (arrConnects[i].nDisConnectCnt >= timeoutcnt) {
            var curPort = arrConnects[i].httpPort;
            stopConnect({ data: { port: curPort } });
            if (bConnecting){
                event.onConnectStatus & event.onConnectStatus({ code: -1, port: curPort, msg: 'http通道联通失败!' });
            }
            else {
                event.onConnectStatus & event.onConnectStatus({ code: -2, port: curPort, msg: 'http通道联通超时!' });
            }
            return;
        }
        arrConnects[i].nSendCnt++;
        arrConnects[i].nDisConnectCnt++;
        if (arrConnects[i].nSendCnt % 30 == 0)
            console.log("[" + arrConnects[i].httpPort + "]" + "jsonpRequest nSendCnt:" + arrConnects[i].nSendCnt + ", nRecvCnt:" + arrConnects[i].nRecvCnt);

        $.ajax({
            type: "GET",
            cache: false,
            url: arrConnects[i].localHttpDomain,
            data: { strCparent: $("#Equipment_ID").val() },
            dataType: "jsonp"
        })
		.done(function (ret) {
		    if (ret && ret.port && ret.port != 0) {
		        var idx = -1;
		        for (var j = 0; j < arrConnects.length; j++) {
		            if (arrConnects[j].httpPort == ret.port) {
		                idx = j;
		                break;
		            }
		        }
		        if (idx == -1) { return; }

		        arrConnects[idx].nRecvCnt++;
		        arrConnects[idx].nDisConnectCnt = 0;

		        if (arrConnects[idx].bConnecting) {
		            arrConnects[idx].bConnecting = false;
		            event.onConnectStatus & event.onConnectStatus({ code: 0, port: ret.port, msg: 'http通道联通成功!' });
		        }

		        if (ret.code == 0 && ret.data != null) {
		            for (var i = 0; i < ret.data.length; i++) {
		                event.onRecvCmd & event.onRecvCmd(ret.data[i], ret.port);
		            }
		        }
		    }
		})
		.fail(function (res) {
		    console.log("failed");
		    console.log(res);
		})
    }

    return {
        startConnect: startConnect,
        stopConnect: stopConnect,
        setListener: setListener,
        sendCmd: sendCmd,
        onRecvExeMsg: onRecvExeMsg,
    }
})()


/***********************************************************************************
* 获取用户登录roomserver鉴权信息
************************************************************************************/
function getSDKLoginInfo(params) {
    console.log('getSDKLoginInfo.called');
    request({
        url: params.data.roomServerDomain + "weapp/utils/get_login_info",
        method: params.data.method,
        data: {
            userID: params.data.userID,
            //time: params.data.time
        },
        success: function (ret) {
            console.log("getSDKLoginInfo.result:", ret);
            params.success && params.success(ret);
        },
        fail: params.fail
    });
}


/***********************************************************************************
* http请求通用代码
************************************************************************************/

function request(object) {
    if (!object.url) {
        console.log('object.ur' + object.url);
        object.fail || object.fail({ errCode: -1, errMsg: "url 为空, 请调用init接口进行设置" });
        return;
    }
    httpRequest({
        url: object.url,
        data: object.data || {},
        method: object.method,
        success: object.success || function () { },
        fail: object.fail || function () { },
        complete: object.complete || function () { }
    })
}

function httpRequest(object) {

    object = object || {};
    object.method = (object.method || "GET").toUpperCase();
    object.dataType = "json";

    var params;
    if (object.method == "GET")
        params = formatParamsToUrl(object.data);
    else if(object.method == "POST")
        params = formatParamsToJson(object.data);
    else
        params = formatParamsToJson(object.data);
    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var timeout_time = typeof (object.timeout) == "undefined" ? 10000 : object.timeout;
    var timeout = false;
    var timer = setTimeout(function () {
        timeout = true;
        xhr.abort();
    }, timeout_time);
    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (timeout) {
                object.fail && object.fail({ code: -1, msg: "请求超时" });
            }
            var status = xhr.status;
            clearTimeout(timer);
            if (status >= 200 && status < 300) {
                var jsonObj = JSON.parse(xhr.responseText);
                object.success && object.success({ status: status, data: jsonObj });
            } else {
                object.fail && object.fail({ code: status, msg: xhr.message });
            }

            object.complete && object.complete();
        }
    }

    //连接 和 发送 - 第二步
    if (object.method == "GET") {
        xhr.open("GET", object.url + "?" + params, true);
        xhr.send(null);
    } else if (object.method == "POST") {
        xhr.open("POST", object.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}

function formatParamsToUrl(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    //arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

//格式化参数
function formatParamsToJson(data) {
    var str = JSON.stringify(data);
    return str;
}