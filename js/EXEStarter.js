
/*
* version:  3.1.2.0
* author :  腾讯云官方团队
* info   :  EXEStarter.js 用来给web和本地exe进行通信的类库。
*/

/*
* LiveRoom 主用于直播视频，支持视频连麦功能
*/
var LiveRoom = {
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
     *     template:    String  视频窗口摆放样式，默认1V1。更多参考EnumDef.Template定义
     *  },
     *  custom: {   //可选参数
     *     userList:    bool    用户列表模块，可以不设置，默认true
     *     IMList :     bool    IM聊天模块，可以不设置，默认true
     *     whiteboard:  bool    白板模块，可以不设置，默认true
     *     screenShare: bool    本地屏幕采集作为视频源，可以不设置，默认true
     *     exeUrl:      String  指定自定义EXE的下载URL
     *     proxy_ip:    String  代理IP，可以不设置，默认不开启代理
     *     proxy_port:  Int     代理端口，可以不设置，默认不开启代理
     *     singleton:   bool    exe是否设置单例模式，可以不设置，默认开启。
     *     mixRecord:   bool    云端混流录制，开通点播服务才能起效。可以不设置，默认关闭。
     *     screenRecord:  Int   录屏模式，参考EnumDef.ScreenRecordType定义
     *     cloudRecordUrl: String 录屏模式地址 screenRecord == EnumDef.ScreenRecordType.RecordScreenToServer需要用到。
     *  },
     * success       function  成功回调
     * fail          function  失败回调  errCode == -1时,检测本地未安装EXE，需要处理未安装逻辑。
     * }
     */
    startEXE: function (object) { },

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
    stopEXE: function (object) { },
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
    *      onRecvEvent           function  //透传流状态信息
    *          {
    *              roomID          String 
    *              cmd             JSON
    *          }
    *  }
    */
    setListener: function (object) { },
    unload: function () { }, //页面时调用
}
/*
* RtcRoom 主用于视频通话，如1v1对话
*/
var RtcRoom = {
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
     *     template:    String  视频窗口摆放样式，默认1V1。更多参考EnumDef.Template定义
     *  },
     *  custom: {   //可选参数
     *     userList:    bool    用户列表模块，可以不设置，默认true
     *     IMList :     bool    IM聊天模块，可以不设置，默认true
     *     whiteboard:  bool    白板模块，可以不设置，默认true
     *     screenShare: bool    本地屏幕采集作为视频源，可以不设置，默认true
     *     record:      bool    云端录制视频云，支持mp4和hls两种格式，录制的视频文件可以从点播的视频管理页面查找和下载。默认 false,开通点播服务才能起效。
     *     exeUrl:      String  指定自定义EXE的下载URL
     *     proxy_ip:    String  代理IP，可以不设置，默认不开启代理
     *     proxy_port:  Int     代理端口，可以不设置，默认不开启代理
     *     singleton:   bool    exe是否设置单例模式，可以不设置，默认开启。
     *     mixRecord:   bool    云端混流录制，开通点播服务才能起效。可以不设置，默认关闭。
     *     screenRecord:  Int   录屏模式，参考EnumDef.ScreenRecordType定义
     *     cloudRecordUrl: String 录屏模式地址 screenRecord == EnumDef.ScreenRecordType.RecordScreenToServer需要用到。
     *  },
     * success       function  成功回调
     * fail          function  失败回调  errCode == -1时,检测本地未安装EXE，需要处理未安装逻辑。
     * }
     */
    startEXE: function (object) { },
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
    stopEXE: function (object) { },
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
    *      onRecvEvent           function  //透传流状态信息
    *          {
    *              roomID          String 
    *              cmd             JSON
    *          }
    *  }
    */
    setListener: function (object) { },
    unload: function () { },  //页面退出时调用。
}

/*
* PushPlay 支持自定义推流地址的视频模板,常见场景：客服1v1，
*/
var PushPlay = {
    /**
     * 以纯粹推拉流的模式打开EXE进程:
     * @para。m object
     * {
     *  data: {
     *      pushURL       String    推流地址
     *      playURL       String    拉流地址
     *      title         String    Title
     *      logoUrl       String    图片地址
     *  },
     *  custom: {   //可选参数
     *     top_window   Bool    默认false,是否置顶窗口。
     *     proxy_ip:    String  代理IP，可以不设置，默认不开启代理
     *     proxy_port:  Int     代理端口，可以不设置，默认不开启代理
     *     singleton:   bool    exe是否设置单例模式，可以不设置，默认开启。
     *  },
     * success       function  成功回调
     * fail          function  失败回调
     * }
     */
    startEXE: function (object) { },
    stopEXE: function () { },

    /**
     * 截图接口:
     * @param object
     * {
     *  data: {
     *      userRole:  String   取值[pusher-截图推流端]\[player-截图拉流端]
     *  },
     *  图片数据从事件回调:onRecvEvent中获取：{"event":"snapshot", "base64Img:"xxxxx", "id":"xxx"}
     * }
     */
    videoSnapshot: function (object) { },

     /**  监听回调时间
     *  @param object
     *  {
     *      onRecvEvent           function  //流状态信息
     *          {
     *              cmd           JSON
     *          }
     *  }
     */
    setListener: function (object) { },

    unload: function () { },    //页面退出时调用。
}


// ExeMsgChannel 用于和exe通信的基础公用模块：
var ExeMsgChannel = {
    startConnect: function (object) { },
    stopConnect: function (object) { },
    setListener: function (object) { },
    sendCmd: function (object) { },  // 发送字符串信令：http://localhost:500001/leaveRoom
}

// 定义公共枚举变量
var EnumDef = {}
EnumDef = (function () {
    var EXEUrl = "http://img.qcloud.com/open/qcloud/video/act/liteavWeb/webexe/exe/TXCloudRoomSetup.exe";
    var RoomAction = {
        CreateRoom: 'createRoom',  //创建房间
        EnterRoom: 'enterRoom',    //视频通话模式
    }
    var Template = {
        Template1V1: '1v1',
        Template1V2: '1v2',
        Template1V3: '1v3',
        Template1V4: '1v4',
    };
    var ScreenRecordType = {
        RecordNone : 0,  
        RecordScreenToServer: 1,    //录制视频窗口数据到后台
        RecordScreenToClient: 2,    //录制视频窗口数据到本地
        RecordScreenToBoth: 3,      //录制视频窗口数据到本地
    };

    return {
        //枚举定义
        RoomAction: RoomAction,
        Template: Template,
        ScreenRecordType: ScreenRecordType,
        EXEUrl: EXEUrl,
    }
})()

