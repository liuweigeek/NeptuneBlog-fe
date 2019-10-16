export interface User {
    /**
     * Id
     */
    id: string;

    /**
     * 邮箱地址
     */
    email: string;

    /**
     * 用户名
     */
    username: string;

    /**
     * 昵称
     */
    nickname: string;

    /**
     * 小尺寸头像
     */
    smallAvatar: string;

    /**
     * 正常尺寸头像
     */
    normalAvatar: string;

    /**
     * 大尺寸头像
     */
    largeAvatar: string;

    /**
     * 密码
     */
    password?: string;

    /**
     * 出生日期
     */
    birthday?: Date;

    /**
     * 性别
     */
    sex: number;

    /**
     * 注册时间
     */
    registerDate?: Date;

    /**
     * 最近登录时间
     */
    loginDate?: Date;

    /**
     * 语言
     */
    langKey?: string;

    /**
     * 登录Token信息
     */
    token?: string;
}