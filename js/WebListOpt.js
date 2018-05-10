var WebListOpt = {

    /**
     *  @param object
     *  {
     *  data: {
     *      serverDomain  String   请求的后台地址
     *      userID        String    用户ID
     *      userName      String    用户昵称
     *      sdkAppID      String    IM登录凭证
     *      accType       Int       账号集成类型
     *      userSig       String    IM签名
     *  }
     * success       function  成功回调
     * fail          function  失败回调
     * }
     *
     */
    initRoom: function (object) { },

    /**
     * 创建房间（大主播）
     * @param object
     * {
     *  data: {
     *     divId        String  推流预览画面所在div
     *     cameraId     String  摄像头ID（通过getCameras可以获取所有摄像头）
     *     roomInfo:    String  用户自定义数据，作为房间信息会在getRoomList函数返回 
     *  }
     * success       function(ret)  成功回调
     *      ret: {
     *          roomID
     *      }
     * fail          function  失败回调
     * }
     */
    createRoom: function (object) { },

    /**
     * 进入房间（小主播）
     * @param object
     * {
     *  data: {
     *      roomID:     String  房间号
     *      divId       String  推流预览画面所在div
     *      cameraId    String  摄像头ID（通过getCameras可以获取所有摄像头）
     *  }
     * success       function  成功回调
     * fail          function  失败回调
     * }
     */
    enterRoom: function (object) { },

    /**
     * @param object
     * {
     * success       function  成功回调
     * fail          function  失败回调
     * }
     */
    exitRoom: function (object) { },

    /**
     * @param object
     * {
     *  data: {
     *      index       Int
     *      count       Int
     *      roomType    Int
     *  }
     * success       function  成功回调
     * fail          function  失败回调
     * }
     */
    getRoomList: function (object) { },

    /**
        *  @param object
        *  {
        *      onRecvCmd           function  获取命令
        *          {
        *              cmdJson           String
        *              roomID            String 
        *          }
        *      onRoomClose          function  房间被动关闭
        *          {
        *              roomID            String 
        *          }
        *  }
        */
    setListener: function (object) { },
    unload: function () { },
}