LiveRoom = (function () {

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
        exeUrl: EnumDef.EXEUrl,
        ip: '',
        port: 0,
        singleton: true,
        mixRecord: false,
        screenRecord: EnumDef.ScreenRecordType.RecordNone,
        cloudRecordUrl: "",
        dataChannel: "externalProtol",
    };

    var starterReportInfo = {
        type: "webexe",
        str_app_name: "Web",
        int32_token: "",
        int32_app_id: "",
        int64_ts_protol: "",
        int64_ts_first_reponse: "",
        int64_ts_protol_result: "",
        str_room_type: "",
        str_browser_name: getBrowserInfo,
    };

    //exe房间列表
    var arrExeRoom = []; var bSetChannelListener = false;
    var singletonPort = 48887; var bConnectExe = false; var bTestConnectExe = false;
    // 回调事件
    var event = {
        onRoomClose: function () { },       //房间关闭消息
        onMemberChange: function () { },    //
        onRecvRoomIMMsg: function () { },
        onRecvEvent: function () {},
    };

    function startEXE(object) {
        if (!object) {
            console.error("liveroom startEXE参数错误");
            object.fail && object.fail({ errCode: -9998, errMsg: "LiveRoom.startEXE object参数错误" });
            return;
        }

        if (!object.userdata || !object.userdata.userID || !object.userdata.userSig || !object.userdata.sdkAppID ||
            !object.userdata.accType || !object.roomdata.serverDomain || !object.roomdata.roomID || 
            !object.roomdata.roomAction) {
            console.error("liveroom startEXE参数错误");
            alert("LiveRoom.startEXE 参数错误")
            object.fail && object.fail({ errCode: -9999, errMsg: "LiveRoom.startEXE object参数错误" });
            return;
        }

        console.log("current-time:" + printLocalFormatTime());
        custom.singleton = (object.custom && object.custom.singleton) || true;

        if (custom.singleton == true) {
            if (arrExeRoom.length > 0) {
                object && object.fail && object.fail({
                    errCode: -2, errMsg: "单实例模式下：已经开启exe实例，请先关闭exe"
                });
                return;
            }
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
            type: "LiveRoom",
            template: EnumDef.Template.Template1V1,
            bSendParams: false,
        };
        roomInfo.roomAction = object.roomdata.roomAction;
        roomInfo.roomID = object.roomdata.roomID;
        roomInfo.roomName = object.roomdata.roomName;
        roomInfo.roomTitle = object.roomdata.roomTitle;
        roomInfo.roomLogo = object.roomdata.roomLogo;

        if (custom.singleton) {
            roomInfo.httpPort = singletonPort;
        }
        else {
            roomInfo.httpPort = randomPort();
        }
        roomInfo.roomCB = object;
        roomInfo.serverDomain = parseServerDomain(object.roomdata.serverDomain, object.roomdata.type, object.roomdata.template);
        roomInfo.template = object.roomdata.template;
        arrExeRoom.push(roomInfo);

        custom.userList = true;
        if (object.custom && typeof (object.custom.userList) != "undefined")
            custom.userList = object.custom.userList;

        custom.IMList = true;
        if (object.custom && typeof (object.custom.IMList) != "undefined")
            custom.IMList = object.custom.IMList;

        custom.whiteboard = true;
        if (object.custom && typeof (object.custom.whiteboard) != "undefined")
            custom.whiteboard = object.custom.whiteboard;

        custom.screenShare = true;
        if (object.custom && typeof (object.custom.screenShare) != "undefined")
            custom.screenShare = object.custom.screenShare;

        custom.mixRecord = true;
        if (object.custom && typeof (object.custom.mixRecord) != "undefined")
            custom.mixRecord = object.custom.mixRecord;

        custom.screenRecord = EnumDef.ScreenRecordType.RecordNone;
        if (object.custom && typeof (object.custom.screenRecord) != "undefined")
            custom.screenRecord = object.custom.screenRecord;

        custom.cloudRecordUrl = "";
        if (object.custom && typeof (object.custom.cloudRecordUrl) != "undefined")
            custom.cloudRecordUrl = object.custom.cloudRecordUrl;

        custom.exeUrl = EnumDef.EXEUrl;
        if (object.custom && typeof (object.custom.exeUrl) != "undefined")
            custom.exeUrl = object.custom.exeUrl;

        custom.ip = "";
        if (object.custom && typeof (object.custom.ip) != "undefined")
            custom.ip = object.custom.ip;

        custom.port = 0;
        if (object.custom && typeof (object.custom.port) != "undefined")
            custom.port = object.custom.port;

        if (isTridentKernel() == true) {
            custom.dataChannel = "localHttp";
        }


        //在此处拉起为协议：
        starterReportInfo.int32_token = roomInfo.roomID + "_" + accountInfo.userID + "_" + roomInfo.httpPort.toString();
        starterReportInfo.int32_app_id = accountInfo.sdkAppID;
        starterReportInfo.str_room_type = "LiveRoom";
        starterReportInfo.str_opt_type = roomInfo.roomAction;
        starterReportInfo.int64_ts_protol = getLocalUTCTime();

        bTestConnectExe = false;
        
        if (custom.singleton == false) {
            var params;
            if (isTridentKernel() == true) {
                roomInfo.bSendParams = true;
                params = getBaseParamsStr(roomInfo);
            }
            else {
                roomInfo.bSendParams = false;
                params = getFullParamsStr(roomInfo);
            }

            var urlStr = "TXCloudRoom://liteav/params?json=" +params;
            console.log(urlStr);
            if (isWindowOpen() == true) {
                window.open(urlStr);
            }
            else {
                window.location = urlStr;
            }
            ExeMsgChannel.startConnect({
                data: {
                    serverDomain: "http://localhost:" + roomInfo.httpPort.toString() + "/query",
                    httpPort: roomInfo.httpPort,
                    fistTimeout: 14,
                    disconnectTimeout: 4,
                }
            });
        }
        else {
            bTestConnectExe = true;
            ExeMsgChannel.startConnect({
                data: {
                    serverDomain: "http://localhost:" + roomInfo.httpPort.toString() + "/query",
                    httpPort: roomInfo.httpPort,
                    fistTimeout: 14,
                    disconnectTimeout: 4,
                }
            });
            if (bConnectExe == false) {                //先让http通道起来检测有没EXE实例了.
                setTimeout(function () {
                    //如果没有实例
                    if (bConnectExe == false) {
                        bTestConnectExe = false;
                        var params;
                        if (isTridentKernel() == true) {
                            roomInfo.bSendParams = true;
                            params = getBaseParamsStr(roomInfo);
                        }
                        else {
                            roomInfo.bSendParams = false;
                            params = getFullParamsStr(roomInfo);
                        }
                        var urlStr = "TXCloudRoom://liteav/params?json=" +params;
                        console.log(urlStr);
                        if (isWindowOpen() == true) {
                            window.open(urlStr);
                        }
                        else {
                            window.location = urlStr;
                        }
                    }
                }, 700);
            }
        }
        console.log("openRoom-roomID:" + roomInfo.roomID + ", port:" + roomInfo.httpPort);
    }

    function stopEXE(object) {
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
        console.log("[" + arrExeRoom[index].httpPort + "]" + 'stopEXE: url:' + cmdUrl);
        ExeMsgChannel.sendCmd({
            data: {cmdUrl: cmdUrl + "?",},
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
            stopEXE({ data: { roomID: arrExeRoom[i].roomID } });
        }
    }

    function setListener(object) {
        
        console.log('-----setExeRoomListener------');
        if (!object) {
            console.error('setExeRoomListener参数错误', object);
            return;
        }
        event.onRecvEvent = object.onRecvEvent || function () { };
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
                        console.log("[" + room.httpPort + "]：" + JSON.stringify(cmd));
                        if (cmd.event == "roomStatus") {
                            console.log("[" + room.httpPort + "]" + "createRoom cmd-result:" + cmd.code);
                            if (cmd.code == 0) {
                                console.log("current-time:" + printLocalFormatTime());
                            }
                            else if (cmd.code == 1) {
                                console.log("current-time:" + printLocalFormatTime());
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
                            event.onRecvEvent && event.onRecvEvent(room.roomID, cmd);
                        }
                        else if (port == room.httpPort) {
                            event.onRecvEvent && event.onRecvEvent(room.roomID, cmd);
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
                        if (bTestConnectExe) {
                            room.roomCB && room.roomCB.fail && room.roomCB.fail({
                                errCode: -2, errMsg: "单实例模式下：已经开启exe实例，请先关闭exe"
                            });
                        }
                        else {
                            //伪协议localHttp启动模式，需要重传一下参数。
                            if (room.bSendParams == true) {
                                var params = getFullParamsStr(room);
                                var cmdUrl = "http://localhost:" + room.httpPort.toString() + "/externalProtol?json=" + params;
                                //console.log("[" + room.httpPort + "]" + 'bSendParams:' + cmdUrl);
                                ExeMsgChannel.sendCmd({
                                    data: { cmdUrl: cmdUrl + "?", },
                                });
                                arrExeRoom[index].bSendParams = false;
                            }
                            starterReportInfo.int64_ts_first_reponse = getLocalUTCTime();
                            starterReportInfo.int64_ts_protol_result = 1;
                            starterStatusReport(starterReportInfo);
                            room.roomCB && room.roomCB.success && room.roomCB.success({ data: { httpPort: room.httpPort } });
                        }
                        bTestConnectExe = false;
                        bConnectExe = true;
                        //arrExeRoom[index].roomCB = null;
                    }
                    else if (ret.code == -1 && ret.port == room.httpPort) {
                        console.log("[" + room.httpPort + "]" + "onConnectStatus : ret.code = -1");
                        room.roomCB && room.roomCB.fail && room.roomCB.fail({ errCode: -1, errMsg: "检测EXE未安装，正在下载EXE! 下载完成请安装" });
                        //arrExeRoom[index].roomCB = null;
                        arrExeRoom.splice(index, 1);
                        bConnectExe = false;

                        starterReportInfo.int64_ts_first_reponse = getLocalUTCTime();
                        starterReportInfo.int64_ts_protol_result = 0;
                        starterStatusReport(starterReportInfo);
                    }
                    else if (ret.code == -2 && ret.port == room.httpPort) {
                        console.log("[" + room.httpPort + "]" + "onConnectStatus : ret.code = -2");
                        bConnectExe = false;
                        event.onRoomClose && event.onRoomClose({
                            data: {
                                roomID: room.roomID, roomName: room.roomName,
                                code: -2000, msg: "HTTP链接超时断开!"
                            }
                        });
                        arrExeRoom.splice(index, 1);
                    }
                },
            });
        }
    }

    function parseServerDomain(serverDomain, type, template) {
        return serverDomain + "weapp/live_room/";
    }

    function getBaseParamsStr(roomInfo) {
        return formatParamsToJson({
            dataChannel: custom.dataChannel,
            port: roomInfo.httpPort,
            singleton: custom.singleton,
        });
    }

    function getFullParamsStr(roomInfo) {
        if (custom.ip == "")
            return formatParamsToJson({
                dataChannel: custom.dataChannel,
                type: roomInfo.type,
                action: roomInfo.roomAction,
                serverDomain: encodeURIComponent(roomInfo.serverDomain),
                template: roomInfo.template,
                userList: custom.userList,
                IMList: custom.IMList,
                whiteboard: custom.whiteboard,
                screenShare: custom.screenShare,
                sdkAppID: accountInfo.sdkAppID,
                accountType: accountInfo.accountType,
                userID: encodeURIComponent(accountInfo.userID),
                userSig: encodeURIComponent(accountInfo.userSig),
                userName: encodeURIComponent(accountInfo.userName),
                userAvatar: encodeURIComponent(accountInfo.userAvatar),
                roomID: encodeURIComponent(roomInfo.roomID),
                roomInfo: encodeURIComponent(roomInfo.roomName),
                title: encodeURIComponent(roomInfo.roomTitle),
                logo: encodeURIComponent(roomInfo.roomLogo),
                port: roomInfo.httpPort,
                singleton: custom.singleton,
                mixRecord: custom.mixRecord,
                screenRecord: custom.screenRecord,
                recordUrl: encodeURIComponent(custom.cloudRecordUrl),
            });
        else
            return formatParamsToJson({
                dataChannel: custom.dataChannel,
                type: roomInfo.type,
                action: roomInfo.roomAction,
                serverDomain: encodeURIComponent(roomInfo.serverDomain),
                template: roomInfo.template,
                userList: custom.userList,
                IMList: custom.IMList,
                whiteboard: custom.whiteboard,
                screenShare: custom.screenShare,
                sdkAppID: accountInfo.sdkAppID,
                accountType: accountInfo.accountType,
                userID: encodeURIComponent(accountInfo.userID),
                userSig: encodeURIComponent(accountInfo.userSig),
                userName: encodeURIComponent(accountInfo.userName),
                userAvatar: encodeURIComponent(accountInfo.userAvatar),
                roomID: encodeURIComponent(roomInfo.roomID),
                roomInfo: encodeURIComponent(roomInfo.roomName),
                title: encodeURIComponent(roomInfo.roomTitle),
                logo: encodeURIComponent(roomInfo.roomLogo),
                port: roomInfo.httpPort,
                singleton: custom.singleton,
                mixRecord: custom.mixRecord,
                screenRecord: custom.screenRecord,
                recordUrl: encodeURIComponent(custom.cloudRecordUrl),
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
        startEXE: startEXE,
        stopEXE: stopEXE,
        setListener: setListener,
        unload: unload,
    }
})()

RtcRoom = (function () {

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
        IMList: true,
        whiteboard: true,
        screenShare: true,
        record: false,
        exeUrl: EnumDef.EXEUrl,
        ip: '',
        port: 0,
        singleton: true,
        mixRecord: false,
        screenRecord: EnumDef.ScreenRecordType.RecordNone,
        cloudRecordUrl: "",
        dataChannel: "externalProtol",
    };
    var starterReportInfo = {
        type: "webexe",
        str_app_name: "Web",
        int32_token: "",
        int32_app_id: "",
        int64_ts_protol: "",
        int64_ts_first_reponse: "",
        int64_ts_protol_result: "",
        str_room_type: "",
        str_browser_name: getBrowserInfo,
    };
    //exe房间列表
    var arrExeRoom = []; var bSetChannelListener = false;
    var singletonPort = 48887; var bConnectExe = false; var bTestConnectExe = false;
    // 回调事件
    var event = {
        onRoomClose: function () { },       //房间关闭消息
        onMemberChange: function () { },    //
        onRecvRoomIMMsg: function () { },
        onRecvEvent: function () { },
    };

    function startEXE(object) {
        if (!object || !object.roomdata.serverDomain) {
            console.error("RtcRoom startEXE参数错误");
            object.fail && object.fail({ errCode: -9998, errMsg: "RtcRoom.startEXE object参数错误" });
            return;
        }

        if (!object.userdata.userID || !object.userdata.userSig || !object.userdata.sdkAppID ||
            !object.userdata.accType || !object.roomdata.serverDomain || !object.roomdata.roomID ||
            !object.roomdata.roomAction)
        {
            console.error("RtcRoom startEXE参数错误");
            alert("RtcRoom.startEXE 参数错误")
            object.fail && object.fail({ errCode: -9999, errMsg: "RtcRoom.startEXE object参数错误" });
             return;
        }

        console.log("current-time:" + printLocalFormatTime());
        custom.singleton = (object.custom && object.custom.singleton) || true;

        if (custom.singleton == true) {
            if (arrExeRoom.length > 0) {
                object && object.fail && object.fail({
                    errCode: -2, errMsg: "单实例模式下：已经开启exe实例，请先关闭exe"
                });
                return;
            }
        }

        if (bSetChannelListener == false)
            setChannelListener(true);

        accountInfo.userID = object.userdata.userID;
        accountInfo.userSig = object.userdata.userSig;
        accountInfo.sdkAppID = object.userdata.sdkAppID;
        accountInfo.accountType = object.userdata.accType;
        accountInfo.userName = object.userdata.userName || accountInfo.userID;
        accountInfo.userAvatar = object.userAvatar || "123";
        var date = new Date();
        var mytime = date.toLocaleTimeString(); //获取当前时间
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
            type: 'RTCRoom',
            template: EnumDef.Template.Template1V1,
            bSendParams: false,
        };
        roomInfo.roomAction = object.roomdata.roomAction;
        roomInfo.roomID = object.roomdata.roomID;
        roomInfo.roomName = object.roomdata.roomName;
        roomInfo.roomTitle = object.roomdata.roomTitle;
        roomInfo.roomLogo = object.roomdata.roomLogo;
        if (custom.singleton) {
            roomInfo.httpPort = singletonPort;
        }
        else {
            roomInfo.httpPort = randomPort();
        }
        roomInfo.roomCB = object;
        roomInfo.serverDomain = parseServerDomain(object.roomdata.serverDomain, object.roomdata.type, object.roomdata.template);
        roomInfo.template = object.roomdata.template;
        arrExeRoom.push(roomInfo);

        starterReportInfo.int32_token = roomInfo.roomID + "_" + accountInfo.userID + "_" + roomInfo.httpPort.toString();
        starterReportInfo.int32_app_id = accountInfo.sdkAppID;
        starterReportInfo.str_room_type = "RTCRoom";
        starterReportInfo.str_opt_type = roomInfo.roomAction;
        starterReportInfo.int64_ts_protol = getLocalUTCTime();

        custom.userList = true;
        if (object.custom && typeof (object.custom.userList) != "undefined")
            custom.userList = object.custom.userList;

        custom.IMList = true;
        if (object.custom && typeof (object.custom.IMList) != "undefined")
            custom.IMList = object.custom.IMList;

        custom.whiteboard = true;
        if (object.custom && typeof (object.custom.whiteboard) != "undefined")
            custom.whiteboard = object.custom.whiteboard;

        custom.screenShare = true;
        if (object.custom && typeof (object.custom.screenShare) != "undefined")
            custom.screenShare = object.custom.screenShare;

        custom.mixRecord = true;
        if (object.custom && typeof (object.custom.mixRecord) != "undefined")
            custom.mixRecord = object.custom.mixRecord;

        custom.screenRecord = EnumDef.ScreenRecordType.RecordNone;
        if (object.custom && typeof (object.custom.screenRecord) != "undefined")
            custom.screenRecord = object.custom.screenRecord;

        custom.cloudRecordUrl = "";
        if (object.custom && typeof (object.custom.cloudRecordUrl) != "undefined")
            custom.cloudRecordUrl = object.custom.cloudRecordUrl;

        custom.exeUrl = EnumDef.EXEUrl;
        if (object.custom && typeof (object.custom.exeUrl) != "undefined")
            custom.exeUrl = object.custom.exeUrl;

        custom.ip = "";
        if (object.custom && typeof (object.custom.ip) != "undefined")
            custom.ip = object.custom.ip;

        custom.port = 0;
        if (object.custom && typeof (object.custom.port) != "undefined")
            custom.port = object.custom.port;


        if (isTridentKernel() == true) {
            custom.dataChannel = "localHttp";
        }

        bTestConnectExe = false;

        if (custom.singleton == false) {
            var params;
            if (isTridentKernel() == true) {
                roomInfo.bSendParams = true;
                params = getBaseParamsStr(roomInfo);
            }
            else {
                roomInfo.bSendParams = false;
                params = getFullParamsStr(roomInfo);
            }
            var urlStr = "TXCloudRoom://liteav/params?json=" + params;
            console.log(urlStr);
            if (isWindowOpen() == true) {
                window.open(urlStr);
            }
            else {
                //self.location.href = urlStr;
                window.location = urlStr;
            }
            ExeMsgChannel.startConnect({
                data: {
                    serverDomain: "http://localhost:" + roomInfo.httpPort.toString() + "/query",
                    httpPort: roomInfo.httpPort,
                    fistTimeout: 14,
                    disconnectTimeout: 4,
                }
            });
        }
        else {
            bTestConnectExe = true;
            ExeMsgChannel.startConnect({
                data: {
                    serverDomain: "http://localhost:" + roomInfo.httpPort.toString() + "/query",
                    httpPort: roomInfo.httpPort,
                    fistTimeout: 14,
                    disconnectTimeout: 4,
                }
            });
            if (bConnectExe == false) {                //先让http通道起来检测有没EXE实例了.
                setTimeout(function () {
                    //如果没有实例
                    if (bConnectExe == false) {
                        bTestConnectExe = false;
                        var params;
                        if (isTridentKernel() == true) {
                            roomInfo.bSendParams = true;
                            params = getBaseParamsStr(roomInfo);
                        }
                        else {
                            roomInfo.bSendParams = false;
                            params = getFullParamsStr(roomInfo);
                        }
                        var urlStr = "TXCloudRoom://liteav/params?json=" + params;
                        console.log(urlStr);
                        if (isWindowOpen() == true) {
                            window.open(urlStr);
                        }
                        else {
                            window.location = urlStr;
                        }
                    }
                }, 700);
            }
        }
        console.log("openRoom-roomID:" + roomInfo.roomID + ", port:" + roomInfo.httpPort);
    }

    function stopEXE(object) {
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
        console.log("[" + arrExeRoom[index].httpPort + "]" + 'stopEXE: url:' + cmdUrl);
        ExeMsgChannel.sendCmd({
            data: { cmdUrl: cmdUrl + "?", },
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
            stopEXE({ data: { roomID: arrExeRoom[i].roomID } });
        }
    }

    function setListener(object) {

        console.log('-----setExeRoomListener------');
        if (!object) {
            console.error('setExeRoomListener参数错误', object);
            return;
        }
        event.onRecvEvent = object.onRecvEvent || function () { };
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
                        console.log("[" + room.httpPort + "]：" + JSON.stringify(cmd));
                        if (cmd.event == "roomStatus") {
                            console.log("[" + room.httpPort + "]" + "createRoom cmd-result:" + cmd.code);
                            if (cmd.code == 0) {
                                console.log("current-time:" + printLocalFormatTime());
                            }
                            else if (cmd.code == 1) {
                                console.log("current-time:" + printLocalFormatTime());
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
                            event.onRecvEvent && event.onRecvEvent(room.roomID, cmd);
                        }
                        else if (port == room.httpPort) {
                            event.onRecvEvent && event.onRecvEvent(room.roomID, cmd);
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
                        if (bTestConnectExe) {
                            room.roomCB && room.roomCB.fail && room.roomCB.fail({
                                errCode: -2, errMsg: "单实例模式下：已经开启exe实例，请先关闭exe"
                            });
                        }
                        else {
                            //伪协议localHttp启动模式，需要重传一下参数。
                            if (room.bSendParams == true) {
                                var params = getFullParamsStr(room);
                                var cmdUrl = "http://localhost:" + room.httpPort.toString() + "/externalProtol?json=" + params;
                                //console.log("[" + room.httpPort + "]" + 'bSendParams:' + cmdUrl);
                                ExeMsgChannel.sendCmd({
                                    data: { cmdUrl: cmdUrl + "?", },
                                });
                                arrExeRoom[index].bSendParams = false;
                            }
                            starterReportInfo.int64_ts_first_reponse = getLocalUTCTime();
                            starterReportInfo.int64_ts_protol_result = 1;
                            starterStatusReport(starterReportInfo);
                            room.roomCB && room.roomCB.success && room.roomCB.success({ data: { httpPort: room.httpPort } });
                        }
                        bTestConnectExe = false;
                        bConnectExe = true;
                        //arrExeRoom[index].roomCB = null;
                    }
                    else if (ret.code == -1 && ret.port == room.httpPort) {
                        console.log("[" + room.httpPort + "]" + "onConnectStatus : ret.code = -1");
                        room.roomCB && room.roomCB.fail && room.roomCB.fail({ errCode: -1, errMsg: "检测EXE未安装，正在下载EXE! 下载完成请安装" });
                        //arrExeRoom[index].roomCB = null;
                        arrExeRoom.splice(index, 1);
                        bConnectExe = false;
                        starterReportInfo.int64_ts_first_reponse = getLocalUTCTime();
                        starterReportInfo.int64_ts_protol_result = 0;
                        starterStatusReport(starterReportInfo);
                    }
                    else if (ret.code == -2 && ret.port == room.httpPort) {
                        console.log("[" + room.httpPort + "]" + "onConnectStatus : ret.code = -2");
                        bConnectExe = false;
                        event.onRoomClose && event.onRoomClose({
                            data: {
                                roomID: room.roomID, roomName: room.roomName,
                                code: -2000, msg: "HTTP链接超时断开!"
                            }
                        });
                        arrExeRoom.splice(index, 1);
                    }
                },
            });
        }
    }

    function parseServerDomain(serverDomain, type, template) {
        if (template == EnumDef.Template.Template1V1)
            return serverDomain + "weapp/double_room/";
        else
            return serverDomain + "weapp/multi_room/";
    }

    function getBaseParamsStr(roomInfo) {
        return formatParamsToJson({
            dataChannel: custom.dataChannel,
            port: roomInfo.httpPort,
            singleton: custom.singleton,
        });
    }

    function getFullParamsStr(roomInfo) {
        if (custom.ip == "")
            return formatParamsToJson({
                dataChannel: custom.dataChannel,
                type: roomInfo.type,
                action: roomInfo.roomAction,
                serverDomain: encodeURIComponent(roomInfo.serverDomain),
                template: roomInfo.template,
                userList: custom.userList,
                IMList: custom.IMList,
                whiteboard: custom.whiteboard,
                screenShare: custom.screenShare,
                sdkAppID: accountInfo.sdkAppID,
                accountType: accountInfo.accountType,
                userID: encodeURIComponent(accountInfo.userID),
                userSig: encodeURIComponent(accountInfo.userSig),
                userName: encodeURIComponent(accountInfo.userName),
                userAvatar: encodeURIComponent(accountInfo.userAvatar),
                roomID: encodeURIComponent(roomInfo.roomID),
                roomInfo: encodeURIComponent(roomInfo.roomName),
                title: encodeURIComponent(roomInfo.roomTitle),
                logo: encodeURIComponent(roomInfo.roomLogo),
                port: roomInfo.httpPort,
                singleton: custom.singleton,
                mixRecord: custom.mixRecord,
                screenRecord: custom.screenRecord,
                recordUrl: encodeURIComponent(custom.cloudRecordUrl),
            });
        else
            return formatParamsToJson({
                dataChannel: custom.dataChannel,
                type: roomInfo.type,
                action: roomInfo.roomAction,
                serverDomain: encodeURIComponent(roomInfo.serverDomain),
                template: roomInfo.template,
                userList: custom.userList,
                IMList: custom.IMList,
                whiteboard: custom.whiteboard,
                screenShare: custom.screenShare,
                sdkAppID: accountInfo.sdkAppID,
                accountType: accountInfo.accountType,
                userID: encodeURIComponent(accountInfo.userID),
                userSig: encodeURIComponent(accountInfo.userSig),
                userName: encodeURIComponent(accountInfo.userName),
                userAvatar: encodeURIComponent(accountInfo.userAvatar),
                roomID: encodeURIComponent(roomInfo.roomID),
                roomInfo: encodeURIComponent(roomInfo.roomName),
                title: encodeURIComponent(roomInfo.roomTitle),
                logo: encodeURIComponent(roomInfo.roomLogo),
                port: roomInfo.httpPort,
                singleton: custom.singleton,
                mixRecord: custom.mixRecord,
                screenRecord: custom.screenRecord,
                recordUrl: encodeURIComponent(custom.cloudRecordUrl),
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
        startEXE: startEXE,
        stopEXE: stopEXE,
        setListener: setListener,
        unload: unload,
    }
})()