WebListOpt = (function () {

    var accountInfo = {
        userID: '',			// 用户ID
        userName: '',		   // 用户昵称
        userAvatar: '',		// 用户头像URL
        userSig: '',		// IM登录凭证
        sdkAppID: '',		// IM应用ID
        accountType: '',	// 账号集成类型
        accountMode: 0,		//帐号模式，0-表示独立模式，1-表示托管模式
        pushURL: '',        //推流地址
        isCreator: false,    //是否是房间创建者
        previewDivId: "",
        token: "",
    };

    // 回调事件
    var event = {
        onRecvData: function () { },		        // 收到命令
        onRoomClose: function () { },
    };

    var arrWebRoom = [];

    var webListDomain = 'https://xzb.qcloud.com/';
    var roomServerDoMain = '';
    var baseRoomType = 0;

    function initRoom(object) {
        if (!object || !object.data.roomServerDoMain) {
            console.error("init参数错误");
            object.fail && object.fail(-9999, "init参数错误");
            return;
        }
        accountInfo.userID = object.data.userID;
        accountInfo.userSig = object.data.userSig;
        accountInfo.sdkAppID = object.data.sdkAppID;
        accountInfo.accountType = object.data.accType;
        accountInfo.userName = object.data.userName || accountInfo.userID;
        accountInfo.userAvatar = object.userAvatar || "123";
        baseRoomType = object.data.roomType;
        roomServerDoMain = object.data.roomServerDoMain;
    }

    function createRoom (object) {
        console.log('create_room:' + object.data.roomInfo);

        request({
            url: webListDomain + 'create_room',
            method: "POST",
            data: {
                roomType: baseRoomType,
                roomInfo: object.data.roomInfo,
                roomID: "",
            },
            success: function (ret) {
                if (ret.data.code != 200) {
                    console.log('创建失败:', JSON.stringify(ret));
                    object.fail && object.fail({
                        errCode: ret.data.code,
                        errMsg: ret.data.message + '[' + ret.data.code + ']'
                    });
                    return;
                }
 
                object.success && object.success(ret);
            },
            fail: object.fail
        });
    };

    function setListener(object) {
        console.log('-----setWebRoomListener------');
        if (!object) {
            console.error('setWebRoomListener参数错误', object);
            return;
        }
        event.onRecvData = object.onRecvCmd || function () { };
        event.onRoomClose = object.onRoomClose || function () { };
        var self = this;
        EXEStarter.setListener({
            onRoomClose: function (ret) {
                //to do 必须把上层的房间关闭。
                event.onRoomClose && event.onRoomClose({
                    data: {
                        roomID: ret.data.roomID,
                        roomName: ret.data.roomName,
                        code: ret.data.code,
                        msg: ret.data.msg,
                    }
                });
            },
        });
    }

    function enterRoom(object) {

        var bEnter = false; var index = 0;
        for (var i = 0; i < arrWebRoom.length; i++) {
            if (arrWebRoom[i].roomID == object.data.roomID) {
                bEnter = true;
                index = i;
                break;
            }
        }
        if (bEnter == true)
        {
            alert( "[" + arrWebRoom[i].roomName + "]已开启，请先退出!");
            object.fail && object.fail({});
            return;
        }

        // 房间信息
        var roomInfo = {
            roomID: '',			// 视频位房间ID
            roomName: '',		// 自定义信息
            roomCreator: '',    // 房间创建者的userID
        };
        console.log('enterRoom-roomID:' + object.data.roomID);
        roomInfo.roomID = object.data.roomID;
        roomInfo.roomName = object.data.roomName;
        roomInfo.roomCreator = object.data.roomCreator;
        arrWebRoom.push(roomInfo);
        var self = this;
       
        var styleType = EXEStarter.StyleType.LiveRoom;
        if(baseRoomType != 0)
            styleType = EXEStarter.StyleType.RTCRoom;
        var template = EXEStarter.Template.Template1V3;

        if(baseRoomType == 1) //如果是doubleroom，采用1v1的模板
            template = EXEStarter.Template.Template1V1;

        EXEStarter.createExeAsRoom({
            userdata: {
                userID: accountInfo.userID,
                userName: accountInfo.userName,
                sdkAppID: accountInfo.sdkAppID,
                accType: accountInfo.accountType,
                userSig: accountInfo.userSig,
            },
            roomdata: {
                serverDomain: roomServerDoMain,
                roomAction: object.data.roomAction,
                roomID: object.data.roomID,
                roomName: object.data.roomName,
                roomTitle: object.data.roomTitle,
                roomLogo: object.data.roomLogo,
                type: styleType,
                template: template,
            },
            success: function (ret) {
                request({
                    url: webListDomain + 'enter_room',
                    method: "POST",
                    data: {
                        roomType: baseRoomType,
                        roomID: object.data.roomID,
                        status: 1,
                    },
                    success: function (ret) {
                        if (ret.data.code != 200) {
                            console.log('列表更新状态失败:', JSON.stringify(ret));
                        }
                        else {
                            object.success && object.success(ret);
                        }
                    },
                });
            },
            fail: function (ret) {
                var index = -1;
                for (var i = 0; i < arrWebRoom.length; i++) {
                    if (arrWebRoom[i].roomID == object.data.roomID) {
                        index = i;
                        break;
                    }
                }
                if (index != -1) {
                    arrWebRoom.splice(index, 1);
                }
                object.fail && object.fail(ret)
            },
        })
    }

    function exitRoom(object) {
        console.log('exitRoom-roomID:' + object.data.roomID);
        EXEStarter.closeExeAsRoom({ data: { roomID: object.data.roomID, } });
        var index = -1;
        for (var i = 0; i < arrWebRoom.length; i++) {
            if (arrWebRoom[i].roomID == object.data.roomID) {
                index = i;
                break;
            }
        }
        if (index != -1)
        {
            arrWebRoom.splice(index, 1);
        }
        if (arrWebRoom.length == 0)
            EXEStarter.setListener({});
        request({
            url: webListDomain + 'delete_room',
            method: "POST",
            data: {
                roomType: object.data.roomType,
                roomID: object.data.roomID,
            },

            success: function (ret) {
                if (ret.data.code != 200) {
                    console.log('删除房间失败:', JSON.stringify(ret));
                    object.fail && object.fail({
                        errCode: ret.data.code,
                        errMsg: ret.data.message + '[' + ret.data.code + ']'
                    });
                    return;
                }
                object.success && object.success(ret);
            },
            fail: object.fail
        });
    }

    function getRoomList (object) {
        console.log('-----getRoomList------');
        request({
            url: webListDomain + 'get_room_list',
            method: "POST",
            data: {
                roomType: baseRoomType,
                index: object.data.index,
                count: object.data.count
            }, 
            success: function (ret) {
                if(ret.data.code != 200) {
                    console.log('获取房间列表失败:', JSON.stringify(ret));
                    object.fail && object.fail({
                        errCode: ret.data.code,
                        errMsg: ret.data.message + '[' + ret.data.code + ']'
                    });
                    return;
                }
                object.success && object.success(ret);
            },
            fail: object.fail
        });
    }

    function unload() {
        EXEStarter.unload();
    }

    return {
        initRoom: initRoom,
        createRoom: createRoom,
        enterRoom: enterRoom,
        exitRoom: exitRoom,
        getRoomList: getRoomList,
        setListener: setListener,
        unload: unload,
    }
})()