PushPlay = (function () {
    var session = {
        type: "CustomServiceLive",
        pushURL: "",
        playURL: "",
        title: "",
        logoUrl: "",
        top_window: true,
        proxy_ip: '',
        proxy_port: 0,
        httpPort: 48888,  //端口固定，保证和exe单实例通信
        singleton: true,
        dataChannel: "externalProtol",
        bSendParams: false,
        cb: null,
    };

    var starterReportInfo = {
        type: "webexe",
        str_app_name: "Web",
        int32_token: "",
        int32_app_id: "",
        int64_ts_protol: "",
        int64_ts_first_reponse: "",
        int64_ts_protol_result: "",
        str_room_type: "",
        str_browser_name: getBrowserInfo,
    };

    var bSetChannelListener = false;
    var bConnectExe = false;
    // 回调事件
    var event = {
        onRecvEvent: function () { },
    };

    function startEXE(object) {
        if (!object) {
            console.error("PushPlay startEXE参数错误");
            object.fail && object.fail({ errCode: -9998, errMsg: "PushPlay.startEXE object参数错误" });
            return;
        }

        if (!object.data.pushURL || !object.data.playURL)
        {
             console.error("PushPlay startEXE参数错误");
             alert("PushPlay.startEXE 参数错误")
             object.fail && object.fail({ errCode: -9999, errMsg: "PushPlay.startEXE object参数错误" });
             return;
        }

        console.log("current-time:" + printLocalFormatTime());
        if (bSetChannelListener == false)
            setChannelListener(true);
        session.pushURL = object.data.pushURL;
        session.playURL = object.data.playURL;
        session.title = object.data.title;
        session.logoUrl = object.data.logoUrl;
        session.top_window = (object.custom && object.custom.top_window) || true;
        session.proxy_ip = (object.custom && object.custom.proxy_ip) || "";
        session.proxy_port = (object.custom && object.custom.proxy_port) || 0;
        session.singleton = (object.custom && object.custom.singleton) || true;
        session.cb = object;

        if (isTridentKernel() == true) {
            session.dataChannel = "localHttp";
        }

        starterReportInfo.int32_token = session.httpPort.toString();
        starterReportInfo.str_room_type = "PushPlay";
        starterReportInfo.int64_ts_protol = getLocalUTCTime();

        //在此处拉起为协议：
        if(bConnectExe == false){
            reStartExe(session)
        }
        else{
            doHttpCreateSession(session);
        }
    }
    function doHttpCreateSession(session_t) {
        var cmdUrl = "http://localhost:" + session_t.httpPort.toString() + "/csliveCreateSession?";
        var paramPushUri = encodeURIComponent("pushURL") + "=" + encodeURIComponent(session_t.pushURL);
        var paramPullUri = encodeURIComponent("pullURL") + "=" + encodeURIComponent(session_t.playURL);
        cmdUrl = cmdUrl + paramPushUri + '&' + paramPullUri;
        console.log('createSession-url:' + cmdUrl);
        ExeMsgChannel.sendCmd({ data: { cmdUrl: cmdUrl  + "&", }, });
    }

    function reStartExe(session_t) {
        ExeMsgChannel.startConnect({
            data: {
                serverDomain: "http://localhost:" + session_t.httpPort.toString() + "/query",
                httpPort: session_t.httpPort,
                fistTimeout: 14,
                disconnectTimeout: 100,
            }
        })
        //先让http通道起来检测有没EXE实例了.
        setTimeout(function () {
            if (bConnectExe == false) {
                var params;
                if (isTridentKernel() == true) {
                    session.bSendParams = true;
                    params = getBaseParamsStr(session_t);
                }
                else {
                    session.bSendParams = false;
                    params = getFullParamsStr(session_t);
                }
                var urlStr = "TXCloudRoom://liteav/params?json=" + params;
                console.log(urlStr);
                if (isWindowOpen() == true) {
                    window.open(urlStr);
                }
                else {
                    window.location = urlStr;
                }
            }
            else{
                doHttpCreateSession(session);
            }
        }, 1000);
        console.log("createSession-port:" + session_t.httpPort);
    }

    function stopEXE() {
        //情况数据
        if (bConnectExe == false) { return; }
        var cmdUrl = "http://localhost:" + session.httpPort.toString() + "/csliveDestroySession";
        console.log('destroySession-url:' + cmdUrl);
        ExeMsgChannel.sendCmd({data: { cmdUrl: cmdUrl + "?", },});
    }

    function videoSnapshot(object) {
        if (bConnectExe == false) { return; }
        if (object && object.data.userRole) {
            if (object.data.userRole == "pusher") {
                var cmdUrl = "http://localhost:" + session.httpPort.toString() + "/csliveSnapshotPusher";
                console.log('snapshot-url:' + cmdUrl);
                ExeMsgChannel.sendCmd({ data: { cmdUrl: cmdUrl + "?", }, });
            }
            else if (object.data.userRole == "player") {
                var cmdUrl = "http://localhost:" + session.httpPort.toString() + "/csliveSnapshotPlayer";
                console.log('snapshot-url:' + cmdUrl);
                ExeMsgChannel.sendCmd({ data: { cmdUrl: cmdUrl + "?", }, });
            }
        }
    }

    function unload() {
        //清空所有的exe：
        stopEXE();
        ExeMsgChannel.setListener({});
        ExeMsgChannel.stopConnect({
            data: { port: session.httpPort }
        });
    }

    function setListener(object) {
        console.log('-----setListener------');
        if (!object) {
            console.error('setListener参数错误', object);
            return;
        }
        event.onRecvEvent = object.onRecvEvent || function () { };
        if (typeof (object.onRecvEvent) == "undefined") {
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
                    if (cmd == null || typeof (cmd) == "undefined") { return; }
                    if (cmd.event != null && typeof (cmd.event) != "undefined") {
                        if (cmd.event == "sdkEventCallback" && port == session.httpPort) {
                            //console.log("[" + session.httpPort + "]：" + JSON.stringify(cmd));
                            event.onRecvEvent && event.onRecvEvent(cmd);
                            if (cmd.eventID != 200001 && cmd.eventID != 200002) {
                                console.log(printLocalFormatTime() + " [" + session.httpPort + "]：" + JSON.stringify(cmd));
                            }
                        }
                        else if (port == session.httpPort) {
                            event.onRecvEvent && event.onRecvEvent(cmd);
                        }
                    }
                },
                onConnectStatus: function (ret) {
                    if (ret.code == 0 && ret.port == session.httpPort) {
                        session.cb && session.cb.success && session.cb.success({ data: { httpPort: session.httpPort } });
                        session.cb = {};
                        bConnectExe = true;

                        //伪协议localHttp启动模式，需要重传一下参数。
                        if (session.bSendParams == true) {
                            var params = getFullParamsStr(session);
                            var cmdUrl = "http://localhost:" + session.httpPort.toString() + "/externalProtol?json=" + params;
                            //console.log("[" + session.httpPort + "]" + 'bSendParams:' + cmdUrl);
                            ExeMsgChannel.sendCmd({
                                data: { cmdUrl: cmdUrl + "?", },
                            });
                            session.bSendParams = false;
                        }

                        starterReportInfo.int64_ts_first_reponse = getLocalUTCTime();
                        starterReportInfo.int64_ts_protol_result = 1;
                        starterStatusReport(starterReportInfo);
                    }
                    else if (ret.code == -1 && ret.port == session.httpPort) {
                        console.log("[" + session.httpPort + "]" + "onConnectStatus : ret.code = -1");
                        if (session.cb && session.cb.fail) {
                            session.cb && session.cb.fail && session.cb.fail({ errCode: -1, errMsg: "检测EXE未安装，正在下载EXE! 下载完成请安装" });
                        }
                        else {
                            if (session.type != "") {
                                reStartExe(session);
                            }
                            bConnectExe = false
                        }

                        starterReportInfo.int64_ts_first_reponse = getLocalUTCTime();
                        starterReportInfo.int64_ts_protol_result = 0;
                        starterStatusReport(starterReportInfo);
                        session.cb = {};
                        bConnectExe = false;
                    }
                    else if (ret.code == -2 && ret.port == session.httpPort) {
                        //如果断开了链接了，重新拉起来
                        if (session.type != "") { reStartExe(session); }
                        bConnectExe = false
                    }
                },
            });
        }
    }

    function getBaseParamsStr(session_t) {
        return formatParamsToJson({
            dataChannel: session_t.dataChannel,
            port: session_t.httpPort,
            singleton: session_t.singleton,
        });
    }

    function getFullParamsStr(session_t) {
        if (session_t.proxy_ip == "")
            return formatParamsToJson({
                dataChannel: session_t.dataChannel,
                type: session_t.type,
                action: "start",
                pushURL: encodeURIComponent(session_t.pushURL),
                playURL: encodeURIComponent(session_t.playURL),
                title: encodeURIComponent(session_t.title),
                logo: encodeURIComponent(session_t.logo),
                top_window: session_t.top_window,
                port: session_t.httpPort,
                singleton: session_t.singleton,
            });
        else
            return formatParamsToJson({
                dataChannel: session_t.dataChannel,
                type: session_t.type,
                action: "start",
                pushURL: encodeURIComponent(session_t.pushURL),
                playURL: encodeURIComponent(session_t.playURL),
                title: encodeURIComponent(session_t.title),
                logo: encodeURIComponent(session_t.logo),
                top_window: session_t.top_window,
                port: session_t.httpPort,
                singleton: session_t.singleton,
                'proxy': { 'ip': session_t.proxy_ip, 'port': session_t.proxy_port },
            });
        return "";
    }
    return {
        //function
        startEXE: startEXE,
        stopEXE: stopEXE,
        videoSnapshot: videoSnapshot,
        setListener: setListener,
        unload: unload,
    }
})()

ExeMsgChannel = (function () {

    var event = {
        onRecvCmd: function () { },		        // 收到命令
        onConnectStatus: function () { },	    // 联通失败超时被动断开
    };

    var bStart = false;
    var arrConnects = [];
    var firstConnectTimeout = 16;
    var disConnectTimeout = 4;

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

        for (var i = 0; i < arrConnects.length; i++) {
            if (arrConnects[i].localHttpDomain == object.data.serverDomain) {
                console.error("startConnect-httpPort:" + object.data.httpPort + ",重入");
                return;
            }
        }
        firstConnectTimeout = (object.data && object.data.fistTimeout) || 16;
        disConnectTimeout   = (object.data && object.data.disconnectTimeout) || 4;

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
            ajaxQuery({
                url: object.data.cmdUrl, // 请求地址  
                dataType: 'jsonp',  // 采用jsonp请求，
                data: {},   // 传输数据
                success: object.success || function (res) {   // 请求成功的回调函数  
                    console.log("sendCmd sucess");
                },
                error: object.fail || function (error) {
                    console.log("sendCmd failed");
                }
            });
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
        var timeoutcnt = disConnectTimeout;
        if (bConnecting == true)
            timeoutcnt = firstConnectTimeout;
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
        var localHttpDomain = arrConnects[i].localHttpDomain;
        ajaxQuery({
            url: localHttpDomain + "?",
            dataType: 'jsonp',
            data: { },
            success: function (ret) {
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
            },
            error: function (ret) {
                console.log("failed");
                console.log(ret);
            }
        });
    }

    /***********************************************************************************
    * jsonp 原生通用函数
    ************************************************************************************/
    var jsonpRequestCnt = 0;
    function ajaxQuery(params) {
        params = params || {};
        params.data = params.data || {};
        var json;
        if (params.dataType && params.dataType == 'jsonp') {
            json = jsonp(params);
        }
        else {
            params.error && params.error({
                message: '参数异常',
            });
        }
        // jsonp请求     
        function jsonp(params) {
            //创建script标签并加入到页面中
            jsonpRequestCnt++;
            var callbackName = 'jsonp_callback_' + jsonpRequestCnt.toString();
            var head = document.getElementsByTagName('head')[0];
            // 设置传递给后台的回调参数名 
            jsonpRequestCnt++;
            params.data['callback'] = callbackName;
            var data = formatParamsToUrl(params.data);
            var script = document.createElement('script');
            head.appendChild(script);
            //创建jsonp回调函数     
            window[callbackName] = function (json) {
                head.removeChild(script);
                clearTimeout(script.timer);
                window[callbackName] = null;
                params.success && params.success(json);
            };
            //发送请求     
            script.src = params.url + data;
            //为了得知此次请求是否成功，设置超时处理     
            if (params.time) {
                script.timer = setTimeout(function () {
                    window[callbackName] = null;
                    head.removeChild(script);
                    params.error && params.error({
                        message: '超时'
                    });
                }, time);
            }
        };
    }
    return {
        startConnect: startConnect,
        stopConnect: stopConnect,
        setListener: setListener,
        sendCmd: sendCmd,
    }
})()


/***********************************************************************************
* 数据上报模块
************************************************************************************/
function getBrowserInfo() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1
            && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {return "IE7";} 
        else if (fIEVersion == 8) { return "IE8";} 
        else if (fIEVersion == 9) { return "IE9";} 
        else if (fIEVersion == 10) { return "IE10";} 
        else if (fIEVersion == 11) { return "IE11"; } 
        return "IE_unknow";
    }
    if (isOpera) { return "Opera";}
    else if (isEdge) { return "Edge"; }
    if (isFF) { return "FF"; }
    if (isSafari) { return "Safari"; }
    if (isChrome) { return "Chrome";}
    return "unknow"
}


function isTridentKernel() {
    var browserKernel = {
      versions: function() {
        var u = navigator.userAgent;
        return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
                iPhone: u.indexOf('iPhone') > -1 , //iPhone
                iPad: u.indexOf('iPad') > -1, //iPad
                webApp: u.indexOf('Safari') > -1 //Safari
            };
        }()
    }
    if(browserKernel.versions.trident)
        return true;
    return false;
}

function isWindowOpen() {
    var browser = getBrowserInfo();
    if (browser == "IE7" || browser == "IE8" || browser == "IE9" || browser == "IE10") {
        return true;
    }
    return false;
}

function starterStatusReport(info) {
    var jsonStr = formatParamsToJson(info);
    console.log('starterStatusReport.jsonStr:' + jsonStr);
    request({
        url: "https://ilivelog.qcloud.com",
        method: "POST",
        data: info,
        headType: "urlencode",
        success: function (ret) {
            console.log("starterStatusReport.success.result:", ret);
        },
        fail: function (ret) {
            console.log("starterStatusReport.fail.result:", ret);
        }
    });

}

/***********************************************************************************
* 获取用户登录roomserver鉴权信息
************************************************************************************/
function getSDKLoginInfo(params) {
    console.log('getSDKLoginInfo.called');
    request({
        url: params.data.loginServerDoMain,
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
        headType: object.headType || "json",
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
                if(xhr.responseText != "ok"){
                    var jsonObj = JSON.parse(xhr.responseText);
                    object.success && object.success({ status: status, data: jsonObj });
                }
                else{
                    object.success && object.success({ status: status, msg: xhr.responseText });
                }
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
        if(object.headType &&  object.headType == "urlencode"){
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        else if(object.headType &&  object.headType == "json"){
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
        xhr.send(params);
    }
}

function formatParamsToUrl(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

//格式化参数
function formatParamsToJson(data) {
    var str = JSON.stringify(data);
    return str;
}

function printLocalFormatTime() {
    var date = new Date();
    var currentTime = date.Format("yyyy-MM-dd hh:mm:ss") + "." + date.getMilliseconds();
    return currentTime;
}

function getLocalUTCTime(){
    var date = new Date();
    var y =  date.getUTCFullYear();    
    var m = date.getUTCMonth() ;
    var d = date.getUTCDate();
    var h= date.getUTCHours();
    var M = date.getUTCMinutes();
    var s = date.getUTCSeconds();
    var ms = date.getMilliseconds();
    var utc = Date.UTC(y, m, d, h, M, s);
    utc = utc + ms;
    //使用 UTC() 来输出从 1970/01/01 到具体日期的毫秒数（根据世界时）。
    return utc;
}

Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}